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
  previousRank?: number;
  weeksOnChart: number;
  peakPosition: number;
}

interface ChartItemProps {
  item: ChartItemData;
}

export function ChartItem({ item }: ChartItemProps) {
  const { user, toggleLike, isLiked } = useUser();
  const songId = `${item.title}-${item.artist}`;
  const liked = isLiked('songs', songId);

  const getRankChange = () => {
    if (!item.previousRank) return { icon: Minus, color: "text-gray-400" };
    
    const change = item.previousRank - item.rank;
    if (change > 0) return { icon: TrendingUp, color: "text-green-500" };
    if (change < 0) return { icon: TrendingDown, color: "text-red-500" };
    return { icon: Minus, color: "text-gray-400" };
  };

  const rankChange = getRankChange();
  const RankIcon = rankChange.icon;
  const movement = item.previousRank ? Math.abs(item.previousRank - item.rank) : 0;

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-4 min-w-[80px]">
        <span className="text-2xl tabular-nums min-w-[40px] text-right">
          {item.rank}
        </span>
        <div className="flex flex-col items-center gap-1">
          <RankIcon className={`w-4 h-4 ${rankChange.color}`} />
          {movement > 0 && (
            <span className={`text-xs ${rankChange.color}`}>{movement}</span>
          )}
        </div>
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

      <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <div className="text-center">
          <div>Peak</div>
          <div>{item.peakPosition}</div>
        </div>
        <div className="text-center">
          <div>Weeks</div>
          <div>{item.weeksOnChart}</div>
        </div>
      </div>

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
      {item.rank <= 10 && item.weeksOnChart === 1 && (
        <Badge variant="secondary" className="ml-2">
          New Entry
        </Badge>
      )}
    </div>
  );
}