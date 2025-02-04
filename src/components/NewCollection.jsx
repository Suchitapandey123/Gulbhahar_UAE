import { ArrowUpRight, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function NewCollection() {
  const collections = [
    {
      id: 1,
      image:"../../public/new1.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
      
    },
    {
      id: 2,
      image:"../../public/new2.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
     
    },
    {
      id: 3,
      image:"../../public/new3.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            NEW COLLECTION
          </h1>
          <button className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors">
            SEE MORE
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item) => (
            <div key={item.id} className="group relative">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={item.image }
                  alt={item.name}
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{item.name}</h3>
                  <p className="mt-1 text-sm font-medium text-gray-900">{item.price}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
