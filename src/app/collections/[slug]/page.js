import React from "react";
import ContentSection from "./components/ContentSection";
import Collection from "../components/Collection";
import QuickTag from "../components/QuickTag";
import { popularTags } from "../tag";
import { pageService } from "../../api/pageService/pageService";
import { notFound } from "next/navigation";

// Metadata generation
export async function generateMetadata({ params: rawParams }) {
  const params = await rawParams; // <--- await params
  const slug = params?.slug;
  if (!slug) return { title: "Invalid Page", description: "No slug" };

  try {
    const validateRes = await pageService.validateSlug(slug);
    if (!validateRes?.success) return { title: "Page Not Found", description: "No page found" };

    const res = await pageService.getPageBySlug(slug);
    const page = res?.data || res?.page;
    if (!page) return { title: "Page Not Found", description: "No content found" };

    return {
      title: page.metaTitle || `${slug} | Gulbhahar`,
      description: page.metaDescription || `Explore ${slug} collection.`,
      keywords: page.keywords || [slug, "Gulbhahar", "ethnic wear"],
    };
  } catch (err) {
    return { title: "Error", description: "Something went wrong" };
  }
}

// Page Component
export default async function Page({ params: rawParams }) {
  const params = await rawParams; // <--- await params here too
  const slug = params?.slug;
  if (!slug) return notFound();

  const validateRes = await pageService.validateSlug(slug);
  if (!validateRes?.success) return notFound();

  const res = await pageService.getPageBySlug(slug);
  const page = res?.data || res?.page;
  if (!page) return notFound();

  return (
    <div className="mt-24">
      <Collection />
      <ContentSection page={page} />
      <QuickTag popularTags={popularTags[slug] || popularTags["bridal-juttis"]} />
    </div>
  );
}
