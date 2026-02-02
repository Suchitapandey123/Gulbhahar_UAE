import categoryPageContent from "@/app/data/categoryPageContent.json";
import CategoryCTASection from "./CategoryCTASection";
import CategoryFAQSection from "./CategoryFAQSection";
import CategoryFeaturesSection from "./CategoryFeaturesSection";
import CategoryParagraphSection, { ContentBlock } from "./CategoryParagraphSection";
import CategoryStorySection from "./CategoryStorySection";
import CategoryTestimonialsSection from "./CategoryTestimonialsSection";

interface CategoryContentSectionProps {
  categorySlug: string;
}

type CategoryKey = keyof typeof categoryPageContent.categories;

export default function CategoryContentSection({
  categorySlug,
}: CategoryContentSectionProps) {
  // Get content for this category
  const content =
    categoryPageContent.categories[categorySlug as CategoryKey] ||
    categoryPageContent.categories["juttis"];

  if (!content) {
    return null;
  }

  return (
    <div className="font-raleway space-y-8">
      {/* Story Section */}
      {content.story && (
        <CategoryStorySection
          tagline={content.story.tagline}
          title={content.story.title}
          description={content.story.description}
          highlights={content.story.highlights}
          image={content.story.image}
        />
      )}

      {/* Features Section */}
      {content.features && (
        <CategoryFeaturesSection
          tagline={content.features.tagline}
          title={content.features.title}
          items={content.features.items}
        />
      )}

      {/* Paragraph Content Section */}
      {content.content && (
        <CategoryParagraphSection
          tagline={content.content.tagline}
          title={content.content.title}
          blocks={content.content.blocks as ContentBlock[]}
        />
      )}

      {/* Testimonials Section */}
      {content.testimonials && (
        <CategoryTestimonialsSection
          tagline={content.testimonials.tagline}
          title={content.testimonials.title}
          reviews={content.testimonials.reviews}
        />
      )}

      {/* FAQ Section */}
      {content.faq && (
        <CategoryFAQSection
          title={content.faq.title}
          items={content.faq.items}
        />
      )}

      {/* CTA Section */}
      {content.cta && (
        <CategoryCTASection
          title={content.cta.title}
          description={content.cta.description}
          buttonText={content.cta.buttonText}
          buttonLink={content.cta.buttonLink}
        />
      )}
    </div>
  );
}
