// @ts-nocheck
import Home_AvailableCollections from "@/modules/(gulbhahar)/home/Home.AvailableCollections";
import Home_NewCulture from "@/modules/(gulbhahar)/home/Home.NewCulture";
import Home_OurShowcase from "@/modules/(gulbhahar)/home/Home.OurShowcase";
import Home_WatchAndShop from "@/modules/(gulbhahar)/home/Home.WatchAndShop";
import AboutUsSection from "@/shared-components/Homepage/AboutUsSection";
import ModernHeroAnimated from "./HeroAnimated";
import Home_JuttisCollection from "./Home.JuttisCollection";
import { homeService as homePageService } from "@/services/home/homeService";
import QuickLinks from "@/app/collections/components/QuickLinks";
import Home_MoreAbout from "./Home.MoreAbout";

const HomePage = async () => {
  const [homeData, categoryProducts] = await Promise.all([
    homePageService.getHomeData(),
    homePageService.getCategoryProducts(),
  ]);

  const cp = categoryProducts.data || {};

  return (
    <>
      <ModernHeroAnimated heroSection={homeData.data?.["hero-section"]} />
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full px-2 space-y-5">
        <Home_WatchAndShop WatchAndShopData={homeData.data?.["watch-and-shop"] || []} />
        <Home_AvailableCollections AvailableCollections={homeData.data?.["available-collections"] || []} />
        <Home_JuttisCollection slug={"/suit"} name={"Suits Collection"} newCollection={cp.suit || []} />
        <Home_JuttisCollection slug={"/saree"} name={"Sarees Collection"} newCollection={cp.saree || []} />
        <Home_JuttisCollection slug={"/bags"} name={"Bags Collection"} newCollection={cp.bags || []} />
        <Home_JuttisCollection slug={"/juttis"} name={"Juttis Collection"} newCollection={cp.juttis || []} />
        <AboutUsSection SoulOfGulbhahar={homeData.data?.["soul-of-gulbhahar"] || []} />
        <Home_NewCulture Culture={homeData.data?.culture || []} />
        <Home_OurShowcase StoriesInMotion={homeData.data?.["stories-in-motion"] || []} />
        <Home_MoreAbout MoreAboutContent={homeData.data?.["more-about"]} />
        <QuickLinks parentCategory={"lehenga"} currentSlug={"kanjivaram-lehenga"} />
      </div>
    </>
  );
};

export default HomePage;
