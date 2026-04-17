import ReviewsClient, { Review } from "./ReviewsClient";

interface ReviewsProps {
  variant?: "mobile" | "desktop";
  productId: string;
}

// Server-side fetch for initial reviews
async function getReviews(productId: string): Promise<Review[]> {
  if (!productId) return [];

  try {
    const response = await fetch(
      `https://api.gulbhahar.com/api/reviews/allReviews/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      // console.error("Failed to fetch reviews:", response.status);
      return [];
    }

    const data = await response.json();
    // console.log("Reviews API response:", JSON.stringify(data, null, 2));
    return data.reviews || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export default async function Reviews({ variant = "mobile", productId }: ReviewsProps) {
  // Fetch reviews on the server
  const initialReviews = await getReviews(productId);

  return (
    <ReviewsClient
      variant={variant}
      productId={productId}
      initialReviews={initialReviews}
    />
  );
}
