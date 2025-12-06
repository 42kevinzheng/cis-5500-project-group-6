import { useEffect, useState } from "react";
import { ArrowLeft, Music2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { songDetails } from "@/data/chartData";
import { fetchSongDetails } from "@/services/chartService";

interface SongDetailsPageProps {
  songId: string;
  onBack: () => void;
}

export function SongDetailsPage({ songId, onBack }: SongDetailsPageProps) {
  const [details, setDetails] = useState<songDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function msToMinutes(millis: number): string {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function msToPretty(millis: number): string {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    const parts: string[] = [];
    if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
    if (seconds > 0) parts.push(`${seconds} sec`);
    return parts.join(" ");
  }

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSongDetails(songId);
        setDetails(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load song details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [songId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center py-16">
        <Music2 className="w-10 h-10 text-purple-600 animate-pulse" />
        <p className="text-purple-900">Loading song details...</p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to charts
        </Button>
        <Card>
          <CardContent className="py-8 text-center text-red-600">
            {error ?? "Song details not available."}
          </CardContent>
        </Card>
      </div>
    );
  }

  const releaseYear = details.release_date?.slice(0, 4);

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to charts
      </Button>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row gap-6">
          <div className="w-40 h-40 flex-shrink-0">
            <ImageWithFallback
              src={details.album_cover_url}
              alt={details.song_name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <CardTitle className="text-2xl md:text-3xl">
                {details.song_name}
              </CardTitle>

              {details.is_explicit ? (
                <Badge variant="destructive">Explicit</Badge>
              ) : (
                <Badge variant="outline">Clean</Badge>
              )}
            </div>

            <CardDescription className="text-lg">
              {details.artists}
            </CardDescription>

            {/* QUICK FACTS ROW */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-700 mt-2">
              <span>
                <strong>Duration:</strong> {msToMinutes(details.duration)}{" "}
                <span className="text-xs text-gray-500">
                  ({msToPretty(details.duration)})
                </span>
              </span>
              <span>
                <strong>Release date:</strong> {details.release_date}
                {releaseYear && (
                  <span className="ml-1 text-xs text-gray-500">
                    ({releaseYear})
                  </span>
                )}
              </span>
              <span>
                <strong>Album type:</strong> {details.album_type}
              </span>
              <span>
                <strong>Total tracks:</strong> {details.total_tracks}
              </span>
              <span>
                <strong>Song ID:</strong>{" "}
                <span className="font-mono text-purple-700">
                  {details.song_id}
                </span>
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* OVERVIEW TEXT */}
          <p className="text-gray-700 text-sm">
            This track comes from a <strong>{details.album_type}</strong> release
            with <strong>{details.total_tracks}</strong> total tracks. At{" "}
            <strong>{msToPretty(details.duration)}</strong>, it&apos;s a{" "}
            {details.is_explicit ? "fully uncensored" : "clean"} track
            {releaseYear ? ` first released in ${releaseYear}` : ""}. 
          </p>

          {/* RICHER “STATS” GRID (derived from existing data) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Track Snapshot
              </p>
              <p className="text-base font-semibold text-purple-900">
                {details.album_type === "single" ? "Standalone Single" : "Album Track"}
              </p>
              <p className="text-gray-700">
                Part of a <strong>{details.album_type}</strong> release with{" "}
                <strong>{details.total_tracks}</strong> tracks.
              </p>
            </div>

            <div className="bg-white border border-purple-100 rounded-xl p-4 space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Playtime
              </p>
              <p className="text-base font-semibold text-purple-900">
                {msToPretty(details.duration)}
              </p>
              <p className="text-gray-700">
                That&apos;s {Math.round(details.duration / 1000)} seconds of audio.
                Perfect for playlists around the{" "}
                {details.duration / 60000 < 3 ? "short & catchy" : "mid-length"} range.
              </p>
            </div>

            <div className="bg-white border border-purple-100 rounded-xl p-4 space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Metadata
              </p>
              <p className="text-xs font-mono break-all text-purple-900">
                {details.song_id}
              </p>
              <p className="text-gray-700">
                Spotify song-id. Useful for
                deep-linking, debugging, and advanced analytics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
