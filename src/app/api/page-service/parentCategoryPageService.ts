import { API_BASE_URL } from "@/utils/envHere";

export interface FAQ {
  question: string;
  answer: string;
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface AdditionalDetail {
  subTitle1?: string;
  subDescription1?: string;
  subTitle2?: string;
  subDescription2?: string;
  highlight?: string;
  subTitle3?: string;
  subDescription3?: string;
  subTitle4?: string;
  subDescription4?: string;
  tags?: string[];
  subTitle5?: string;
  subDescription5?: string;
  subTitle6?: string;
  subDescription6?: string;
  keyValues?: KeyValue[];
  subTitle7?: string;
  subDescription7?: string;
  subTitle8?: string;
  subDescription8?: string;
}

export interface ParentCategoryPageData {
  _id: string;
  slug: string;
  slugId: string;
  parentCategory: string[];
  category: string;
  onPageTitle: string;
  onPageDescription: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  seoImage: string;
  faq: FAQ[];
  additionalDescription: any[];
  additionalDetails: AdditionalDetail[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: any;
}

export interface GetParentCategoryPageBySlugResponse {
  success: boolean;
  data?: ParentCategoryPageData;
  message?: string;
}

export const parentCategoryPageService = {
  async getParentCategoryPageBySlug(slug: string): Promise<GetParentCategoryPageBySlugResponse> {
    if (!slug) throw new Error("Slug is required");
    const res = await fetch(
      `${API_BASE_URL}/new-api/parent-category/slug/${slug}`,
      {
        next: {
          revalidate: 604800,
          tags: ["parent-categories", `parent-category-${slug}`],
        },
      },
    );
    if (!res.ok) {
      const text = await res.text();
      console.error("Error response:", text);
      throw new Error("Failed to fetch parent page");
    }
    return res.json();
  },
};
