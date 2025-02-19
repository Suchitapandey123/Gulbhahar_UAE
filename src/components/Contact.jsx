"use client"

import { useState } from "react"

export default function ContactPage() {
  const [queryType, setQueryType] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
   
  }

  return (
    <div className="container mx-auto px-4 py-12 font-raleway">
      <div className="mb-8 text-center font-raleway mt-16">
        <h1 className="text-5xl font-semibold mb-2">Contact & Support</h1>
        <p className="text-black">Interested in business sales? Message us to our team</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-lg font-semibold mb-1">Contact us</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {queryType || "Select query type"}
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    <div
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setQueryType("Sales Inquiry")
                        setIsDropdownOpen(false)
                      }}
                    >
                      Sales Inquiry
                    </div>
                    <div
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setQueryType("Technical Support")
                        setIsDropdownOpen(false)
                      }}
                    >
                      Technical Support
                    </div>
                    <div
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setQueryType("General Question")
                        setIsDropdownOpen(false)
                      }}
                    >
                      General Question
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <label htmlFor="full-name" className="block text-sm font-medium mb-1">
                Full Name*
              </label>
              <input
                id="full-name"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              />
            </div>

            <div className="space-y-2 mt-6">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              />
            </div>

            <div className="space-y-2 mt-6">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone number*
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              />
            </div>

            <div className="space-y-2 mt-6">
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Enter your location"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="space-y-2 mt-6">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Leave us a message"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 min-h-[120px] resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 bg-black text-white rounded-[12px] hover:bg-slateFour transition-colors"
            >
              Send message
            </button>
          </form>
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="font-semibold text-lg mb-1">Chat to sales</h2>
            <p className="text-sm text-black mb-1">Interested in business sales? Speak to our sales team</p>
            <a href="mailto:sales@gulbhahar.com" className="text-sm text-black font-semibold hover:underline">
              sales@gulbhahar.com
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-1">Email support</h2>
            <p className="text-sm text-black mb-1">Interested in business sales? Speak to our sales team</p>
            <a href="mailto:support@gulbhahar.com" className="text-sm hover:underline text-black font-semibold">
              support@gulbhahar.com
            </a>
          </div>

          <div>
            <h2 className="font-semibold mb-1">Call us</h2>
            <p className="text-sm text-gray-600 mb-1">Mon - Fri, 9:00 AM - 5:00 PM (UTC/GMT + 05:30)</p>
            <div className="space-y-1 text-black font-semibold">
              <a href="tel:+919878543210" className="text-sm block hover:underline">
                +91 9876543210
              </a>
              <a href="tel:+919878543210" className="text-sm block hover:underline">
                +91 9876543210
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-1">Office Address</h2>
            <p className="text-sm mb-1">S-12, Rajouri Garden, New Delhi-110079</p>
            <a href="#" className="text-sm hover:underline text-black">
              Locate on map
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

