export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gulbhahar",
    url: "https://www.gulbhahar.com",
    description:
      "Buy Punjabi juttis, sarees & suits online from Gulbhahar. Discover trendy ethnic wear for women at best prices with quality you can trust.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.gulbhahar.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
