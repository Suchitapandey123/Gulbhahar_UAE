import { profileService } from "@/services/profile/profileService";
import { CategorySlug } from "@/services/profile/profileService";

let searchTimeout: ReturnType<typeof setTimeout> | undefined;

interface SearchResult {
  success: boolean;
  count: number;
  data: Array<{
    id: string;
    title: string;
    slug: string;
    parentCategory: string;
    original: CategorySlug;
  }>;
}

export const debouncedSearch = async (
  query: string,
  delay = 300
): Promise<SearchResult> => {
  return new Promise((resolve, reject) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (!query || query.trim().length === 0) {
      resolve({ success: true, count: 0, data: [] });
      return;
    }

    searchTimeout = setTimeout(async () => {
      try {
        const response = await profileService.searchCategories(query);

        if (Array.isArray(response)) {
          resolve({
            success: true,
            count: response.length,
            data: response.map((item) => ({
              id: item.slug,
              title:
                item.title ||
                item.slug
                  .split("-")
                  .map(
                    (w: string) => w.charAt(0).toUpperCase() + w.slice(1)
                  )
                  .join(" "),
              slug: `/collections/${item.slug}`,
              parentCategory: item.parentCategory,
              original: item,
            })),
          });
        } else {
          resolve(response as unknown as SearchResult);
        }
      } catch (error) {
        console.error("Debounce error:", error);
        reject(error);
      }
    }, delay);
  });
};

export const searchCategories = profileService.searchCategories;
