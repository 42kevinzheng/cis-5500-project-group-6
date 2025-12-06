import { useState, useEffect, useMemo } from "react";
import { Music, TrendingUp, Trophy, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { ChartItem } from "./components/ChartItem";
import { ArtistCard } from "./components/ArtistCard";
import { UserProvider } from "./contexts/UserContext";
import { countries, Country, chartData } from "./data/chartData";
import { fetchTop50, fetchWorldwideCharts } from "./services/chartService";
import { GenreChart } from "./components/GenreOvertime";
import { SongDetailsPage } from "./components/SongDetailsPage";
import { ArtistDetailsPage } from "./components/ArtistDetailsPage";
import { Input } from "./components/ui/input";

function AppContent() {
  const appTitle = "TerraTunes";

  const [selectedCountry, setSelectedCountry] = useState<Country>("worldwide");
  const [currentData, setCurrentData] = useState<chartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"songs" | "artists" | "genres">("songs");
  const [songQuery, setSongQuery] = useState<string>("");
  const [artistQuery, setArtistQuery] = useState<string>("");
  const [artistGenreFilter, setArtistGenreFilter] = useState<string>("");

  const currentCountryInfo = countries.find((c) => c.value === selectedCountry);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      setSelectedSongId(null);
      setSelectedArtistId(null);
      setSongQuery("");
      setArtistQuery("");
      setArtistGenreFilter("");

      try {
        let data: chartData;
        if (selectedCountry === "worldwide") {
          data = await fetchWorldwideCharts();
        } else {
          const countryCode = countries.find(
            (c) => c.value === selectedCountry
          )?.code;
          data = await fetchTop50(countryCode!);
        }
        setCurrentData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch chart data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCountry]);

  const filteredSongs = useMemo(() => {
    if (!currentData) return [];
    const q = songQuery.trim().toLowerCase();
    if (!q) return currentData.songs;

    return currentData.songs.filter((song: any) => {
      return (
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q)
      );
    });
  }, [currentData, songQuery]);

  const uniqueArtistGenres = useMemo(() => {
    if (!currentData) return [];
    const set = new Set<string>();
    (currentData.artists as any[]).forEach((artist) => {
      if (artist.genre) {
        artist.genre
          .split(",")
          .map((g: string) => g.trim())
          .filter(Boolean)
          .forEach((g: string) => set.add(g));
      }
    });
    return Array.from(set).sort();
  }, [currentData]);

  const filteredArtists = useMemo(() => {
    if (!currentData) return [];
    const q = artistQuery.trim().toLowerCase();

    return (currentData.artists as any[]).filter((artist) => {
      if (q && !artist.name.toLowerCase().includes(q)) return false;
      if (artistGenreFilter) {
        if (
          !artist.genre
            ?.toLowerCase()
            .includes(artistGenreFilter.toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    });
  }, [currentData, artistQuery, artistGenreFilter]);

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
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-xl">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-purple-900 text-xl font-bold">
                  {appTitle}
                </h1>
                <p className="text-sm text-gray-600">
                  Your daily dose of trending music
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <>
                <Globe className="w-5 h-5 text-purple-600" />
                <Select
                  value={selectedCountry}
                  onValueChange={(value) =>
                    setSelectedCountry(value as Country)
                  }
                >
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

      {/* MAIN */}
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

        {!selectedSongId && !selectedArtistId && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h2 className="text-purple-900">
                {currentCountryInfo?.flag} {currentCountryInfo?.label} Charts
              </h2>
            </div>
          </div>
        )}

        {/* SONG DETAIL PAGE */}
        {selectedSongId && (
          <SongDetailsPage
            songId={selectedSongId}
            onBack={() => {
              setSelectedSongId(null);
              setActiveTab("songs");
            }}
          />
        )}

        {/* ARTIST DETAIL PAGE */}
        {selectedArtistId && !selectedSongId && (
          <ArtistDetailsPage
            artistId={selectedArtistId}
            onBack={() => {
              setSelectedArtistId(null);
              setActiveTab("artists"); 
            }}
          />
        )}

        {!selectedSongId && !selectedArtistId && currentData && (
          <Tabs
            value={activeTab}
            onValueChange={(v) =>
              setActiveTab(v as "songs" | "artists" | "genres")
            }
            className="space-y-6"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="songs">
                <Trophy className="w-4 h-4 mr-2" />
                Songs
              </TabsTrigger>
              <TabsTrigger value="artists">
                <Music className="w-4 h-4 mr-2" />
                Artists
              </TabsTrigger>
              <TabsTrigger value="genres">
                <TrendingUp className="w-4 h-4 mr-2" />
                Genres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="songs" className="space-y-4">
              <div className="mb-2 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <p className="text-sm text-gray-600">
                  Filter songs by title or artist.
                </p>
                <div className="w-full md:w-72">
                  <Input
                    value={songQuery}
                    onChange={(e) => setSongQuery(e.target.value)}
                    placeholder="Search songs or artists..."
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Top {filteredSongs.length} Songs
                    {songQuery && (
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        (from {currentData.songs.length})
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    The hottest tracks in {currentCountryInfo?.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredSongs.map((song: any) => (
                      <button
                        key={song.song_id}
                        className="w-full text-left"
                        onClick={() => {
                          setSelectedSongId(song.song_id);
                          setActiveTab("songs");
                        }}
                      >
                        <ChartItem item={song} />
                      </button>
                    ))}
                    {filteredSongs.length === 0 && (
                      <div className="py-8 text-center text-sm text-gray-500">
                        No songs match your filter.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="artists" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between">
                <div className="space-y-1">
                  <h3>Top Artists This Week</h3>
                  <p className="text-gray-600">
                    Most streamed artists in {currentCountryInfo?.label}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="flex-1 min-w-[180px]">
                    <Input
                      value={artistQuery}
                      onChange={(e) => setArtistQuery(e.target.value)}
                      placeholder="Search artist name..."
                    />
                  </div>
                  <div className="w-full sm:w-48">
                    <Select
                      value={artistGenreFilter || "all"}
                      onValueChange={(v) =>
                        setArtistGenreFilter(v === "all" ? "" : v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All genres</SelectItem>
                        {uniqueArtistGenres.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtists.map((artist: any, index: number) => (
                  <ArtistCard
                    key={artist.name}
                    artist={artist}
                    rank={index + 1}
                    onSelect={(artistId) => {
                      setSelectedArtistId(artistId);
                      setActiveTab("artists");
                    }}
                  />
                ))}
              </div>

              {filteredArtists.length === 0 && (
                <div className="py-8 text-center text-sm text-gray-500">
                  No artists match your filters.
                </div>
              )}
            </TabsContent>

            {/* GENRES TAB */}
            <TabsContent value="genres" className="space-y-4">
              <div className="mb-4">
                <h3>Top Genres</h3>
                <p className="text-gray-600"></p>
              </div>
              <GenreChart
                genres={[
                  "hip hop",
                  "pop",
                  "rap",
                  "trap latino",
                  "urbano latino",
                ]}
              />
            </TabsContent>
          </Tabs>
        )}
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
