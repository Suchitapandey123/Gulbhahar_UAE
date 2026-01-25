import All_Collections from "@/modules/(gulbhahar)/collections";

// ISR Configuration: Revalidate every 7 days (604800 seconds)
export const revalidate = 604800;
export const dynamicParams = true;

export async function generateMetadata() {
  return {
    title: "Gulbhahar Collection Page - Suits, Sarees, Juttis etc",
    description:
      "Explore Gulbhahar's exquisite ethnic wear collection. Premium footwear with embroidery suits & Sarees with authentic designs.",
    keywords: [
      "gulbhahar collection",
      "suits",
      "sarees",
      "juttis",
      "saree",
      "sadi",
      "jutti",
      "soots",
      "ethnic wear",
      "ethnic collection",
    ],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections",
    },
    openGraph: {
      title: "Gulbhahar Collection Page - Suits, Sarees, Juttis etc",
      description:
        "Explore Gulbhahar's exquisite ethnic wear collection. Premium footwear with embroidery suits & Sarees with authentic designs.",
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
      <All_Collections />
    </>
  );
}
