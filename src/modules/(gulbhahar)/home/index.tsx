import Home_AvailableCollections from "@/modules/(gulbhahar)/home/Home.AvailableCollections";
import Home_NewCulture from "@/modules/(gulbhahar)/home/Home.NewCulture";
import Home_OurShowcase from "@/modules/(gulbhahar)/home/Home.OurShowcase";
import Home_WatchAndShop from "@/modules/(gulbhahar)/home/Home.WatchAndShop";
import type { Product } from "@/modules/(gulbhahar)/products/types";
import AboutUsSection from "@/shared-components/Homepage/AboutUsSection";
import ModernHeroAnimated from "./HeroAnimated";
import Home_JuttisCollection from "./Home.JuttisCollection";
import productApi from "@/app/api/v0/product-service";

async function getProducts(): Promise<Product[]> {
  try {
    const data = await productApi.getAllProduct();
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const HomePage = async () => {
  const data = await getProducts();

  return (
    <>
      <ModernHeroAnimated />
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full px-2 space-y-8">
        <Home_WatchAndShop />
        <Home_AvailableCollections />
        <Home_JuttisCollection newCollection={data} />
        <AboutUsSection />
        <Home_NewCulture />
        <Home_OurShowcase />
      </div>
    </>
  );
};

export default HomePage;
