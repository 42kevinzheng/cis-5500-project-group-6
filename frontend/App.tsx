import { useState, useEffect } from "react";
import { Music, TrendingUp, Trophy, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { ChartItem } from "./components/ChartItem";
import { ArtistCard } from "./components/ArtistCard";
import { UserProvider } from "./contexts/UserContext";
import { countries, Country, chartData } from "./data/chartData"; // Keep for types and countries list
import { fetchTop50, fetchWorldwideCharts } from "./services/chartService"; // Import fetch functions (adjust path if needed)

function AppContent() {
  const appTitle = "TerraTunes";
  const [selectedCountry, setSelectedCountry] = useState<Country>("worldwide");
  const [currentData, setCurrentData] = useState<chartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const currentCountryInfo = countries.find(c => c.value === selectedCountry);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null); 
      try {
        let data: chartData;
        if (selectedCountry === "worldwide") {
          data = await fetchWorldwideCharts();
        } else {
          const countryCode = countries.find(c => c.value === selectedCountry)?.code;
          data = await fetchTop50(countryCode!);
        }
        setCurrentData(data);
      } catch (err) {
        setError("Failed to fetch chart data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedCountry]);

  if (!currentData && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="text-center">
          <Music className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <p>Loading charts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-xl">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-purple-900">{appTitle}</h1>
                <p className="text-sm text-gray-600">Your daily dose of trending music</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <>
                <Globe className="w-5 h-5 text-purple-600" />
                <Select value={selectedCountry} onValueChange={(value) => setSelectedCountry(value as Country)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-600 border-t-transparent"></div>
              <span className="text-lg font-medium text-purple-900">
                Loading {currentCountryInfo?.label} charts...
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h2 className="text-purple-900">
              {currentCountryInfo?.flag} {currentCountryInfo?.label} Charts
            </h2>
          </div>
        </div>
        
        <Tabs defaultValue="songs" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="songs">
              <Trophy className="w-4 h-4 mr-2" />
              Songs
            </TabsTrigger>
            <TabsTrigger value="artists">
              <Music className="w-4 h-4 mr-2" />
              Artists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="songs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top {currentData?.songs.length} Songs</CardTitle>
                <CardDescription>The hottest tracks in {currentCountryInfo?.label}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {currentData?.songs.map((song) => (
                    <ChartItem key={song.rank} item={song} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artists" className="space-y-4">
            <div className="mb-4">
              <h3>Top Artists This Week</h3>
              <p className="text-gray-600">Most streamed artists in {currentCountryInfo?.label}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData?.artists.map((artist, index) => (
                <ArtistCard key={artist.name} artist={artist} rank={index + 1} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 {appTitle}. All rights reserved.</p>
            <p className="text-sm mt-2">Chart data updated weekly</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}