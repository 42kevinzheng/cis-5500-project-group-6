import { Play, TrendingUp, TrendingDown, Minus, Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUser } from "../contexts/UserContext";

export interface ChartItemData {
  rank: number;
  title: string;
  artist: string;
  imageUrl: string;
  //peakPosition: number;
}

interface ChartItemProps {
  item: ChartItemData;
}

export function ChartItem({ item }: ChartItemProps) {
  const { user, toggleLike, isLiked } = useUser();
  const songId = `${item.title}-${item.artist}`;
  const liked = isLiked('songs', songId);

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-4 min-w-[80px]">
        <span className="text-2xl tabular-nums min-w-[40px] text-right">
          {item.rank}
        </span>
      </div>

      <div className="relative w-16 h-16 flex-shrink-0">
        <ImageWithFallback
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover rounded-md"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute inset-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Play className="w-6 h-6 text-white fill-white" />
        </Button>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="truncate">{item.title}</h3>
        <p className="text-gray-600 truncate">{item.artist}</p>
      </div>

      {/* <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <div className="text-center">
          <div>Peak</div>
          <div>{item.peakPosition}</div>
        </div>
      </div> */}

      <Button
        size="icon"
        variant="ghost"
        onClick={() => user ? toggleLike('songs', songId) : null}
        className={`${liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
        title={user ? (liked ? 'Unlike' : 'Like') : 'Login to like'}
      >
        <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
      </Button>

      {item.rank === 1 && (
        <Badge variant="default" className="ml-2">
          #1 Hit
        </Badge>
      )}
    </div>
  );
}