import { Star, Quote, BadgeCheck } from "lucide-react";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  verified?: boolean;
}

interface CategoryTestimonialsSectionProps {
  tagline: string;
  title: string;
  reviews: Review[];
}

export default function CategoryTestimonialsSection({
  tagline,
  title,
  reviews,
}: CategoryTestimonialsSectionProps) {
  return (
    <section className=" bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-red-800 text-sm font-bold tracking-[0.2em] uppercase">
            {tagline}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mt-4">
            {title}
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-stone-50 rounded-2xl p-8 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-red-100 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-800 font-bold text-lg">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    {review.verified && (
                      <BadgeCheck className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
