"use client";
import { Edit, Star, ThumbsDown, ThumbsUp, Trash2, User } from "lucide-react";
import { useState } from "react";
import { ReplySection } from "./ReplySection";
import { ReviewEditForm } from "./ReviewEditForm";

interface ReviewItemProps {
  review: {
    reviewId: string;
    _id?: string;
    userName?: string;
    name?: string;
    createdAt: string;
    rating: number;
    comment: string;
    [key: string]: any;
  };
  index: number;
  onEdit: (id: string, data: { rating: number; comment: string }) => void;
  onDelete: (id: string) => void;
  canModify: boolean;
  formatDate: (date: string) => string;
  variant?: "mobile" | "desktop";
  deleting?: boolean;
}

export function ReviewItem({
  review,
  index,
  onEdit,
  onDelete,
  canModify,
  formatDate,
  variant = "desktop",
  deleting = false,
}: ReviewItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [editing, setEditing] = useState(false);

  const isMobile = variant === "mobile";
  const reviewId = review.reviewId || review._id || "";

  const handleEditStart = () => {
    setEditing(true);
  };

  const handleEditSave = (editData: { rating: number; comment: string }) => {
    onEdit(reviewId, editData);
    setEditing(false);
  };

  const handleEditCancel = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    const confirmMessage =
      "Are you sure you want to delete this review? This action cannot be undone.";
    if (window.confirm(confirmMessage)) {
      onDelete(reviewId);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg p-${isMobile ? "3" : "4"} border border-gray-100 shadow-sm ${!isMobile && "hover:shadow-md transition-shadow duration-200"}`}
    >
      <div
        className={`flex ${isMobile ? "items-center gap-2" : "flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"} mb-${isMobile ? "2" : "3"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-${isMobile ? "8" : "10"} h-${isMobile ? "8" : "10"} bg-gradient-to-r from-red-900 to-red-700 rounded-full flex items-center justify-center`}
          >
            <User
              className={`w-${isMobile ? "4" : "6"} h-${isMobile ? "4" : "6"} text-white`}
            />
          </div>
          <p
            className={`text-${isMobile ? "sm" : "sm sm:text-base"} font-medium text-gray-900`}
          >
            {review.userName || review.name || "Anonymous User"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-${isMobile ? "xs" : "sm"} text-gray-500 ${!isMobile && "bg-gray-100 px-2 py-1 rounded"}`}
          >
            {formatDate(review.createdAt)}
          </span>

          {canModify && (
            <div className="flex gap-1">
              <button
                onClick={handleEditStart}
                className={`p-${isMobile ? "1" : "2"} text-blue-600 hover:bg-blue-50 rounded transition-colors`}
                title="Edit review"
              >
                <Edit
                  className={`w-${isMobile ? "3" : "4"} h-${isMobile ? "3" : "4"}`}
                />
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`p-${isMobile ? "1" : "2"} text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50`}
                title="Delete review"
              >
                {deleting ? (
                  <div
                    className={`w-${isMobile ? "3" : "4"} h-${isMobile ? "3" : "4"} border border-red-600 border-t-transparent rounded-full animate-spin`}
                  />
                ) : (
                  <Trash2
                    className={`w-${isMobile ? "3" : "4"} h-${isMobile ? "3" : "4"}`}
                  />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {editing ? (
        <ReviewEditForm
          review={review}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
          variant={variant}
        />
      ) : (
        <>
          <div className={`flex items-center gap-2 mb-${isMobile ? "2" : "3"}`}>
            {!isMobile && (
              <span className="text-sm text-gray-500 font-medium">Rating:</span>
            )}
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-${isMobile ? "3" : "4 sm:w-5"} h-${isMobile ? "3" : "4 sm:h-5"} ${
                    idx < Math.floor(review.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span
              className={`text-${isMobile ? "xs" : "sm"} font-medium text-gray-700 ${!isMobile && "ml-2"}`}
            >
              ({review.rating}/5)
            </span>
          </div>

          <p
            className={`text-${isMobile ? "xs" : "sm"} text-gray-700 mb-${isMobile ? "3" : "4"} bg-gray-50 p-${isMobile ? "2" : "3"} rounded italic`}
          >
            "{review.comment}"
          </p>

          <div
            className={`flex items-center gap-${isMobile ? "3" : "4"} text-${isMobile ? "xs" : "sm"}`}
          >
            <button
              onClick={() => setShowReply(!showReply)}
              className={`text-red-900 hover:text-red-700 transition-colors font-medium ${!isMobile && "hover:underline"}`}
            >
              {showReply ? "Cancel" : "Reply"}
            </button>
            <div
              className={`flex items-center gap-1 ${!isMobile && "hover:bg-green-50 px-2 py-1 rounded transition-colors"}`}
            >
              <ThumbsUp
                className={`w-${isMobile ? "3" : "4"} h-${isMobile ? "3" : "4"} text-green-600`}
              />
              <span className="text-green-600 font-medium">10</span>
            </div>
            <div
              className={`flex items-center gap-1 ${!isMobile && "hover:bg-red-50 px-2 py-1 rounded transition-colors"}`}
            >
              <ThumbsDown
                className={`w-${isMobile ? "3" : "3"} h-${isMobile ? "3" : "3"} text-red-500`}
              />
              <span
                className={`text-red-500 font-medium ${isMobile && "text-xs"}`}
              >
                0
              </span>
            </div>
          </div>
        </>
      )}

      {showReply && !editing && (
        <ReplySection reviewIndex={index} variant={variant} />
      )}
    </div>
  );
}
