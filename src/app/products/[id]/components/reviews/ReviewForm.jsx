"use client";
import { useState } from "react";
import { Star, Send, X } from "lucide-react";

export function ReviewForm({ 
  showForm, 
  onClose, 
  onSubmit, 
  submitting = false,
  variant = "desktop" 
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating && comment.trim()) {
      onSubmit({ rating, comment });
      setRating(0);
      setComment("");
    }
  };

  const isMobile = variant === "mobile";

  if (!showForm) return null;

  return (
    <div className={`mb-6 p-${isMobile ? '4' : '6'} bg-gray-50 rounded-lg border`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className={`font-${isMobile ? 'medium text-sm' : 'semibold text-lg'}`}>
          Write a Review
        </h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Rating Selection */}
      <div className="mb-4">
        <p className={`text-${isMobile ? 'xs' : 'sm'} text-gray-600 mb-${isMobile ? '2' : '3'}`}>
          Rating:
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((starRating) => (
            <Star
              key={starRating}
              onClick={() => setRating(starRating)}
              className={`w-${isMobile ? '6' : '8'} h-${isMobile ? '6' : '8'} cursor-pointer transition-all duration-200 ${
                starRating <= rating
                  ? "fill-yellow-400 text-yellow-400 hover:scale-110"
                  : "fill-gray-300 text-gray-300 hover:fill-yellow-200 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this product..."
        className={`w-full text-sm p-${isMobile ? '3' : '4'} border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent mb-${isMobile ? '3' : '4'}`}
        rows={isMobile ? "4" : "5"}
      />

      {/* Submit Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className={`px-${isMobile ? '4' : '6'} py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors`}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!rating || !comment.trim() || submitting}
          className={`px-${isMobile ? '4' : '6'} py-2 text-sm bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className={`w-${isMobile ? '4' : '5'} h-${isMobile ? '4' : '5'}`} />
              Submit Review
            </>
          )}
        </button>
      </div>
    </div>
  );
}