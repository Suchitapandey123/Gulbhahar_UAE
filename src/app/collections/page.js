import CollectionPage from '@/app/collections/components/Collection';
import LocalCollection from '@/modules/(gulbhahar)/collections/Local';


// ISR: Revalidate every hour (fallback), or on-demand via /api/revalidate
// Uses 'collections' tag for targeted revalidation
// export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Gulbhahar Collection Page - Suits, Sarees, Juttis etc",
    description: "Explore Gulbhahar's exquisite ethnic wear collection. Premium footwear with embroidery suits & Sarees with authentic designs.",
    keywords: ["gulbhahar collection", "suits", "sarees", "juttis", "saree", "sadi", "jutti", "soots", "ethnic wear", "ethnic collection"],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections",
    },
    openGraph: {
      title: "Gulbhahar Collection Page - Suits, Sarees, Juttis etc",
      description: "Explore Gulbhahar's exquisite ethnic wear collection. Premium footwear with embroidery suits & Sarees with authentic designs.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/collections",
      siteName: "Gulbhahar",
    },
  };
}

export default function Page() {
  return (
    <>
      <LocalCollection />
    </>
  )
}
