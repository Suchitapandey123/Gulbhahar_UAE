import CollectionsPage from "@/all_components/Homepage/CollectionPage";
import React from "react";
import Collection from "../../components/Collection";
import ContentJuttis from "./components/ContentJuttisForWomen";
import ContentJuttisForWomen from "./components/ContentJuttisForWomen";
import QuickTag from "../../components/QuickTag";
import { popularTags  } from "../../tag";
import QuickSearch from "@/all_components/Homepage/QuickLinks";
export async function generateMetadata() {
  return {
    title:"Juttis for Women| Gulbhahar’s Limited Juttis for Women | Only 24 Pairs", 
    description: "Elevate your wardrobe with Gulbhahar’s limited‑edition juttis for women, only 24 pairs per design. Handcrafted by artisans, these exclusive shoes blend heritage craftsmanship with contemporary style.",
     keywords: ["Juttis for women", "Jutis for women", "juti for women", "Jutti for women", "jutty for women", "juty for women", "juttee for women", "jute for women", "jutties for women", "women juttis", "women juti"],

    alternates: {
      canonical: "https://www.gulbhahar.com/collections/juttis-for-women",
    },
    // openGraph: {
    //   title:"Juttis for Women| Gulbhahar’s Limited Juttis for Women | Only 24 Pairs",
    //   description: "Elevate your wardrobe with Gulbhahar’s limited‑edition juttis for women, only 24 pairs per design. Handcrafted by artisans, these exclusive shoes blend heritage craftsmanship with contemporary style.",
    //     type: "website",
    //   locale: "en_US",
    //   url: "https://www.gulbhahar.com/collections/juttis-for-women",
    //   siteName: "Gulbhahar",
    // },
  };
}

const page = () => {
  return (
    <div className="mt-24">
      <Collection />
      <ContentJuttisForWomen />
      <QuickTag popularTags={popularTags["juttis-for-women"]}  />
      <QuickSearch />
    </div>
  );
};

export default page;
