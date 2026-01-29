import Home_AvailableCollections from "@/modules/(gulbhahar)/home/Home.AvailableCollections";
import Home_NewCulture from "@/modules/(gulbhahar)/home/Home.NewCulture";
import Home_WatchAndShop from "@/modules/(gulbhahar)/home/Home.WatchAndShop";
import type { Product } from "@/modules/(gulbhahar)/products/types";
import React from "react";
import HeroAnimated from "../../modules/(gulbhahar)/home/HeroAnimated";
import NewCollection from "./NewCollection";

import AboutUsSection from "./AboutUsSection";
import Home_OurShowcase from "@/modules/(gulbhahar)/home/Home.OurShowcase";

// Types
interface HomePageProps {
  data: Product[];
}
const HomePage = ({ data }: HomePageProps) => {
  return (
    <>
      <HeroAnimated />
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full px-2 space-y-8">
        <Home_WatchAndShop />
        <Home_AvailableCollections />
        <NewCollection newCollection={data} />
        <AboutUsSection />
        <Home_NewCulture />
        <Home_OurShowcase />
      </div>
    </>
  );
};

export default HomePage;
