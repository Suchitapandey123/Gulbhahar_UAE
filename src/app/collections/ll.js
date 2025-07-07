<div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
<div 
  ref={modalRef}
  className="relative w-full h-full flex items-center justify-center"
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
  {/* Close Button */}
  <button
    onClick={closeModal}
    className="absolute top-4 right-4 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
  >
    <X className="w-6 h-6 text-white" />
  </button>

  {/* Navigation Buttons */}
  {currentImages.length > 1 && (
    <>
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>
    </>
  )}

  {/* Main Modal Image with Loading State */}
  <div className="relative max-w-4xl max-h-screen p-4">
    <div className="relative">
      <Image
        src={currentImages[modalImageIndex] || currentMainImage}
        alt={`${product.name} - ${currentColor} - Image ${modalImageIndex + 1}`}
        className="max-w-full max-h-full object-contain select-none"
        width={1200}
        height={800}
        priority
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      
      {/* Preload adjacent images */}
      {currentImages.map((img, idx) => {
        const isAdjacent = Math.abs(idx - modalImageIndex) <= 1 && idx !== modalImageIndex;
        return isAdjacent ? (
          <link key={idx} rel="preload" as="image" href={img} />
        ) : null;
      })}
    </div>
  </div>

  {/* Image Counter */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
    <span className="text-white text-sm font-medium">
      {modalImageIndex + 1} / {currentImages.length}
    </span>
  </div>

  {/* Optimized Thumbnail Strip */}
  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-screen-sm overflow-x-auto px-4">
    {currentImages.map((img, idx) => (
      <button
        key={idx}
        onClick={() => setModalImageIndex(idx)}
        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
          modalImageIndex === idx
            ? "border-white shadow-lg scale-110"
            : "border-transparent opacity-70 hover:opacity-100"
        }`}
      >
        <Image
          src={img}
          alt={`Thumbnail ${idx + 1}`}
          className="object-cover w-full h-full"
          width={64}
          height={64}
          quality={60}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </button>
    ))}
  </div>
</div>
</div>