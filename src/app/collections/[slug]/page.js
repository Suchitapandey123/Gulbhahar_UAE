import React from "react";
import ContentSection from "./components/ContentSection";
import Collection from "../components/Collection";
import QuickTag from "../components/QuickTag";
import QuickLinks from "../components/QuickLinks";
import { popularTags } from "../tag";
import { pageService } from "../../api/pageService/pageService";
import { redirect } from "next/navigation";
import sitemapData from "@/utils/sitemapData.json"

export const revalidate = 86400; 
export const dynamicParams = true; 

function detectCategoryFromSlug(slug) {
  if (!slug) return 'suit'; // default fallback
  
  const slugLower = slug.toLowerCase();
  
  // Enhanced category detection
  if (slugLower.includes('saree') || slugLower.includes('sari')) return 'saree';
  if (slugLower.includes('lehenga')) return 'lehenga';
  if (slugLower.includes('suit') || slugLower.includes('blazer')) return 'suit';
  if (slugLower.includes('jutti') || slugLower.includes('mojari')) return 'juttis';
  if (slugLower.includes('dress') || slugLower.includes('gown')) return 'dress';
  if (slugLower.includes('kurta') || slugLower.includes('kurti')) return 'kurta';
  if (slugLower.includes('bridal')) {
    // Bridal can be multiple categories, check context
    if (slugLower.includes('saree')) return 'saree';
    if (slugLower.includes('lehenga')) return 'lehenga';
    return 'lehenga'; // default for bridal
  }
  
  return 'suit'; // default fallback
}

export async function generateMetadata({ params: rawParams }) {
  const params = await rawParams;
  const slug = params?.slug;

  if (!slug) {
    return {
      title: "Invalid Page",
      description: "No slug provided",
    };
  }

  // Product Slug Pattern
  const pattern = /^P\d{11}$/;
  if (pattern.test(slug)) {
    return {
      title: `Product ${slug} | Gulbhahar`,
      description: `Explore premium handcrafted product ${slug} at Gulbhahar.`,
      keywords: ["product", slug, "Gulbhahar"],
      alternates: {
        canonical: `https://www.gulbhahar.com/collections/${slug}`,
      },
      openGraph: {
        title: `Product ${slug} | Gulbhahar`,
        description: `Explore premium handcrafted product ${slug} at Gulbhahar.`,
        type: "product",
        url: `https://www.gulbhahar.com/collections/${slug}`,
        siteName: "Gulbhahar",
        locale: "en_US",
      },
    };
  }

  try {
    const validateRes = await pageService.validateSlug(slug);
    if (!validateRes?.success) {
      return {
        title: "Page Not Found",
        description: "The requested page does not exist.",
      };
    }

    const res = await pageService.getPageBySlug(slug);
    const page = res?.data || res?.page;

    if (!page) {
      return {
        title: "Page Not Found",
        description: "Content not available.",
      };
    }

    return {
      title: page.metaTitle || `${slug} | Gulbhahar`,
      description:
        page.metaDescription || `Explore curated collections of ${slug} at Gulbhahar.`,
      keywords: page.keywords || [slug, "Gulbhahar", "ethnic wear"],

      alternates: {
        canonical: `https://www.gulbhahar.com/collections/${slug}`,
      },

      // openGraph: {
      //   title: page.metaTitle || `${slug} | Gulbhahar`,
      //   description:
      //     page.metaDescription ||
      //     `Explore curated collections of ${slug} at Gulbhahar.`,
      //   type: "website",
      //   url: `https://www.gulbhahar.com/collections/${slug}`,
      //   siteName: "Gulbhahar",
      //   locale: "en_US",
      // },
    };
  } catch (err) {
    return {
      title: "Error",
      description: "Something went wrong",
    };
  }
}


export default async function Page({ params: rawParams }) {
  const params = await rawParams;
  const slug = params?.slug;
  if (!slug) redirect("/not-found");

  //Product pattern check
  const pattern = /^P\d{11}$/;
  const isMatching = pattern.test(slug);
  if (isMatching) {
    redirect(`/products/${slug}`);
  }

  const validateRes = await pageService.validateSlug(slug);
  if (!validateRes?.success) redirect("/not-found");

  const res = await pageService.getPageBySlug(slug);
  const page = res?.data || res?.page;
  if (!page) redirect("/not-found");

  // Detect category from slug
  const parentCategory = detectCategoryFromSlug(slug);
  
  console.log('Detected category:', parentCategory, 'for slug:', slug);

  return (
    <div className="mt-24">
      <Collection />
      <ContentSection page={page} />

      {/* QuickLinks with detected category */}
      <QuickLinks 
        parentCategory={parentCategory}
        currentSlug={slug}
      />

      <QuickTag popularTags={page?.keywords || []} />

    </div>
  );
}
