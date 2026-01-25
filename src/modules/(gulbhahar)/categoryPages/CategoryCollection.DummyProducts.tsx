import DummyProductCard from '@/app/collections/components/DummyProductCard'
import Image from 'next/image'

interface CategoryCollectionDummyProductsProps {
    parentCategory: string
    slug: string
    viewMode?: "grid" | "list"
}

const CategoryCollection_DummyProducts = ({
    parentCategory,
    slug,
    viewMode = "grid",
}: CategoryCollectionDummyProductsProps) => {
    return (
        <div className="w-full px-2 lg:px-2 mx-auto max-w-[1600px]">
            <div className={`${viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" : "flex flex-col gap-4"}`} >   
                {[1, 2, 3, 4].map((_, index) => (
                    <DummyProductCard
                        key={`dummy-${index}`}
                        parentCategory={parentCategory as any}
                        slug={slug as any}
                        viewMode={viewMode}
                        index={index}
                    />
                ))}

                 {/* Banner after dummy products */}
                <div className="col-span-full w-full my-4">
                    <Image
                        src="https://gulbahar-backend.s3.ap-south-1.amazonaws.com/public/banner-image.jpg"
                        width={1600}
                        height={400}
                        sizes="100vw"
                        alt="Similar Products Below"
                        loading="lazy"
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        className="w-full h-auto  rounded-lg shadow-lg"
                    />
                </div> 
            </div>
        </div>
    )
}

export default CategoryCollection_DummyProducts
