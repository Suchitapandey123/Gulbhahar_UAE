import { useState, useEffect, useCallback } from "react";

export const useImagePreloader = (images: string[] = []) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const preloadImage = useCallback(
    (src: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, src]));
          resolve(src);
        };

        img.onerror = () => {
          setFailedImages((prev) => new Set([...prev, src]));
          reject(src);
        };

        img.src = src;
      });
    },
    []
  );

  const preloadImages = useCallback(
    async (imagesToPreload: string[]) => {
      if (!imagesToPreload.length) return;
      setIsLoading(true);
      try {
        const promises = imagesToPreload.map((src) => {
          if (loadedImages.has(src) || failedImages.has(src)) {
            return Promise.resolve(src);
          }
          return preloadImage(src);
        });
        await Promise.allSettled(promises);
      } catch (error) {
        console.warn("Some images failed to preload:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [loadedImages, failedImages, preloadImage]
  );

  const isImageLoaded = useCallback(
    (src: string) => loadedImages.has(src),
    [loadedImages]
  );

  const isImageFailed = useCallback(
    (src: string) => failedImages.has(src),
    [failedImages]
  );

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
    isImageFailed,
  };
};
