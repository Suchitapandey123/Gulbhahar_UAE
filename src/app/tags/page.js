export default function MergedComponents() {
    // Keywords data
    const keywords = [
      'Swimming Pool', 'Garden', 'Garage', 'Balcony', 'Terrace', 'Fireplace', 'Basement', 'Attic',
      'Walk-in Closet', 'Hardwood Floors', 'Tile Flooring', 'Carpet', 'Central Air', 'Heating',
      'Double Glazing', 'Solar Panels', 'Security System', 'Intercom', 'Elevator', 'Concierge',
      'City Center', 'Suburban', 'Waterfront', 'Mountain View', 'Park View', 'Near School',
      'Near Hospital', 'Shopping Mall', 'Public Transport', 'Metro Station', 'Bus Stop',
      'Airport Access', 'Highway Access', 'Quiet Street', 'Pedestrian Zone', 'Commercial Area',
      'Apartment', 'House', 'Villa', 'Townhouse', 'Condo', 'Loft', 'Studio', 'Penthouse',
      'Duplex', 'Triplex', 'Single Family', 'Multi Family', 'New Construction', 'Renovated',
      'Historic', 'Modern', 'Contemporary', 'Traditional', 'Colonial', 'Mediterranean',
      '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom', '5+ Bedroom', '1 Bathroom',
      '2 Bathroom', '3 Bathroom', 'Master Suite', 'Guest Room', 'Office Space', 'Den',
      'Family Room', 'Living Room', 'Dining Room', 'Kitchen', 'Updated Kitchen', 'Island Kitchen',
      'Furnished', 'Unfurnished', 'Pet Friendly', 'No Pets', 'Smoking Allowed', 'No Smoking',
      'Utilities Included', 'Internet Included', 'Cable TV', 'Washer/Dryer', 'Dishwasher',
      'Microwave', 'Refrigerator', 'Oven', 'Air Conditioning', 'Ceiling Fans',
      'High Rise', 'Low Rise', 'Mid Rise', 'Gated Community', 'Private Entrance',
      'Shared Entrance', 'Elevator Building', 'Walk Up', 'Doorman', 'Gym', 'Pool',
      'Sauna', 'Spa', 'Tennis Court', 'Basketball Court', 'Playground', 'Community Room',
      'For Sale', 'For Rent', 'Lease', 'Rent to Own', 'Owner Financing', 'Cash Only',
      'Mortgage Ready', 'Below Market', 'Negotiable', 'Fixed Price', 'Auction',
      'Foreclosure', 'Short Sale', 'Investment Property', 'Rental Income',
      'Move-in Ready', 'Needs Work', 'Fixer Upper', 'Recently Updated', 'Brand New',
      'Like New', 'Good Condition', 'Fair Condition', 'Excellent Condition',
      'Completely Renovated', 'Partially Renovated', 'Original Condition',
      'Compact', 'Spacious', 'Open Floor Plan', 'Traditional Layout', 'Split Level',
      'Single Story', 'Two Story', 'Three Story', 'Loft Style', 'Studio Layout',
      'Railroad Style', 'Corner Unit', 'End Unit', 'Interior Unit',
      'Private Yard', 'Shared Yard', 'No Yard', 'Patio', 'Deck', 'Rooftop Access',
      'Garden Space', 'Landscaped', 'Sprinkler System', 'Outdoor Kitchen',
      'BBQ Area', 'Fire Pit', 'Hot Tub', 'Gazebo', 'Shed', 'Greenhouse',
      'Smart Home', 'Home Automation', 'Security Cameras', 'Smart Thermostat',
      'Smart Lighting', 'USB Outlets', 'Ethernet Wiring', 'Surround Sound',
      'Built-in Speakers', 'Home Theater', 'High Speed Internet', 'Fiber Optic',
      'Energy Efficient', 'Green Building', 'LEED Certified', 'Energy Star',
      'Solar Heating', 'Geothermal', 'Double Pane Windows', 'Insulated',
      'Low Utility Bills', 'Eco Friendly', 'Sustainable Materials',
      'Wheelchair Accessible', 'No Steps', 'Ramp Access', 'Wide Doorways',
      'Accessible Bathroom', 'Grab Bars', 'Low Counters', 'Accessible Parking'
    ];
  
    // Products data
    const products = [
      { name: '2-Bedroom Apartment', price: '$250,000' },
      { name: '3-Bedroom Villa', price: '$450,000' },
      { name: 'Studio Loft', price: '$180,000' },
      { name: '4-Bedroom House', price: '$320,000' },
      { name: 'Luxury Penthouse', price: '$750,000' },
      { name: '1-Bedroom Condo', price: '$200,000' },
      { name: 'Family Townhouse', price: '$290,000' }
    ];
  
    return (
      <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-indigo-100 p-1">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          {/* Keywords Section */}
          <div className="bg-white rounded-xl shadow-lg p-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b border-gray-200 pb-4">
              Property Features & Amenities
            </h2>
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-full hover:from-blue-600 hover:to-blue-700 hover:scale-105 transform transition-all duration-200 shadow-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
  
          {/* Products Table Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <h2 className="text-3xl font-bold text-white text-center">Products & Prices</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-4 text-left text-lg font-semibold text-gray-700 border-b-2 border-purple-200">Product</th>
                    <th className="px-6 py-4 text-left text-lg font-semibold text-gray-700 border-b-2 border-purple-200">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 transform hover:scale-[1.01]">
                      <td className="px-6 py-4 text-gray-800 border-b border-gray-100">{product.name}</td>
                      <td className="px-6 py-4 font-bold text-purple-600 text-lg border-b border-gray-100">{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  
        </div>
      </div>
    );
  }