
import QuickTag from "../../components/QuickTag";
import { popularTags } from "../../tag";
import JuttisCollection from "../punjabi-juttis/components/Juttis.Collection"
import ContentJuttisForWomen from "./components/ContentJuttisForWomen";

// ISR: Revalidate every hour (fallback), or on-demand via /api/revalidate
// Uses 'collections' and 'collection-juttis-for-women' tags for targeted revalidation
export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Juttis for Women, Buy Juttis for Women | Gulbhahar",
    description: "Elevate your wardrobe with Gulbhahar's limited-edition juttis for women, only 24 pairs per design. Handcrafted by artisans.",
    keywords: ["Juttis for women", "Jutis for women", "juti for women", "Jutti for women", "jutty for women", "juty for women", "juttee for women", "jute for women", "jutties for women", "women juttis", "women juti"],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections/juttis-for-women",
    },
    openGraph: {
      title: "Juttis for Women, Buy Juttis for Women | Gulbhahar",
      description: "Elevate your wardrobe with Gulbhahar's limited-edition juttis for women, only 24 pairs per design. Handcrafted by artisans.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/collections/juttis-for-women",
      siteName: "Gulbhahar",
    },
  };
}

export default function Page() {
  return (
    <div className="mt-24">
      <JuttisCollection />
      <ContentJuttisForWomen />
      <QuickTag popularTags={popularTags["juttis-for-women"]} />
    </div>
  );
}
