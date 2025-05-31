export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mt-12 mb-8">
          {/* <p className="text-red-600 text-sm mb-2">Policy</p> */}
          <h1 className="text-4xl font-bold text-black mb-4">Privacy Policy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cookies are small text files stored on your device when visiting our website. They help us provide essential
            features and analyze site usage.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-700 cursor-pointer hover:text-red-600">Terms of Service</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-700 cursor-pointer hover:text-red-600 font-medium">Privacy Policy</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-700 cursor-pointer hover:text-red-600">Cookie Policy</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* What is cookie policy section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-4">What is cookie policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Traditional juttis typically run true to size, but we recommend measuring your foot length and referring
                to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly
                expanded. Our size guide includes both Indian and international measurements to help you make the right
                choice.
              </p>
            </div>

            {/* Managing Cookies section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-4">Managing Cookies</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Change cookie preferences in browser settings
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Disable specific cookie types through our cookie banner
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Contact us for questions about cookie usage
                </li>
              </ul>
            </div>

            {/* Types of Cookies section */}
            <div>
              <h2 className="text-xl font-semibold text-black mb-4">Types of Cookies</h2>
              <ol className="space-y-4 text-gray-700">
                <li>
                  <div className="font-medium mb-2">1. Essential Cookies</div>
                  <ul className="ml-6 space-y-1">
                    <li>a. Required for basic website functionality</li>
                    <li>b. Cannot be disabled</li>
                    <li>c. Example: Shopping cart data, login sessions</li>
                  </ul>
                </li>
                <li>
                  <div className="font-medium mb-2">2. Analytics Cookies</div>
                  <ul className="ml-6 space-y-1">
                    <li>a. Track website usage patterns</li>
                    <li>b. Help improve site performance</li>
                    <li>c. Can be disabled in browser settings</li>
                  </ul>
                </li>
                <li>
                  <div className="font-medium mb-2">3. Marketing Cookies</div>
                  <ul className="ml-6 space-y-1">
                    <li>a. Track shopping preferences</li>
                    <li>b. Enable personalized recommendations</li>
                    <li>c. Optional and can be disabled</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
