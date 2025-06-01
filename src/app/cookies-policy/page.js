"use client";

import { useState } from "react";
import { 
  ChevronRight, 
  Shield, 
  Settings, 
  BarChart3, 
  Target, 
  Cookie,
  FileText,
  Lock,
  Eye,
  CheckCircle,
  AlertCircle,
  Globe,
  Truck,
  
  Info
} from "lucide-react";

// Mock TiltArrowUp component
const TiltArrowUp = ({ className }) => <ChevronRight className={className} />;

const Cookies = () => {
  const [activeTab, setActiveTab] = useState("policy");

  const tabs = [
    {
      id: "terms",
      title: "Terms of Service",
      icon: FileText,
      description: "Legal terms and conditions"
    },
    {
      id: "privacy", 
      title: "Privacy Policy",
      icon: Lock,
      description: "How we protect your data"
    },
    {
      id: "policy",
      title: "Cookie Policy", 
      icon: Cookie,
      description: "How we use cookies"
    }
  ];

  const getButtonClass = (tabName) =>
    `flex items-center justify-between w-full border-2 rounded-xl px-4 sm:px-6 py-4 sm:py-5 text-left transition-all duration-200 ${
      activeTab === tabName 
        ? "bg-red-50 border-red-900 text-red-900 shadow-md" 
        : "bg-white border-red-200 hover:border-red-300 hover:bg-red-50/50"
    }`;

  const getTabContent = () => {
    const contents = {
      policy: {
        title: "What is Cookie Policy",
        icon: Cookie,
        content: (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-red-900 mb-2">What are Cookies?</h4>
                  <p className="text-sm sm:text-base text-gray-700">
                    Cookies are small text files stored on your device when visiting our website. They
                    help us provide essential features, analyze site usage, and enhance your shopping experience
                    with personalized recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl text-gray-900 font-bold mb-4 flex items-center gap-2">
                <Settings className="h-6 w-6 text-red-600" />
                Managing Cookies
              </h3>
              <div className="bg-white border-2 border-red-100 rounded-xl p-4 sm:p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Change cookie preferences in browser settings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Disable specific cookie types through our cookie banner</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Contact us for questions about cookie usage</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl text-gray-900 font-bold mb-6">Types of Cookies</h3>
              <div className="grid gap-4 sm:gap-6">
                
                {/* Essential Cookies */}
                <div className="bg-white border-2 border-red-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">1. Essential Cookies</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                        Required
                      </span>
                    </div>
                  </div>
                  <div className="ml-0 sm:ml-13 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm sm:text-base text-gray-700">Required for basic website functionality</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm sm:text-base text-gray-700">Cannot be disabled</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm sm:text-base text-gray-700">Example: Shopping cart data, login sessions</p>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-white border-2 border-red-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">2. Analytics Cookies</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        Optional
                      </span>
                    </div>
                  </div>
                  <div className="ml-0 sm:ml-13 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm sm:text-base text-gray-700">Track website usage patterns</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm sm:text-base text-gray-700">Help improve site performance</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm sm:text-base text-gray-700">Can be disabled in browser settings</p>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-white border-2 border-red-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">3. Marketing Cookies</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                        Optional
                      </span>
                    </div>
                  </div>
                  <div className="ml-0 sm:ml-13 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm sm:text-base text-gray-700">Track shopping preferences</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm sm:text-base text-gray-700">Enable personalized recommendations</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm sm:text-base text-gray-700">Optional and can be disabled</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookie Management CTA */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4 sm:p-6">
              <div className="text-center">
                <Cookie className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">Manage Your Cookie Preferences</h4>
                <p className="text-sm text-gray-600 mb-4">
                  You have control over your cookie settings. Update your preferences anytime.
                </p>
                <button className="bg-gradient-to-r from-red-900 to-red-800 text-white px-6 py-3 rounded-xl font-bold hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Cookie Settings
                </button>
              </div>
            </div>
          </div>
        )
      },


terms: {
  title: "Terms & Conditions",
  icon: FileText,
  content: (
    <div className="space-y-6 sm:space-y-8">
      {/* Intro */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-yellow-900 mb-2 text-lg">RETURNS & EXCHANGES</h4>
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-gray-700">
                We use standard EURO sizes to help you pick the perfect size. However, if you still want to swap your pairs for another size then you may return them at 
              </p>
              <p className="text-sm sm:text-base text-gray-700 bg-red-100 p-3 rounded-lg border border-red-200">
                <strong>GULBHAHAR S-12 Janta Market, Rajouri Garden Delhi,</strong> India within 30 Days in its original box packing and the invoice. Please mention your desired exchange piece along with the size on the invoice as well.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                You may also mail us at <span className="font-bold text-red-800">gulbhahar1@gmail.com</span> for the same. We do not entertain refund & cancellation requests.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div className="bg-white border-2 border-yellow-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
            <h3 className="text-lg sm:text-xl text-gray-900 font-bold">Exchange Policy</h3>
          </div>
          <div className="ml-11 space-y-3">
            <p className="text-sm sm:text-base text-gray-700"> 
              The Pairs can be exchanged for another size of the same style only. In case your desired size is unavailable with us, you could then exchange it for another style of a similar value.
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r">
              <p className="text-sm sm:text-base font-semibold text-yellow-800">
                Pairs bought on SALE price will not be exchanged or returned.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="bg-white border-2 border-yellow-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl text-gray-900 font-bold">International Orders</h3>
            <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mt-1">
              Important Notice
            </span>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-700 ml-13"> 
          We do not entertain refunds & exchanges on International orders.
        </p>
      </div>

      {/* Shipping Policy */}
      <div className="bg-white border-2 border-yellow-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl text-gray-900 font-bold">SHIPPING POLICY</h3>
          </div>
        </div>
        <div className="ml-13 space-y-4">
          <p className="text-sm sm:text-base text-gray-700">
            We have FREE shipping within India on prepaid orders. Once you place an order your pairs will be shipped within the stipulated time period mentioned beside each style. Though we use some of India's largest logistics companies for shipping, we are bound in coverage by their reach.
          </p>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-bold">Please Note</span> - During festive seasons, pandemics, adverse weather conditions, or conditions beyond our control your shipment could get delayed. We assure you that we will try our best to have your parcel delivered to you in good time.
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm sm:text-base text-red-800 font-medium">
              <span className="font-bold">IMPORTANT for International Orders:</span> Orders with more than 1 item will be packed in a large box instead of individual boxes.
            </p>
          </div>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="bg-white border-2 border-yellow-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl text-gray-900 font-bold">SECURITY & PRIVACY POLICY</h3>
          </div>
        </div>
        <div className="ml-13 space-y-4">
          <p className="text-sm sm:text-base text-gray-700">
            Gulbhahar is committed to protecting the privacy of visitors to this site (SITE). At Gulbhahar, we want you to have an enjoyable shopping experience. While we must collect certain personal information, we respect and protect your right to privacy as outlined in this Privacy Policy.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm sm:text-base text-gray-700">
              The nature of the information collected (if any), is simply to allow us to contact you should you choose to or for us to contact you based on a business relation you establish by purchasing or making an order online. This is solely to be able to follow up on any order that you may initiate on this site.
            </p>
          </div>
          <p className="text-sm sm:text-base text-gray-700">
            The information stored does NOT include any financial details, other than details related to the purchase or interest of products by you, and is purely restricted to order, contact, and preferences. We strictly do NOT capture or store any account or card numbers.
          </p>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm sm:text-base text-gray-700">
              We may collect your session, contact, and order information on our server and your browser in the form of session storage or cookies. We will NOT share it with any third party, other than those necessary to make the delivery of the product to you, marketing material to you, and improvement purposes.
            </p>
          </div>
          <p className="text-sm sm:text-base text-gray-700">
            We may send marketing material in the form of emails or common digital mediums, to your contact information also. We may also study your spending patterns to improve our service offering. Gulbhahar reserves the right to make alterations to this policy in the future without notice.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm sm:text-base text-gray-700 font-medium">
              This Privacy Policy applies to the Site. You agree that your use of the Site signifies your consent to this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Site.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
},


      


      // terms: {
      //   title: "Terms of Service",
      //   icon: FileText,
      //   content: (
      //     <div className="space-y-6 sm:space-y-8">
      //       <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6">
      //         <div className="flex items-start gap-3">
      //           <FileText className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
      //           <div>
      //             <h4 className="font-bold text-blue-900 mb-2">RETURNS & EXCHANGES</h4>
      //             <p className="text-sm sm:text-base text-gray-700">

      //             We use standard EURO sizes to help you pick the perfect size. However, if you still want to swap your pairs for another size then you may return them at 
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //       <p className="text-gray-600">
      //         <strong> GULBHAHAR S-12 Janta Market, Rajouri Garden Delhi,</strong> India within 30 Days in its original box packing and the invoice. Please mention your desired exchange piece along with the size on the invoice as well. You may also mail us at <b> gulbhahar1@gmail.com </b>for the same. We do not entertain refund & cancellation requests.
      //         </p>
      //       <p className="text-gray-600">
      //         The Pairs can be exchanged for another size of the same style only. In case your desired size is unavailable with us, you could then exchange it for another style of a similar value.
      //       </p>
      //     </div>
      //   )
      // },
      // privacy: {
      //   title: "Privacy Policy", 
      //   icon: Lock,
      //   content: (
      //     <div className="space-y-6 sm:space-y-8">
      //       <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 sm:p-6">
      //         <div className="flex items-start gap-3">
      //           <Lock className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
      //           <div>
      //             <h4 className="font-bold text-green-900 mb-2">Privacy Policy</h4>
      //             <p className="text-sm sm:text-base text-gray-700">
      //               We take your privacy seriously. Learn how we collect, use, and protect your data.
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //       <p className="text-gray-600">Privacy Policy content would go here...</p>
      //     </div>
      //   )
      // }
      privacy: {
  title: "Privacy Policy", 
  icon: Lock,
  content: (
    <div className="space-y-6 sm:space-y-8">
      {/* Introduction */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-red-900 mb-2">Privacy Policy</h4>
            <p className="text-sm sm:text-base text-gray-700">
              Gulbhahar is committed to protecting the privacy of visitors to this site (the "Site"). At Gulbhahar, we want you to have an enjoyable shopping experience. While we must collect certain personal information, we respect and protect your right to privacy as outlined in this Privacy Policy.
            </p>
            <p className="text-sm sm:text-base text-gray-700 mt-2">
              The nature of the information collected (if any) is simply to allow us to contact you should you choose to or for us to contact you based on a business relation you establish by purchasing or making an order online. This is solely to follow up on any order you may initiate on this site.
            </p>
            <p className="text-sm sm:text-base text-gray-700 mt-2">
              The information stored does NOT include any financial details, other than details related to the purchase or interest of products by you, and is purely restricted to order, contact, and preferences. We strictly do NOT capture or store any account or card numbers.
            </p>
            <p className="text-sm sm:text-base text-gray-700 mt-2">
              We may collect your session, contact, and order information on our server and your browser in the form of session storage or cookies. We will NOT share it with any third party, other than those necessary to make the delivery of the product to you, marketing material to you, and improvement purposes.
            </p>
            <p className="text-sm sm:text-base text-gray-700 mt-2">
              We may send marketing material in the form of emails or common digital mediums, to your contact information also. We may also study your spending patterns to improve our service offering. Gulbhahar reserves the right to make alterations to this policy in the future without notice.
            </p>
            <p className="text-sm sm:text-base text-gray-700 mt-2">
              This Privacy Policy applies to the Site. You agree that your use of the Site signifies your consent to this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Site.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


    };

    return contents[activeTab];
  };

  const currentTab = getTabContent();
  const CurrentIcon = currentTab.icon;

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      {/* Header Section */}
      <div className="bg-white border-b-2 border-red-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
              <CurrentIcon className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-red-900">Legal Information</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {currentTab.title}
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              {activeTab === "policy" && "Cookies are small text files stored on your device when visiting our website. They help us provide essential features and analyze site usage."}
              {activeTab === "terms" && "These terms and conditions outline the rules and regulations for the use of our website and services."}
              {activeTab === "privacy" && "This privacy policy explains how we collect, use, store, and protect your personal information."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 lg:mb-6">Legal Pages</h3>
              <nav className="space-y-3 lg:space-y-4">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)} 
                      className={getButtonClass(tab.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activeTab === tab.id ? 'bg-red-900' : 'bg-red-100'
                        }`}>
                          <IconComponent className={`h-4 w-4 ${
                            activeTab === tab.id ? 'text-white' : 'text-red-600'
                          }`} />
                        </div>
                        <div className="text-left">
                          <div className="text-sm sm:text-base font-bold">
                            {tab.title}
                          </div>
                          <div className="text-xs text-gray-600 hidden sm:block">
                            {tab.description}
                          </div>
                        </div>
                      </div>
                      <TiltArrowUp className={`w-4 h-4 transition-transform duration-200 ${
                        activeTab === tab.id ? 'text-red-900 rotate-90' : 'text-gray-400'
                      }`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                  <CurrentIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {currentTab.title}
                </h2>
              </div>
              
              {currentTab.content}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cookies;