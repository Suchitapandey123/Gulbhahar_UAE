import { API_BASE_URL } from "@/utils/envHere";

export interface ContentSection {
  heading: string;
  paragraphs: string;
}

export interface ContentFAQ {
  question: string;
  answer: string;
}

export interface CategoryPageData {
  slug: string;
  parentCategory: string[];
  category: string;
  onPageTitle: string;
  OnPageIntro: string;
  sections: ContentSection[];
  faqs: ContentFAQ[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  isActive: boolean;
  isFeatured: boolean;
  canonicalSlug: string | null;
  isClusterCanonical: boolean;
}

export interface CategoryPageResponse {
  success: boolean;
  redirect?: boolean;
  redirectTo?: string;
  data?: CategoryPageData;
  message?: string;
}

const fetchWithTimeout = (url: string, options: RequestInit & { next?: any }, ms = 5000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
};

export async function getCategoryPageBySlug(slug: string): Promise<CategoryPageResponse | null> {
  try {
    const res = await fetchWithTimeout(
      `${API_BASE_URL}/new-api/category-pages/slug/${slug}`,
      { next: { revalidate: 604800, tags: ["category-pages", `category-page-${slug}`] } }
    );

    const json = await res.json();

    // 301 redirect from old StaticPage
    if (res.status === 301 && json.redirect && json.redirectTo) {
      return { success: false, redirect: true, redirectTo: json.redirectTo };
    }

    if (!res.ok || !json.success) return null;

    return json;
  } catch (error) {
    console.error("Error fetching category page:", error);
    return null;
  }
}
