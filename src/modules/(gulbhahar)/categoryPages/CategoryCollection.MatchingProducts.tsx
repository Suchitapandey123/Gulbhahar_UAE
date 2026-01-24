import productApi from '@/app/api/v0/product-service'
import ProductCard from '../common/ProductCard'

interface AvailableSize {
    name: string;
}

interface AvailableColor {
    name: string;
    hexcode: string;
}

interface Product {
    id?: string;
    productId?: string;
    name?: string;
    title?: string;
    price: number;
    originalPrice?: number;
    images?: string[][];
    availableSizes?: AvailableSize[];
    availableColors?: AvailableColor[];
    category?: string[];
    parentCategory?: string[];
    isActive?: boolean;
}

const CategoryCollection_MatchingProducts = async () => {
    let products: Product[] = []

    try {
        const allProducts = await productApi.getAllProduct()
        // Filter only active juttis and take first 8
        products = (allProducts || [])
            .filter((product: Product) =>
                product.isActive !== false &&
                (product.category?.includes('juttis') ||
                product.parentCategory?.includes('juttis'))
            )
            .slice(0, 8)
    } catch (error) {
        console.error('Error fetching matching products:', error)
    }

    if (products.length === 0) {
        return null
    }

    return (
        <>
            {/* Heading */}
            <div className="col-span-full w-full my-6 text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-red-900">
                    Complete Your Look With These Juttis
                </h2>
                <p className="text-sm text-gray-600">
                    Perfect footwear to pair with your dream outfit
                </p>
            </div>

            {/* Products Grid */}
            <div className="col-span-full max-w-[1600px] mx-auto w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.productId || product.id || index}
                            item={product}
                            index={index}
                            priority={index < 2}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CategoryCollection_MatchingProducts
