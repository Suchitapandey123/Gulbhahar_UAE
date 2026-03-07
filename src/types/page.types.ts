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

export interface PageData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  parentCategory: string[];
  onPageDescription?: string;
  isFeatured?: boolean;
  additionalDetails?: AdditionalDetail[];
  shortDescription?: string;
  faq?: FAQ[];
  bottomSection?: { title: string; description: string };
  [key: string]: unknown;
}

export interface ValidateSlugResponse {
  success: boolean;
}

export interface GetPageBySlugResponse {
  success: boolean;
  data?: PageData;
  page?: PageData;
}

export interface QuickLinksResponse {
  success: boolean;
  data: { [category: string]: string[] };
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
  additionalDescription: unknown[];
  additionalDetails: AdditionalDetail[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: unknown;
}

export interface GetParentCategoryPageBySlugResponse {
  success: boolean;
  data: ParentCategoryPageData;
  message: string;
}
