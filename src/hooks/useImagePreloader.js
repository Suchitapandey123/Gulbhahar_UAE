// hooks/useImagePreloader.js
import { useState, useEffect, useCallback } from 'react';

export const useImagePreloader = (images = []) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const preloadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        resolve(src);
      };
      
      img.onerror = () => {
        setFailedImages(prev => new Set([...prev, src]));
        reject(src);
      };
      
      img.src = src;
    });
  }, []);

  const preloadImages = useCallback(async (imagesToPreload) => {
    if (!imagesToPreload.length) return;
    
    setIsLoading(true);
    
    try {
      const promises = imagesToPreload.map(src => {
        if (loadedImages.has(src) || failedImages.has(src)) {
          return Promise.resolve(src);
        }
        return preloadImage(src);
      });
      
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loadedImages, failedImages, preloadImage]);

  const isImageLoaded = useCallback((src) => {
    return loadedImages.has(src);
  }, [loadedImages]);

  const isImageFailed = useCallback((src) => {
    return failedImages.has(src);
  }, [failedImages]);

  // Auto-preload when images prop changes
  useEffect(() => {
    if (images.length > 0) {
      preloadImages(images);
    }
  }, [images, preloadImages]);

  return {
    loadedImages,
    failedImages,
    isLoading,
    preloadImages,
    preloadImage,
    isImageLoaded,
    isImageFailed
  };
};

// Usage in your component:
/*
const MyComponent = () => {
  const { isImageLoaded, preloadImages } = useImagePreloader();
  
  // Preload specific images
  useEffect(() => {
    preloadImages(['image1.jpg', 'image2.jpg']);
  }, []);
  
  return (
    <div>
      {isImageLoaded('image1.jpg') ? (
        <img src="image1.jpg" alt="Loaded" />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
*/