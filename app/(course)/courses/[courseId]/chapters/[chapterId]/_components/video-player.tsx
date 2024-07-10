import { Skeleton } from "@/components/ui/skeleton";

interface VideoPlayerProps {
  url: string | null;
  isLocked: boolean;
  onComplete: boolean | undefined;
}

const VideoPlayer = ({ url, isLocked, onComplete }: VideoPlayerProps) => {
  const ytUrl = url ? `https://www.youtube.com/embed/${url}` : "";
  return (
    <div className="aspect-video">
      {isLocked && <Skeleton className="h-full w-full" />}
      {!isLocked && (
        <iframe
          className="h-full w-full"
          src={ytUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
