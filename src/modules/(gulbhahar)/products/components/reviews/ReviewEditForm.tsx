"use client";
import { Check, Star } from "lucide-react";
import { useState } from "react";

interface ReviewEditFormProps {
  review: {
    rating: number;
    comment: string;
    [key: string]: any;
  };
  onSave: (data: { rating: number; comment: string }) => void;
  onCancel: () => void;
  variant?: "mobile" | "desktop";
  updating?: boolean;
}

export function ReviewEditForm({
  review,
  onSave,
  onCancel,
  variant = "desktop",
  updating = false,
}: ReviewEditFormProps) {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const isMobile = variant === "mobile";

  const handleSave = () => {
    if (rating && comment.trim()) {
      onSave({ rating, comment });
    }
  };

  return (
    <div className={`space-y-${isMobile ? "3" : "4"}`}>
      <div>
        <p
          className={`text-${isMobile ? "xs" : "sm"} text-gray-600 mb-${isMobile ? "1" : "2"}`}
        >
          Rating:
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((starRating) => (
            <Star
              key={starRating}
              onClick={() => setRating(starRating)}
              className={`w-${isMobile ? "5" : "6"} h-${isMobile ? "5" : "6"} cursor-pointer transition-all duration-200 ${
                starRating <= rating
                  ? "fill-yellow-400 text-yellow-400 hover:scale-110"
                  : "fill-gray-300 text-gray-300 hover:fill-yellow-200 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={`w-full text-sm p-${isMobile ? "2" : "3"} border border-gray-300 rounded${isMobile ? "" : "-lg"} resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent`}
        rows={isMobile ? 3 : 4}
      />

      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className={`px-${isMobile ? "3" : "4"} py-${isMobile ? "1" : "2"} text-${isMobile ? "xs" : "sm"} text-gray-600 hover:text-gray-800 transition-colors`}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!rating || !comment.trim() || updating}
          className={`px-${isMobile ? "3" : "4"} py-${isMobile ? "1" : "2"} text-${isMobile ? "xs" : "sm"} bg-red-900 text-white rounded${isMobile ? "" : "-lg"} hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-${isMobile ? "1" : "2"}`}
        >
          {updating ? (
            <>
              <div
                className={`w-${isMobile ? "3" : "4"} h-${isMobile ? "3" : "4"} border${isMobile ? "" : "-2"} border-white border-t-transparent rounded-full animate-spin`}
              />
              Updating...
            </>
          ) : (
            <>
              <Check
                className={`w-${isMobile ? "3" : "4"} h-${isMobile ? "3" : "4"}`}
              />
              {isMobile ? "Update" : "Update Review"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
