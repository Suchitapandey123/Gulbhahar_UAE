import CollectionsPage from "@/all_components/Homepage/CollectionPage";
import React from "react";
import Collection from "../../components/Collection";
import ContentJuttis from "./components/ContentJuttisForWomen";
import ContentJuttisForWomen from "./components/ContentJuttisForWomen";

export async function generateMetadata() {
  return {
    title:"Buy Juttis For Women - 30% OFF GULBHAHAR", 
    description: "Explore Gulbhahar's handcrafted juttis for women collection. Luxury Juttis with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
    alternates: {
      canonical: "https://www.gulbhahar.com/collections/juttis-for-women",
    },
    openGraph: {
      title:"Juttis For Women (New Collection) | GULBHAHAR |  Premium Juttis for Women",
      description: "Explore Gulbhahar's handcrafted juttis for women collection. Luxury Juttis with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
        type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/collections/juttis-for-women",
      siteName: "Gulbhahar",
    },
  };
}

const page = () => {
  return (
    <div className="mt-24">
      <Collection />
      <ContentJuttisForWomen />
    </div>
  );
};

export default page;
