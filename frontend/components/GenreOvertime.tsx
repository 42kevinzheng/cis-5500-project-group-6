// components/GenreOvertime.tsx
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { fetchGenreOvertime } from "../services/chartService";

interface GenreDataPoint {
  artist_genre: string;
  month: string; // ISO string
  avg_position: string; // comes as string from JSON, we'll parse
  songs_charted: number;
}

const genreColors: Record<string, string> = {
  "hip hop": "#8b5cf6",        // purple
  pop: "#ec4899",              // pink
  rap: "#f59e0b",              // amber
  "trap latino": "#10b981",    // emerald
  "urbano latino": "#3b82f6",  // blue
};

const formatMonth = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "2-digit", month: "short" });
};

export function GenreChart({ genres }: { genres: string[] }) {
  const [data, setData] = useState<GenreDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchGenreOvertime();
        setData(result);
      } catch (err) {
        setError("Failed to load genre trend data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Transform data into format expected by Recharts: one object per month
  const chartData = data.reduce((acc: any[], curr) => {
    const monthKey = formatMonth(curr.month);
    const existing = acc.find((item) => item.month === monthKey);

    if (existing) {
      existing[curr.artist_genre] = parseFloat(curr.avg_position);
    } else {
      acc.push({
        month: monthKey,
        [curr.artist_genre]: parseFloat(curr.avg_position),
      });
    }
    return acc;
  }, []);

  // Sort by date
  chartData.sort((a, b) => {
    const months = [
      "May 23", "Jun 23", "Jul 23", "Aug 23", "Sep 23", "Oct 23",
      "Nov 23", "Dec 23", "Jan 24", "Feb 24", "Mar 24", "Apr 24",
      "May 24", "Jun 24", "Jul 24", "Aug 24", "Sep 24", "Oct 24", "Nov 24"
    ];
    return months.indexOf(a.month) - months.indexOf(b.month);
  });

  if (loading) {
    return (
   <Card>
     <CardHeader>
       <CardTitle>Genre Trends Over Time</CardTitle>
     </CardHeader>
     <CardContent className="h-96 flex items-center justify-center">
       <p className="text-muted-foreground">Loading genre data...</p>
     </CardContent>
   </Card>
 );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Genre Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Genre Performance Over Time</CardTitle>
        <CardDescription>
          Average chart position per month (lower = better)
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" />
            <YAxis
              reversed
              domain={[1, 50]}
              label={{ value: "Avg Position", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value: number) => `Rank ${value.toFixed(1)}`}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            {genres.map((genre) => (
              <Line
                key={genre}
                type="monotone"
                dataKey={genre}
                stroke={genreColors[genre] || "#94a3b8"}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 text-sm text-muted-foreground text-center">
          Showing only selected genres. Data based on monthly Top 50 charts.
        </div>
      </CardContent>
    </Card>
  );
}