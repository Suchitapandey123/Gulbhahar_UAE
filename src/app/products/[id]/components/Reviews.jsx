"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { ReviewForm } from "./reviews/ReviewForm";
import { ReviewStats } from "./reviews/ReviewStats";
import { RatingBreakdown } from "./reviews/RatingBreakdown";
import { SortDropdown } from "./reviews/SortDropdown";
import { ReviewItem } from "./reviews/ReviewItem";
import { useAuth } from "@/providers/ContextProviders/AuthContext";

export default function Reviews({ variant = "mobile", productId }) {
  const [sortOrder, setSortOrder] = useState("Newest");
  
  // Use Auth Context
  const { isAuthenticated, getUserId, authToken } = useAuth();
  
  // API-related state
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(null);
  
  // Form state
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Check if user has already reviewed this product
  const checkUserReview = () => {
    const currentUserId = getUserId();
    if (currentUserId && reviews.length > 0) {
      const userReview = reviews.find(review => 
        (review.userId?.toString() === currentUserId?.toString()) || 
        (review.user_id?.toString() === currentUserId?.toString()) ||
        (review.authorId?.toString() === currentUserId?.toString())
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

  // API functions
  const fetchReviews = async () => {
    if (!productId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const url = `https://api.gulbhahar.com/api/reviews/allReviews/${productId}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': authToken ? `Bearer ${authToken}` : '',
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

  const submitReview = async ({ rating, comment }) => {
    if (!productId) return;
    
    try {
      setSubmitting(true);
      
      const response = await fetch('https://api.gulbhahar.com/api/reviews/createReview', {
        method: 'POST',
        headers: {
          'Authorization': authToken ? `Bearer ${authToken}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating,
          comment,
          productId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (errorData.message === "You have already reviewed this product") {
          setHasUserReviewed(true);
          setShowReviewForm(false);
          return;
        }
        
        throw new Error(`Failed to submit review: ${response.status}`);
      }

      const data = await response.json();
      setReviews(prev => [data.review, ...prev]);
      setShowReviewForm(false);
      
    } catch (err) {
      if (!err.message.includes("already reviewed")) {
        setError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const updateReview = async (reviewId, { rating, comment }) => {
    try {
      setUpdating(true);
      setError(null);
      
      const response = await fetch(`https://api.gulbhahar.com/api/reviews/updateReview/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Authorization': authToken ? `Bearer ${authToken}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, comment })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update review: ${response.status}`);
      }

      const data = await response.json();
      
      setReviews(prev => prev.map(review => 
        review.reviewId === reviewId ? { ...review, ...data.review } : review
      ));
      
    } catch (err) {
      setError(`Update failed: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      setDeleting(reviewId);
      
      const token = typeof window !== 'undefined' 
        ? (localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken'))
        : '';
      
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
      
      setReviews(prev => prev.filter(review => review.reviewId !== reviewId));
      setHasUserReviewed(false);
      
    } catch (err) {
      setError(`Delete failed: ${err.message}`);
    } finally {
      setDeleting(null);
    }
  };

  const canModifyReview = (review) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      return false;
    }
    
    // Get current user ID from Auth Context
    const currentUserId = getUserId();
    if (!currentUserId) {
      return false;
    }
    
    // Get review user ID and compare
    const reviewUserId = (review.userId || review.user_id || review.authorId)?.toString();
    const currentUserIdStr = currentUserId.toString();
    
    const canModify = reviewUserId === currentUserIdStr;
    
    // Debug logging
    // // console.log('=== AUTH CONTEXT MODIFY CHECK ===');
    // // console.log('Is Authenticated:', isAuthenticated);
    // // console.log('Current User ID (from context):', currentUserIdStr);
    // // console.log('Review User ID:', reviewUserId);
    // // console.log('Can Modify:', canModify);
    // // console.log('Review object:', review);
    // // console.log('================================');
    
    return canModify;
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

  // Effects
  useEffect(() => {
    fetchReviews();
  }, [productId]);

  useEffect(() => {
    checkUserReview();
  }, [reviews, isAuthenticated]); // Added isAuthenticated dependency

  const isMobile = variant === "mobile";
  const containerClass = isMobile ? "lg:hidden mt-8" : "hidden lg:block mt-12 lg:mt-16";

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-1 h-${isMobile ? '5' : '6'} bg-red-900 rounded-full`}></div>
        <h3 className={`font-${isMobile ? 'bold text-lg' : 'semibold text-xl sm:text-2xl lg:text-3xl'} text-gray-900`}>
          Customer Reviews
        </h3>
        {/* Only show "Write Review" button if user is logged in and hasn't reviewed */}
        {isAuthenticated && !hasUserReviewed ? (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className={`ml-auto ${isMobile ? 'p-2' : 'px-4 py-2'} bg-red-900 text-white rounded${isMobile ? '-full' : '-lg'} hover:bg-red-800 transition-colors flex items-center gap-2`}
          >
            <Plus className={`w-${isMobile ? '4' : '5'} h-${isMobile ? '4' : '5'}`} />
            {!isMobile && 'Write Review'}
          </button>
        ) : isAuthenticated && hasUserReviewed ? (
          <div className={`ml-auto px-${isMobile ? '3' : '4'} py-${isMobile ? '1' : '2'} bg-gray-100 text-gray-600 rounded${isMobile ? '-full' : '-lg'} text-${isMobile ? 'xs' : 'sm'} flex items-center gap-2`}>
            <span>✓</span>
            {isMobile ? 'Already Reviewed' : 'Already Reviewed'}
          </div>
        ) : (
          <div className={`ml-auto px-${isMobile ? '3' : '4'} py-${isMobile ? '1' : '2'} bg-yellow-100 text-yellow-800 rounded${isMobile ? '-full' : '-lg'} text-${isMobile ? 'xs' : 'sm'} flex items-center gap-2`}>
            <span>👤</span>
            {isMobile ? 'Login to Review' : 'Login to Write Review'}
          </div>
        )}
      </div>

      {/* Already Reviewed Message */}
      {isAuthenticated && hasUserReviewed && (
        <div className={`mb-${isMobile ? '4' : '6'} p-${isMobile ? '3' : '4'} bg-blue-50 border border-blue-200 rounded-lg`}>
          <p className={`text-${isMobile ? 'sm' : 'base'} text-blue-800 font-medium ${!isMobile && 'mb-1'}`}>
            ✓ You have already reviewed this product
          </p>
          <p className={`text-${isMobile ? 'xs' : 'sm'} text-blue-600 ${isMobile && 'mt-1'}`}>
            Thank you for your feedback! You can only review each product once.
          </p>
        </div>
      )}

      {/* Review Form - Only show if user is logged in */}
      {isAuthenticated && (
        <ReviewForm
          showForm={showReviewForm}
          onClose={() => setShowReviewForm(false)}
          onSubmit={submitReview}
          submitting={submitting}
          variant={variant}
        />
      )}

      {/* Main Content */}
      <div className={`bg-gray-50 rounded-lg p-${isMobile ? '4 sm:p-6' : '6'} border-l-4 border-red-900 mb-6`}>
        {loading ? (
          <ReviewStats loading={true} variant={variant} />
        ) : error ? (
          <div className={`text-center py-${isMobile ? '8' : '12'}`}>
            <p className={`text-${isMobile ? 'sm' : 'base'} text-red-600 mb-${isMobile ? '2' : '4'}`}>
              {error}
            </p>
            {error !== "You have already reviewed this product" && (
              <button
                onClick={fetchReviews}
                className={`text-${isMobile ? 'sm' : 'base'} text-red-900 hover:underline ${!isMobile && 'font-medium'}`}
              >
                Try again
              </button>
            )}
          </div>
        ) : (
          <>
            <ReviewStats
              avgRating={avgRating}
              totalReviews={reviews.length}
              breakdown={breakdown}
              variant={variant}
            />

            <RatingBreakdown
              breakdown={breakdown}
              totalReviews={reviews.length}
              variant={variant}
            />

            {reviews.length > 0 && (
              <SortDropdown
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
                variant={variant}
              />
            )}

            {/* Reviews List */}
            {reviews.length > 0 ? (
              <div className={`h-${isMobile ? '80' : '96'} overflow-y-auto pr-${isMobile ? '1' : '2'} scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-gray-100`}>
                <div className={`space-y-${isMobile ? '4' : '6'}`}>
                  {sortedReviews.map((review, idx) => (
                    <ReviewItem
                      key={review._id || idx}
                      review={review}
                      index={idx}
                      onEdit={updateReview}
                      onDelete={deleteReview}
                      canModify={canModifyReview(review)}
                      formatDate={formatDate}
                      variant={variant}
                      deleting={deleting === (review.reviewId || review._id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className={`text-center py-${isMobile ? '8' : '12'}`}>
                <p className={`text-${isMobile ? 'sm' : 'base'} text-gray-600 ${isMobile ? 'mb-0' : 'mb-2'}`}>
                  No reviews yet
                </p>
                <p className={`text-${isMobile ? 'xs' : 'sm'} text-gray-500`}>
                  Be the first to review this product!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}