'use client';

import { Star } from 'lucide-react';

type RatingStarsProps = {
  value: number;
  onChange?: (value: number) => void;
};

export default function RatingStars({ value, onChange }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className="rounded-full p-1 transition hover:text-cyan-400"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <Star className={star <= value ? 'text-cyan-400' : 'text-slate-600'} />
        </button>
      ))}
    </div>
  );
}
