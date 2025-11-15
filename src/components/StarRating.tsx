import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function StarRating({
  rating,
  onRatingChange,
  interactive = false,
  size = 'md',
  showText = false
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange?.(star)}
            className={`transition-all ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            disabled={!interactive}
          >
            <Star
              className={`${sizeClasses[size]} ${
                star <= rating
                  ? 'fill-accent text-accent'
                  : 'text-muted-foreground'
              } transition-all ${interactive && star <= rating ? 'scale-110' : ''}`}
            />
          </button>
        ))}
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-medium text-foreground`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
