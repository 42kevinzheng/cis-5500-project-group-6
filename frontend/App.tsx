import { useState } from "react";
import { Music, TrendingUp, Trophy, Disc3, Globe, User, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Button } from "./components/ui/button";
import { ChartItem } from "./components/ChartItem";
import { ArtistCard } from "./components/ArtistCard";
import { AlbumCard } from "./components/AlbumCard";
import { AuthDialog } from "./components/AuthDialog";
import { UserProfile } from "./components/UserProfile";
import { UserProvider, useUser } from "./contexts/UserContext";
import { chartData, countries, Country } from "./data/chartData";

function AppContent() {
  const { user, logout } = useUser();
  const [selectedCountry, setSelectedCountry] = useState<Country>("worldwide");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const currentData = chartData[selectedCountry];
  const currentCountryInfo = countries.find(c => c.value === selectedCountry);

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
                <h1 className="text-purple-900">MusicCharts</h1>
                <p className="text-sm text-gray-600">Your daily dose of trending music</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!showProfile && (
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
              )}

              {user ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant={showProfile ? "default" : "outline"}
                    onClick={() => setShowProfile(!showProfile)}
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    {user.username}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setAuthDialogOpen(true)} className="gap-2">
                  <User className="w-4 h-4" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showProfile ? (
          <>
            <div className="mb-8">
              <Button variant="ghost" onClick={() => setShowProfile(false)} className="mb-4">
                ← Back to Charts
              </Button>
              <h2 className="text-purple-900">My Profile</h2>
            </div>
            <UserProfile />
          </>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h2 className="text-purple-900">
                  {currentCountryInfo?.flag} {currentCountryInfo?.label} Charts
                </h2>
              </div>
              <p className="text-gray-600">Updated October 15, 2025</p>
            </div>

            <Tabs defaultValue="songs" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="songs">
                  <Trophy className="w-4 h-4 mr-2" />
                  Songs
                </TabsTrigger>
                <TabsTrigger value="artists">
                  <Music className="w-4 h-4 mr-2" />
                  Artists
                </TabsTrigger>
                <TabsTrigger value="albums">
                  <Disc3 className="w-4 h-4 mr-2" />
                  Albums
                </TabsTrigger>
              </TabsList>

              <TabsContent value="songs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top 10 Songs</CardTitle>
                    <CardDescription>The hottest tracks in {currentCountryInfo?.label}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {currentData.songs.map((song) => (
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
                  {currentData.artists.map((artist, index) => (
                    <ArtistCard key={artist.name} artist={artist} rank={index + 1} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="albums" className="space-y-4">
                <div className="mb-4">
                  <h3>Top Albums This Week</h3>
                  <p className="text-gray-600">Best-performing albums in {currentCountryInfo?.label}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentData.albums.map((album, index) => (
                    <AlbumCard key={album.title} album={album} rank={index + 1} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 MusicCharts. All rights reserved.</p>
            <p className="text-sm mt-2">Chart data updated weekly</p>
          </div>
        </div>
      </footer>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
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