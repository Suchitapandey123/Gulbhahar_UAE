export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gulbhahar",
    url: "https://www.gulbhahar.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.gulbhahar.com/gulbhaharlogoo.jpeg",
    },
    description:
      "Buy Punjabi juttis, sarees & suits online from Gulbhahar. Discover trendy ethnic wear for women at best prices with quality you can trust.",
    sameAs: [
      "https://www.facebook.com/gulbhahar",
      "https://www.instagram.com/gulbhahar",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
