import { useUser } from '../contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Heart, Music, User as UserIcon, Disc3 } from 'lucide-react';
import { chartData } from '../data/chartData';

export function UserProfile() {
  const { user, likedItems, toggleLike } = useUser();

  if (!user) {
    return null;
  }

  // Get all liked items across all countries
  const getLikedSongs = () => {
    const songs: any[] = [];
    Object.values(chartData).forEach((countryData) => {
      countryData.songs.forEach((song) => {
        const songId = `${song.title}-${song.artist}`;
        if (likedItems.songs.has(songId)) {
          songs.push(song);
        }
      });
    });
    // Remove duplicates
    return Array.from(new Map(songs.map(s => [`${s.title}-${s.artist}`, s])).values());
  };

  const getLikedArtists = () => {
    const artists: any[] = [];
    Object.values(chartData).forEach((countryData) => {
      countryData.artists.forEach((artist) => {
        if (likedItems.artists.has(artist.name) && !artists.some(a => a.name === artist.name)) {
          artists.push(artist);
        }
      });
    });
    return artists;
  };

  const getLikedAlbums = () => {
    const albums: any[] = [];
    Object.values(chartData).forEach((countryData) => {
      countryData.albums.forEach((album) => {
        const albumId = `${album.title}-${album.artist}`;
        if (likedItems.albums.has(albumId)) {
          albums.push(album);
        }
      });
    });
    // Remove duplicates
    return Array.from(new Map(albums.map(a => [`${a.title}-${a.artist}`, a])).values());
  };

  const likedSongs = getLikedSongs();
  const likedArtists = getLikedArtists();
  const likedAlbums = getLikedAlbums();

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-4 rounded-full">
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-white">{user.username}</h2>
            <p className="text-white/80">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Music className="w-5 h-5" />
            </div>
            <p className="text-white/80 text-sm">Liked Songs</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <UserIcon className="w-5 h-5" />
            </div>
            <p className="text-white/80 text-sm">Liked Artists</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Disc3 className="w-5 h-5" />
            </div>
            <p className="text-white/80 text-sm">Liked Albums</p>
          </div>
        </div>
      </div>

      {/* Liked Songs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Liked Songs ({likedSongs.length})
          </CardTitle>
          <CardDescription>Your favorite tracks from the charts</CardDescription>
        </CardHeader>
        <CardContent>
          {likedSongs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No liked songs yet. Start exploring the charts!</p>
          ) : (
            <div className="space-y-3">
              {likedSongs.map((song) => {
                const songId = `${song.title}-${song.artist}`;
                return (
                  <div key={songId} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <img src={song.imageUrl} alt={song.title} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{song.title}</p>
                      <p className="text-sm text-gray-600 truncate">{song.artist}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleLike('songs', songId)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Liked Artists */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
            Liked Artists ({likedArtists.length})
          </CardTitle>
          <CardDescription>Artists you're following</CardDescription>
        </CardHeader>
        <CardContent>
          {likedArtists.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No liked artists yet. Discover new artists!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {likedArtists.map((artist) => (
                <div key={artist.name} className="p-4 rounded-lg border hover:border-purple-300 transition-colors">
                  <img src={artist.imageUrl} alt={artist.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{artist.name}</p>
                      <p className="text-sm text-gray-600">{artist.genre}</p>
                      <p className="text-xs text-gray-500">{artist.monthlyListeners} listeners</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleLike('artists', artist.name)}
                      className="text-red-500 hover:text-red-600 shrink-0"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Liked Albums */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Disc3 className="w-5 h-5" />
            Liked Albums ({likedAlbums.length})
          </CardTitle>
          <CardDescription>Your album collection</CardDescription>
        </CardHeader>
        <CardContent>
          {likedAlbums.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No liked albums yet. Explore the charts!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {likedAlbums.map((album) => {
                const albumId = `${album.title}-${album.artist}`;
                return (
                  <div key={albumId} className="p-4 rounded-lg border hover:border-purple-300 transition-colors">
                    <img src={album.imageUrl} alt={album.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{album.title}</p>
                        <p className="text-sm text-gray-600 truncate">{album.artist}</p>
                        <p className="text-xs text-gray-500">{album.releaseDate} · {album.tracks} tracks</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleLike('albums', albumId)}
                        className="text-red-500 hover:text-red-600 shrink-0"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
