import { Calendar, Disc3, Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUser } from "../contexts/UserContext";

export interface AlbumData {
  title: string;
  artist: string;
  imageUrl: string;
  releaseDate: string;
  tracks: number;
}

interface AlbumCardProps {
  album: AlbumData;
  rank: number;
}

export function AlbumCard({ album, rank }: AlbumCardProps) {
  const { user, toggleLike, isLiked } = useUser();
  const albumId = `${album.title}-${album.artist}`;
  const liked = isLiked('albums', albumId);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square">
        <ImageWithFallback
          src={album.imageUrl}
          alt={album.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="default" className="text-lg px-3 py-1">
            #{rank}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => user ? toggleLike('albums', albumId) : null}
            className={`bg-white/90 backdrop-blur-sm ${liked ? 'text-red-500' : 'text-gray-600'} hover:text-red-500 hover:bg-white transition-colors`}
            title={user ? (liked ? 'Unlike' : 'Like') : 'Login to like'}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-1 truncate">{album.title}</h3>
        <p className="text-gray-600 mb-3 truncate">{album.artist}</p>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{album.releaseDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Disc3 className="w-4 h-4" />
            <span>{album.tracks} tracks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}