import profileAPI from '../app/api/profile/profile'; 

let searchTimeout;

export const debouncedSearch = async (query, delay = 300) => {
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
        const response = await profileAPI.searchCategories(query);
        // console.log('🔍 API Response:', response);
        
        // Handle array response
        if (Array.isArray(response)) {
          resolve({
            success: true,
            count: response.length,
            data: response.map(item => ({
              id: item.slug || item.value,
              title: item.title || 
                     (item.slug && item.slug.split('-')
                      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')) ||
                     item.label ||
                     'Untitled',
              slug: `/collections/${item.slug || item.value}`,
              parentCategory: item.parentCategory,
              original: item
            }))
          });
        } else {
          resolve(response);
        }
        
      } catch (error) {
        console.error('Debounce error:', error);
        reject(error);
      }
    }, delay);
  });
};

export const searchCategories = profileAPI.searchCategories;