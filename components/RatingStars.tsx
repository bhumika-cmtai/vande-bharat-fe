import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export const RatingStars = ({ rating, className }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {/* We are not implementing half-star logic for simplicity, but it could be added here */}
      {Array.from({ length: 5 - fullStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};