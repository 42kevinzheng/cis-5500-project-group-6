import { Music2, Users, Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUser } from "../contexts/UserContext";

export interface ArtistData {
  name: string;
  imageUrl: string;
  monthlyListeners: string;
  topSong: string;
  genre: string;
}

interface ArtistCardProps {
  artist: ArtistData;
  rank: number;
}

export function ArtistCard({ artist, rank }: ArtistCardProps) {
  const { user, toggleLike, isLiked } = useUser();
  const liked = isLiked('artists', artist.name);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <ImageWithFallback
          src={artist.imageUrl}
          alt={artist.name}
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
            onClick={() => user ? toggleLike('artists', artist.name) : null}
            className={`bg-white/90 backdrop-blur-sm ${liked ? 'text-red-500' : 'text-gray-600'} hover:text-red-500 hover:bg-white transition-colors`}
            title={user ? (liked ? 'Unlike' : 'Like') : 'Login to like'}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2">{artist.name}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{artist.monthlyListeners} monthly listeners</span>
          </div>
          <div className="flex items-center gap-2">
            <Music2 className="w-4 h-4" />
            <span className="truncate">{artist.topSong}</span>
          </div>
          <Badge variant="outline" className="mt-2">
            {artist.genre}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}