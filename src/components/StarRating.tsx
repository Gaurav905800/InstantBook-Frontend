import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
};

function StarRating({
  rating,
  totalStars = 5,
  size = 16,
  className = "",
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: totalStars }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={
            rating > index ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default StarRating;
