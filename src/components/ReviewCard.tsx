import { Review } from '@/lib/reviews';
import { StarRating } from './StarRating';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">{review.reviewerName}</p>
                {review.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                    Verified Purchase
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Rating */}
          <StarRating rating={review.rating} showText size="sm" />

          {/* Title */}
          <h4 className="font-semibold text-sm">{review.title}</h4>

          {/* Text */}
          <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>

          {/* Images */}
          {review.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {review.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={`Review image ${i + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
