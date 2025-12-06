// ChartItem.tsx
import { Play, Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUser } from "../contexts/UserContext";
import { songDetails } from "@/data/chartData";
import { useEffect, useState } from "react";
import { fetchSongDetails } from "@/services/chartService";

export interface ChartItemData {
  song_id: string;
  rank: number;
  title: string;
  artist: string;
  image_url: string;
  countries_charted: number;
  latest_date: string;
}

interface ChartItemProps {
  item: ChartItemData;
  onSelect?: (songId: string) => void; 
}

export function ChartItem({ item, onSelect }: ChartItemProps) {
  const { user, toggleLike, isLiked } = useUser();
  const songIdKey = `${item.title}-${item.artist}`;
  const liked = isLiked("songs", songIdKey);
  const [details, setDetails] = useState<songDetails | null>(null);

  function msToMinutes(millis: number): string {
    const minutes = Math.floor(millis / 60000);
    const seconds = (millis % 60000) / 1000;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds.toFixed(0);
  }

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchSongDetails(item.song_id);
        setDetails(data);
      } catch (error) {
        console.error("Failed to fetch song details:", error);
      }
    };
    loadDetails();
  }, [item.song_id]);

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
      onClick={() => onSelect?.(item.song_id)}   
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center gap-4 min-w-[80px]">
        <span className="text-2xl tabular-nums min-w-[40px] text-right">
          {item.rank}
        </span>
      </div>

      <div className="relative w-16 h-16 flex-shrink-0">
        <ImageWithFallback
          src={item.image_url}
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
          <div>Duration:</div>
          <div>{msToMinutes(details?.duration ?? 0)}</div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className={`${liked ? "text-red-500" : "text-gray-400"} hover:text-red-500 transition-colors`}
        title={user ? (liked ? "Unlike" : "Like") : "Login to like"}
        onClick={(e) => {
          e.stopPropagation();                
          if (user) toggleLike("songs", songIdKey);
        }}
      >
        <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
      </Button>

      {item.rank === 1 && (
      	<Badge variant="default" className="ml-2">
      	#1 Hit
      	</Badge>
      )}

    </div>
  );
}
