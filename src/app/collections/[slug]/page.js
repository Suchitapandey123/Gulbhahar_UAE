import React from "react";
import ContentSection from "./components/ContentSection";
import Collection from "../components/Collection";
import QuickTag from "../components/QuickTag";
import { popularTags } from "../tag";
import { pageService } from "../../api/pageService/pageService";
import { redirect } from "next/navigation";
import sitemapData from "@/utils/sitemapData.json"

export const revalidate = 86400; // Cache for 24 hours
export const dynamicParams = true; // Enable on-demand generation


export async function generateMetadata({ params: rawParams }) {
  const params = await rawParams;
  const slug = params?.slug;

  if (!slug) return { title: "Invalid Page", description: "No slug" };


  const pattern = /^P\d{11}$/;
  if (pattern.test(slug)) {
    return {
      title: `Product ${slug}`,
      description: `Explore product ${slug}`,
      keywords: ["product", slug, "Gulbhahar"],
    };
  }

  try {
    const validateRes = await pageService.validateSlug(slug);
    if (!validateRes?.success)
      return { title: "Page Not Found", description: "No page found" };

    const res = await pageService.getPageBySlug(slug);
    const page = res?.data || res?.page;
    if (!page)
      return { title: "Page Not Found", description: "No content found" };

    return {
      title: page.metaTitle || `${slug} | Gulbhahar`,
      description: page.metaDescription || `Explore ${slug} collection.`,
      keywords: page.keywords || [slug, "Gulbhahar", "ethnic wear"],
    };
  } catch (err) {
    return { title: "Error", description: "Something went wrong" };
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

  return (
    <div className="mt-24">
      <Collection />
      <ContentSection page={page} />
      <QuickTag popularTags={page?.keywords || []} />

    </div>
  );
}
