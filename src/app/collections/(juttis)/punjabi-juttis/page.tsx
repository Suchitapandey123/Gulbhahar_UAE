import QuickTag from "../../components/QuickTag";
import { popularTags } from "../../tag";
import JuttisCollection from './components/Juttis.Collection';
import ContentPunjabiJuttis from './components/ContentPunjabiJuttis';

// ISR: Revalidate every hour (fallback), or on-demand via /api/revalidate
// Uses 'collections' and 'collection-punjabi-juttis' tags for targeted revalidation
export const revalidate = 86400; // 24 hours

export async function generateMetadata() {
  return {
    title: "Punjabi Juttis, Buy Punjabi Juttis (New Designs)",
    description: "Gulbhahar's handcrafted Punjabi juttis/ jutis are released in just 24 pairs per design. Each Panjabi Jutti comes with complimentary custom embroidery.",
    keywords: ["Punjabi Juttis", "Panjabi Juttis", "Punjabi Jutis", "Panjabi Jutis", "Punjabi Jutti", "Panjabi Jutti", "Punjabi Juti", "Panjabi Juti", "buy Punjabi Juttis", "buy Panjabi Juttis", "buy Punjabi Jutis", "buy Panjabi Jutis", "buy Punjabi Jutti", "buy Panjabi Jutti", "buy Punjabi Juti", "buy Panjabi Juti", "Punjabi Juttis online", "Panjabi Juttis online"],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections/punjabi-juttis",
    },
    openGraph: {
      title: "Punjabi Juttis, Buy Punjabi Juttis (New Designs)",
      description: "Gulbhahar's handcrafted Punjabi juttis/ jutis are released in just 24 pairs per design. Each Panjabi Jutti comes with complimentary custom embroidery.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/collections/punjabi-juttis",
      siteName: "Gulbhahar",
    },
  };
}

export default function Page() {
  return (
    <div className='mt-24'>
      <JuttisCollection />
      <ContentPunjabiJuttis />
      <QuickTag popularTags={popularTags["punjabi-juttis"]} />
    </div>
  )
}
