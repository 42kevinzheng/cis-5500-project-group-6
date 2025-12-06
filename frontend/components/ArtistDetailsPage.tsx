import { useEffect, useState } from "react";
import { ArrowLeft, Globe2, Music2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  fetchArtistDetails,
  ArtistDetails,
} from "../services/chartService";

interface ArtistDetailsPageProps {
  artistId: string;
  onBack: () => void;
}

export function ArtistDetailsPage({ artistId, onBack }: ArtistDetailsPageProps) {
  const [artist, setArtist] = useState<ArtistDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArtistDetails(artistId);

        // If backend returns { message: "Artist not found." }
        if ((data as any).message) {
          setError("Artist not found.");
          setArtist(null);
        } else {
          setArtist(data);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load artist details.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [artistId]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-900">
          <div className="h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading artist details...</span>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to charts
        </Button>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error ?? "Artist not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to charts
      </Button>

      <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          {/* Left: Image */}
          <div className="w-full md:w-1/3">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={artist.artist_img}
                alt={artist.artist_name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-purple-900">
                {artist.artist_name}
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="default"
                  className="bg-purple-600 text-white flex items-center gap-1"
                >
                  <Music2 className="w-4 h-4" />
                  {artist.artist_genre || "Unknown genre"}
                </Badge>
                {artist.artist_country && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-purple-300 text-purple-800"
                  >
                    <Globe2 className="w-4 h-4" />
                    {artist.artist_country}
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-purple-100 mt-4">
              <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Artist ID
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  {artist.artist_id}
                </p>
              </div>

              <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Main Genre
                </p>
                <p className="text-sm font-medium text-purple-900">
                  {artist.artist_genre || "N/A"}
                </p>
              </div>

              <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Country / Region
                </p>
                <p className="text-sm font-medium text-purple-900">
                  {artist.artist_country || "Unknown"}
                </p>
              </div>

              <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  TerraTunes Insight
                </p>
                <p className="text-sm text-gray-700">
                  This profile is powered by your TerraTunes charts backend. Use
                  this page as a base to add more stats later (top songs,
                  countries, etc.).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
