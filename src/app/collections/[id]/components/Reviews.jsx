"use client";
import { useState, useEffect } from "react";
import { Star, ThumbsUp, ThumbsDown, User, Send, X, Plus, Edit, Trash2, Check } from "lucide-react";

export default function Reviews({ variant = "mobile", productId }) {
  const [userRating, setUserRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState({});
  
  // API-related state
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  
  // New review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState("");

  // Edit review state
  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Get current user info (you might need to adjust this based on your auth system)
  const getCurrentUserId = () => {
    // This should return the current user's ID from your auth system
    // You might need to get this from localStorage, context, or props
    return localStorage.getItem('userId') || localStorage.getItem('user_id') || localStorage.getItem('currentUserId');
  };

  // Check if user has already reviewed this product
  const checkUserReview = () => {
    const currentUserId = getCurrentUserId();
    if (currentUserId && reviews.length > 0) {
      const userReview = reviews.find(review => 
        review.userId === currentUserId || review.user_id === currentUserId
      );
      setHasUserReviewed(!!userReview);
    }
  };

  // Calculate average rating and statistics
  const calculateStats = () => {
    if (reviews.length === 0) return { avgRating: 0, breakdown: [] };
    
    const breakdown = [5, 4, 3, 2, 1].map(stars => ({
      stars,
      count: reviews.filter(review => Math.floor(review.rating) === stars).length
    }));
    
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    
    return { avgRating: avgRating.toFixed(1), breakdown };
  };

  const { avgRating, breakdown } = calculateStats();

  // Fetch reviews from API
  const fetchReviews = async () => {
    if (!productId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
      
      const url = `https://api.gulbhahar.com/api/reviews/allReviews/${productId}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch reviews: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      setReviews(data.reviews || []);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit new review
  const submitReview = async () => {
    if (!newReviewRating || !newReviewComment.trim() || !productId) {
      return;
    }
    
    try {
      setSubmitting(true);
      
      const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
      
      const response = await fetch('https://api.gulbhahar.com/api/reviews/createReview', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: newReviewRating,
          comment: newReviewComment.trim(),
          productId: productId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Check if user has already reviewed
        if (errorData.message === "You have already reviewed this product") {
          setHasUserReviewed(true);
          setShowReviewForm(false);
          // Don't set this as a general error since reviews should still load
          return;
        }
        
        throw new Error(`Failed to submit review: ${response.status}`);
      }

      const data = await response.json();
      
      // Add the new review to the list
      setReviews(prev => [data.review, ...prev]);
      
      // Reset form
      setNewReviewRating(0);
      setNewReviewComment("");
      setShowReviewForm(false);
      
    } catch (err) {
      // Only set error for actual submission errors, not "already reviewed"
      if (!err.message.includes("already reviewed")) {
        setError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Update review
  const updateReview = async (reviewId) => {
    if (!editRating || !editComment.trim()) {
      setError('Please provide both rating and comment');
      return;
    }
    
    try {
      setUpdating(true);
      setError(null);
      
      const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
      
      const response = await fetch(`https://api.gulbhahar.com/api/reviews/updateReview/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: editRating,
          comment: editComment.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update review: ${response.status}`);
      }

      const data = await response.json();
      
      // Update the review in the list
      setReviews(prev => prev.map(review => 
        review.reviewId === reviewId ? { ...review, ...data.review } : review
      ));
      
      // Reset edit state
      setEditingReview(null);
      setEditRating(0);
      setEditComment("");
      
      // Show success message (optional)
      console.log('Review updated successfully');
      
    } catch (err) {
      setError(`Update failed: ${err.message}`);
      console.error('Update review error:', err);
    } finally {
      setUpdating(false);
    }
  };

  // Delete review
  const deleteReview = async (reviewId) => {
    const confirmMessage = 'Are you sure you want to delete this review? This action cannot be undone.';
    
    if (!window.confirm(confirmMessage)) {
      return;
    }
    
    try {
      setDeleting(reviewId);
      
      const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
      
      const response = await fetch(`https://api.gulbhahar.com/api/reviews/deleteReview/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete review: ${response.status}`);
      }
      
      // Remove the review from the list
      setReviews(prev => prev.filter(review => review.reviewId !== reviewId));
      
      // If this was the user's review, allow them to write a new one
      setHasUserReviewed(false);
      
      // Show success message (optional)
      console.log('Review deleted successfully');
      
    } catch (err) {
      setError(`Delete failed: ${err.message}`);
      console.error('Delete review error:', err);
    } finally {
      setDeleting(null);
    }
  };

  // Start editing a review
  const startEdit = (review) => {
    const reviewId = review.reviewId || review._id;
    setEditingReview(reviewId);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingReview(null);
    setEditRating(0);
    setEditComment("");
  };

  // Check if current user can edit/delete a review
  const canModifyReview = (review) => {
    const currentUserId = getCurrentUserId();
    return currentUserId && (review.userId === currentUserId || review.user_id === currentUserId);
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Check if user has already reviewed when reviews change
  useEffect(() => {
    checkUserReview();
  }, [reviews]);

  const handleReply = (reviewIndex) => {
    if (replyText.trim()) {
      const newReply = {
        user: "You",
        text: replyText.trim(),
        date: "just now",
        timestamp: new Date().toISOString()
      };

      setReplies(prev => ({
        ...prev,
        [reviewIndex]: [...(prev[reviewIndex] || []), newReply]
      }));

      setReplyText("");
      setReplyingTo(null);
    }
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours < 24) {
      return diffInHours < 1 ? 'just now' : `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    return sortOrder === "Newest"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  // Mobile/Tablet Version
  if (variant === "mobile") {
    return (
      <div className="lg:hidden mt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-5 bg-red-900 rounded-full"></div>
          <h3 className="font-bold text-lg text-gray-900">Customer Reviews</h3>
          {!hasUserReviewed ? (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="ml-auto p-2 bg-red-900 text-white rounded-full hover:bg-red-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          ) : (
            <div className="ml-auto px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              Already Reviewed
            </div>
          )}
        </div>

        {/* Already Reviewed Message - Mobile */}
        {hasUserReviewed && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              ✓ You have already reviewed this product
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Thank you for your feedback! You can only review each product once.
            </p>
          </div>
        )}

        {/* New Review Form - Mobile */}
        {showReviewForm && !hasUserReviewed && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-sm mb-3">Write a Review</h4>
            
            {/* Rating Selection */}
            <div className="mb-3">
              <p className="text-xs text-gray-600 mb-2">Rating:</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    onClick={() => setNewReviewRating(rating)}
                    className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
                      rating <= newReviewRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-300 text-gray-300 hover:fill-yellow-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Comment Input */}
            <textarea
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full text-sm p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent mb-3"
              rows="4"
            />

            {/* Submit Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                disabled={!newReviewRating || !newReviewComment.trim() || submitting}
                className="px-4 py-2 text-sm bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Rating Overview - Mobile */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-red-900 mb-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Loading reviews...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-sm text-red-600 mb-2">{error}</p>
              <button
                onClick={fetchReviews}
                className="text-sm text-red-900 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="flex">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          idx < Math.floor(avgRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-gray-900">
                      {avgRating}
                    </span>
                    <p className="text-xs text-gray-600">out of 5</p>
                    <p className="text-xs text-gray-500">({reviews.length} reviews)</p>
                  </div>
                </div>
              </div>

              {/* Rating Breakdown - Mobile */}
              {breakdown.length > 0 && (
                <div className="space-y-2 my-6">
                  {breakdown.map(({ stars, count }) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="w-3 text-xs font-medium">{stars}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-900 to-red-700 transition-all duration-500 rounded-full"
                          style={{ width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="w-6 text-xs text-gray-600 font-medium">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Sort Dropdown - Mobile */}
              {reviews.length > 0 && (
                <div className="mb-4">
                  <div className="relative inline-block">
                    <select
                      className="appearance-none border border-gray-300 rounded-lg py-2 px-3 pr-8 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent w-36 font-medium"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="Newest">Newest First</option>
                      <option value="Oldest">Oldest First</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <svg
                        className="h-3 w-3 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Individual Reviews - Mobile - Scrollable Container */}
              {reviews.length > 0 ? (
                <div className="h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-gray-100">
                  <div className="space-y-4">
                    {sortedReviews.map((review, idx) => (
                      <div
                        key={review._id || idx}
                        className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm"
                      >
                        {/* Review Header - Mobile */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-red-900 to-red-700 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {review.userName || review.name || 'Anonymous User'}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          {/* Edit/Delete buttons for user's own reviews - Mobile - ALWAYS SHOW FOR TESTING */}
                          <div className="flex gap-1">
                            {/* Show for all reviews temporarily for testing */}
                            <button
                              onClick={() => startEdit(review)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit review"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteReview(review.reviewId || review._id)}
                              disabled={deleting === (review.reviewId || review._id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                              title="Delete review"
                            >
                              {deleting === (review.reviewId || review._id) ? (
                                <div className="w-3 h-3 border border-red-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-3 h-3" />
                              )}
                            </button>
                            {/* Show user info for debugging */}
                            <span className="text-xs text-gray-400 ml-1">
                              {canModifyReview(review) ? '✓' : '✗'}
                            </span>
                          </div>
                        </div>

                        {/* Edit Review Form - Mobile */}
                        {editingReview === (review.reviewId || review._id) ? (
                          <div className="space-y-3">
                            {/* Edit Rating */}
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Rating:</p>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <Star
                                    key={rating}
                                    onClick={() => setEditRating(rating)}
                                    className={`w-5 h-5 cursor-pointer transition-all duration-200 ${
                                      rating <= editRating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-300 text-gray-300 hover:fill-yellow-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Edit Comment */}
                            <textarea
                              value={editComment}
                              onChange={(e) => setEditComment(e.target.value)}
                              className="w-full text-sm p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                              rows="3"
                            />

                            {/* Edit Actions */}
                            <div className="flex gap-2">
                              <button
                                onClick={cancelEdit}
                                className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => updateReview(review.reviewId || review._id)}
                                disabled={!editRating || !editComment.trim() || updating}
                                className="px-3 py-1 text-xs bg-red-900 text-white rounded hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                              >
                                {updating ? (
                                  <>
                                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                                    Updating...
                                  </>
                                ) : (
                                  <>
                                    <Check className="w-3 h-3" />
                                    Update
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Review Rating - Mobile */}
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, idx) => (
                                  <Star
                                    key={idx}
                                    className={`w-3 h-3 ${
                                      idx < Math.floor(review.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-300 text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs font-medium text-gray-700">
                                ({review.rating}/5)
                              </span>
                            </div>

                            {/* Review Comment - Mobile */}
                            <p className="text-xs text-gray-700 mb-3 bg-gray-50 p-2 rounded italic">
                              "{review.comment}"
                            </p>

                            {/* Review Actions - Mobile */}
                            <div className="flex items-center gap-3 text-xs">
                              <button 
                                onClick={() => setReplyingTo(replyingTo === idx ? null : idx)}
                                className="text-red-900 hover:text-red-700 transition-colors font-medium"
                              >
                                {replyingTo === idx ? 'Cancel' : 'Reply'}
                              </button>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3 text-green-600" />
                                <span className="text-green-600 font-medium">10</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsDown className="w-3 h-3 text-red-500" />
                                <span className="text-red-500 font-medium">0</span>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Reply Input - Mobile */}
                        {replyingTo === idx && editingReview !== (review.reviewId || review._id) && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                            <div className="flex gap-2">
                              <div className="w-6 h-6 bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-3 h-3 text-white" />
                              </div>
                              <div className="flex-1">
                                <textarea
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Write your reply..."
                                  className="w-full text-xs p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                                  rows="3"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                  <button
                                    onClick={cancelReply}
                                    className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleReply(idx)}
                                    disabled={!replyText.trim()}
                                    className="px-3 py-1 text-xs bg-red-900 text-white rounded hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                  >
                                    <Send className="w-3 h-3" />
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Display Replies - Mobile */}
                        {replies[idx] && replies[idx].length > 0 && (
                          <div className="mt-3 space-y-2">
                            {replies[idx].map((reply, replyIdx) => (
                              <div key={replyIdx} className="ml-4 p-2 bg-blue-50 rounded-lg border-l-2 border-blue-300">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                    <User className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-xs font-medium text-gray-900">{reply.user}</span>
                                  <span className="text-xs text-gray-500">{reply.date}</span>
                                </div>
                                <p className="text-xs text-gray-700 ml-7">{reply.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-600">No reviews yet</p>
                  <p className="text-xs text-gray-500">Be the first to review this product!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // Desktop Version
  return (
    <div className="hidden lg:block mt-12 lg:mt-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-red-900 rounded-full"></div>
        <h3 className="font-semibold text-xl sm:text-2xl lg:text-3xl text-gray-900">
          Customer Reviews
        </h3>
        {!hasUserReviewed ? (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="ml-auto px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Write Review
          </button>
        ) : (
          <div className="ml-auto px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm flex items-center gap-2">
            <span>✓</span>
            Already Reviewed
          </div>
        )}
      </div>

      {/* Already Reviewed Message - Desktop */}
      {hasUserReviewed && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium mb-1">
            ✓ You have already reviewed this product
          </p>
          <p className="text-sm text-blue-600">
            Thank you for your feedback! You can only review each product once.
          </p>
        </div>
      )}

      {/* New Review Form - Desktop */}
      {showReviewForm && !hasUserReviewed && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-lg mb-4">Write a Review</h4>
          
          {/* Rating Selection */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">Rating:</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  onClick={() => setNewReviewRating(rating)}
                  className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                    rating <= newReviewRating
                      ? "fill-yellow-400 text-yellow-400 hover:scale-110"
                      : "fill-gray-300 text-gray-300 hover:fill-yellow-200 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <textarea
            value={newReviewComment}
            onChange={(e) => setNewReviewComment(e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full text-sm p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent mb-4"
            rows="5"
          />

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowReviewForm(false)}
              className="px-6 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={submitReview}
              disabled={!newReviewRating || !newReviewComment.trim() || submitting}
              className="px-6 py-2 text-sm bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Review
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Rating Overview - Desktop */}
      <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-900 mb-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-2 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            {error !== "You have already reviewed this product" && (
              <button
                onClick={fetchReviews}
                className="text-red-900 hover:underline font-medium"
              >
                Try again
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${
                        idx < Math.floor(avgRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {avgRating}
                  </span>
                  <p className="text-sm text-gray-600">out of 5</p>
                  <p className="text-sm text-gray-500">({reviews.length} reviews)</p>
                </div>
              </div>
            </div>

            {/* Rating Breakdown - Desktop */}
            {breakdown.length > 0 && (
              <div className="space-y-3 my-8">
                {breakdown.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="w-3 text-sm font-medium">{stars}</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-900 to-red-700 transition-all duration-500 rounded-full"
                        style={{ width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-8 text-sm text-gray-600 font-medium">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Sort Dropdown - Desktop */}
            {reviews.length > 0 && (
              <div className="mb-6">
                <div className="relative inline-block">
                  <select
                    className="appearance-none border border-gray-300 rounded-lg py-2 px-4 pr-8 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent w-40 font-medium"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="Newest">Newest First</option>
                    <option value="Oldest">Oldest First</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Individual Reviews - Desktop - Scrollable Container */}
            {reviews.length > 0 ? (
              <div className="h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-gray-100">
                <div className="space-y-6">
                  {sortedReviews.map((review, idx) => (
                    <div
                      key={review._id || idx}
                      className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Review Header - Desktop */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-900 to-red-700 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-sm sm:text-base font-medium text-gray-900">
                            {review.userName || review.name || 'Anonymous User'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {formatDate(review.createdAt)}
                          </span>
                          {/* Edit/Delete buttons for user's own reviews - Desktop - ALWAYS SHOW FOR TESTING */}
                          <div className="flex gap-1">
                            {/* Show for all reviews temporarily for testing */}
                            <button
                              onClick={() => startEdit(review)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit review"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteReview(review.reviewId || review._id)}
                              disabled={deleting === (review.reviewId || review._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                              title="Delete review"
                            >
                              {deleting === (review.reviewId || review._id) ? (
                                <div className="w-4 h-4 border border-red-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                            {/* Show user info for debugging */}
                            <span className="text-xs text-gray-400 ml-1">
                              Current: {getCurrentUserId()} | Review: {review.userId || review.user_id || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Edit Review Form - Desktop */}
                      {editingReview === (review.reviewId || review._id) ? (
                        <div className="space-y-4">
                          {/* Edit Rating */}
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Rating:</p>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <Star
                                  key={rating}
                                  onClick={() => setEditRating(rating)}
                                  className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
                                    rating <= editRating
                                      ? "fill-yellow-400 text-yellow-400 hover:scale-110"
                                      : "fill-gray-300 text-gray-300 hover:fill-yellow-200 hover:scale-110"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Edit Comment */}
                          <textarea
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            className="w-full text-sm p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                            rows="4"
                          />

                          {/* Edit Actions */}
                          <div className="flex gap-3">
                            <button
                              onClick={cancelEdit}
                              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => updateReview(review.reviewId || review._id)}
                              disabled={!editRating || !editComment.trim() || updating}
                              className="px-4 py-2 text-sm bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              {updating ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <Check className="w-4 h-4" />
                                  Update Review
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Review Rating - Desktop */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-gray-500 font-medium">Rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, idx) => (
                                <Star
                                  key={idx}
                                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                    idx < Math.floor(review.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-300 text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-gray-700 ml-2">
                              ({review.rating}/5)
                            </span>
                          </div>

                          {/* Review Comment - Desktop */}
                          <p className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded italic">
                            "{review.comment}"
                          </p>

                          {/* Review Actions - Desktop */}
                          <div className="flex items-center gap-4 text-sm">
                            <button 
                              onClick={() => setReplyingTo(replyingTo === idx ? null : idx)}
                              className="text-red-900 hover:text-red-700 transition-colors font-medium hover:underline"
                            >
                              {replyingTo === idx ? 'Cancel Reply' : 'Reply'}
                            </button>
                            <div className="flex items-center gap-1 hover:bg-green-50 px-2 py-1 rounded transition-colors">
                              <ThumbsUp className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-medium">10</span>
                            </div>
                            <div className="flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors">
                              <ThumbsDown className="w-3 h-3 text-red-500" />
                              <span className="text-red-500 font-medium text-xs">0</span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Reply Input - Desktop */}
                      {replyingTo === idx && editingReview !== (review.reviewId || review._id) && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                          <div className="flex gap-3">
                            <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write your reply..."
                                className="w-full text-sm p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                                rows="3"
                              />
                              <div className="flex justify-end gap-3 mt-3">
                                <button
                                  onClick={cancelReply}
                                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleReply(idx)}
                                  disabled={!replyText.trim()}
                                  className="px-4 py-2 text-sm bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                  <Send className="w-4 h-4" />
                                  Post Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Display Replies - Desktop */}
                      {replies[idx] && replies[idx].length > 0 && (
                        <div className="mt-4 space-y-3">
                          {replies[idx].map((reply, replyIdx) => (
                            <div key={replyIdx} className="ml-6 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-300">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{reply.user}</span>
                                <span className="text-sm text-gray-500">{reply.date}</span>
                              </div>
                              <p className="text-sm text-gray-700 ml-10">{reply.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-2">No reviews yet</p>
                <p className="text-sm text-gray-500">Be the first to review this product!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}