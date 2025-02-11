'use client'
import { useState } from 'react'
import { Filter, Grid, List, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from './Breadcrumb'
import { useRouter } from 'next/router'; 

const collections = [
  { id: 1, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'FALL 2024', stock: 12, size: 'S' },
  { id: 2, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XXS' },
  { id: 3, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'M' },
  { id: 4, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'L' },
  { id: 5, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XL' },
  { id: 7, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XS' },
  { id: 8, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XS' },
  { id: 9, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XS' },
  { id: 10, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XS' },
  { id: 11, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XS' },
  { id: 12, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XS' },
  { id: 13, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XS' },
  { id: 14, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XS' },
  { id: 15, name: 'Noorani Outfit', price: 5000, image: '/16.svg', season: 'WINTER 2024', stock: 15, size: 'XS' },
]

const seasons = ['ALL','FALL 2024', 'WINTER 2024', 'SPRING 2024', 'SPRING SUMMER 2024']

export default function Home() {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedSeason, setSelectedSeason] = useState('ALL')
  const [priceRange, setPriceRange] = useState([2000, 5000])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [minPrice, setMinPrice] = useState(2000)
  const [maxPrice, setMaxPrice] = useState(5000)

  const filteredCollections = collections.filter(item => {
    const matchesSeason = selectedSeason === 'ALL' || item.season === selectedSeason
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(item.size)
    return matchesSeason && matchesPrice && matchesSize
  })

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max])
    setMinPrice(min)
    setMaxPrice(max)
  }

  const clearFilters = () => {
    setSelectedSeason('ALL')
    setPriceRange([2000, 5000])
    setMinPrice(2000)
    setMaxPrice(5000)
    setSelectedSizes([])
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mt-16">
          <Image
            src="/banner.svg"
            alt="Latest Collections Banner"
            width={1512}
            height={349}
            priority
          />
        </div>
        {/* <div className='mt-4'>
          <Breadcrumb/>
        </div> */}
        <div className="flex flex-col md:flex-row gap-8 mt-20 ">
          <div className="w-[337px] md:w-64 mt-10 p-6 rounded-lg bg-slateColor2 shadow-lg h-[896px]">
            <div className="flex justify-between items-center mb-6 ">
              <h3 className="text-lg font-medium font-raleway">Filter</h3>
              <button 
                onClick={clearFilters}
                className="text-customRed text-sm hover:text-customRed flex items-center font-raleway gap-1"
              >
                  Advance
              </button>
            </div>

            <div className="mb-6 bg-white">
              <h4 className="text-sm font-medium mb-3 font-raleway bg-white">Price Range</h4>
              <div className="space-y-4 bg-white">
                <div className="flex items-center gap-4 font-raleway">
                  <input
                    type="range"
                    min="2000"
                    max="5000"
                    step="100"
                    value={minPrice}
                    onChange={(e) => handlePriceChange(parseInt(e.target.value), maxPrice)}
                    className="w-full accent-customPaleYellow bg-white"
                  />
                </div>
                <div className="flex items-center gap-4 font-raleway">
                  <input
                    type="range"
                    min="2000"
                    max="5000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(minPrice, parseInt(e.target.value))}
                    className="w-full accent-customPaleYellow"
                  />
                </div>
                <div className="flex items-center gap-4 font-raleway">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => handlePriceChange(parseInt(e.target.value), maxPrice)}
                    className="w-full px-3 py-1 border rounded-md text-sm"
                    placeholder="Min"
                  />
                  <span className="text-white border-black shadow-lg">-</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(minPrice, parseInt(e.target.value))}
                    className="w-full px-3 py-1 border rounded-md text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 font-raleway">Size</h4>
              <div className="grid grid-cols-3 gap-2 border-customYellow shadow-lg font-raleway rounded-lg">
                {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      if (selectedSizes.includes(size)) {
                        setSelectedSizes(selectedSizes.filter(s => s !== size))
                      } else {
                        setSelectedSizes([...selectedSizes, size])
                      }
                    }}
                    className={`px-3 py-1 text-sm border rounded-md ${
                      selectedSizes.includes(size)
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {(selectedSizes.length > 0 || selectedSeason !== 'ALL' || priceRange[0] !== 2000 || priceRange[1] !== 5000) && (
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSizes.map((size) => (
                    <span key={size} className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-1">
                      {size}
                      <button
                        onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                  {selectedSeason !== 'ALL' && (
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-1">
                      {selectedSeason}
                      <button
                        onClick={() => setSelectedSeason('ALL')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {(priceRange[0] !== 2000 || priceRange[1] !== 5000) && (
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-1">
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                      <button
                        onClick={() => handlePriceChange(2000, 5000)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 mt-28">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center ">
                <div className="flex gap-8 text-[20px]  overflow-x-auto pb-2 border-black shadow-lg font-raleway">
                  {seasons.map((season) => (
                    <button
                      key={season}
                      onClick={() => setSelectedSeason(season)}
                      className={`border-black px-4 py-2 text-sm rounded-md whitespace-nowrap text-center ${
                        selectedSeason === season
                          ? 'bg-black text-white shadow-lg rounded-lg'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className={`grid ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            } gap-6`}>
              {filteredCollections.map((item) => (
                <Link href={`/collection/${item.id}`} key={item.id}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="relative pb-[100%] rounded-lg shadow-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={307.54}
                        height={372.73}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.season}</p>
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                        </div>
                        <p className="font-medium">₹{item.price}</p>
                      </div>
                      <p className="text-sm text-customRed">{item.stock} items left</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}