import QuickTag from "../../components/QuickTag";
import { popularTags } from "../../tag";
import JuttisCollection from "../punjabi-juttis/components/Juttis.Collection";
import ContentJuttis from "./components/ContentJuttis";

// ISR: Revalidate every hour (fallback), or on-demand via /api/revalidate
// Uses 'collections' and 'collection-juttis' tags for targeted revalidation
export const revalidate = 86400; // 24 hours

export async function generateMetadata() {
  return {
    title: "Juttis : Buy Juttis @ Gulbhahar (upto 50% OFF)",
    description: "Gulbhahar's handcrafted juttis are released in just 24 pairs per design. Each Jutti comes with complimentary custom embroidery.",
    keywords: ["Juttis", "Jutis", "juti", "Jutti", "jutty", "juty", "juttee", "jute", "jutties", "buy juttis", "buy juti"],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections/juttis",
    },
    openGraph: {
      title: "Juttis | Gulbhahar's Limited-Edition Juttis | Only 24 Pairs per Design",
      description: "Gulbhahar's handcrafted juttis are released in just 24 pairs per design. Each Jutti comes with complimentary custom embroidery.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/collections/juttis",
      siteName: "Gulbhahar",
    },
  };
}

export default function Page() {
  return (
    <div className='mt-24'>
      <JuttisCollection />
      <ContentJuttis />
      <QuickTag popularTags={popularTags["juttis"]} />
    </div>
  )
}
