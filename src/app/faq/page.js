'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Package, 
  RefreshCw, 
  Palette, 
  Info,
  Search,
  Star,
  CheckCircle,
  MessageCircle
} from 'lucide-react';

// Mock TiltArrow component
const TiltArrow = ({ className }) => <ChevronDown className={className} />;

// Expanded FAQs with categories
const allFaqs = [
  // General FAQs
  {
    question: "How do I find the right jutti size for me?",
    answer: "Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice.",
    category: "General"
  },
  {
    question: "How long does it take to make one pair of juttis?",
    answer: "Each pair is handcrafted and takes around 48-72 hours to complete, depending on the complexity of the design.",
    category: "General"
  },
  {
    question: "Are your juttis comfortable for everyday wear?",
    answer: "Yes, our juttis are designed with soft leather lining and cushioned soles to ensure maximum comfort for all-day wear.",
    category: "General"
  },
  
  // Shipping FAQs
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination.",
    category: "Shipping"
  },
  {
    question: "How much does shipping cost?",
    answer: "Shipping costs vary based on your location. We offer free shipping on all domestic orders above ₹2,000. For international orders, shipping rates are calculated at checkout.",
    category: "Shipping"
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this to track your package's journey on our website's order tracking page.",
    category: "Shipping"
  },
  
  // Return FAQs
  {
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of delivery. The juttis must be unworn and in their original packaging with all tags attached.",
    category: "Return"
  },
  {
    question: "How do I initiate a return?",
    answer: "To initiate a return, please contact our customer service team through the 'Contact Us' page or email us at returns@gulbhahar.com with your order details.",
    category: "Return"
  },
  {
    question: "Do you offer exchanges?",
    answer: "Yes, we offer exchanges for different sizes or styles within 14 days of delivery, subject to availability of the requested item.",
    category: "Return"
  },
  
  // Customization FAQs
  {
    question: "Do you offer customization options?",
    answer: "Yes! We offer custom embroidery and personalized juttis based on your preferences. Contact us for more details.",
    category: "Customization"
  },
  {
    question: "How long does customization take?",
    answer: "Custom orders typically take 7-10 additional days to complete after design approval.",
    category: "Customization"
  },
  {
    question: "Can I request specific colors or designs?",
    answer: "Absolutely! We welcome specific color requests and custom design ideas. Our artisans will work with you to bring your vision to life.",
    category: "Customization"
  },
  
  // About FAQs
  {
    question: "How should I care for my juttis?",
    answer: "To maintain your juttis, avoid water exposure, and clean them with a soft cloth. Store them in a dry place to ensure longevity.",
    category: "About"
  },
  {
    question: "Are your juttis ethically made?",
    answer: "Yes, all our juttis are ethically handcrafted by skilled artisans who receive fair wages. We take pride in preserving traditional craftsmanship while ensuring ethical working conditions.",
    category: "About"
  },
  {
    question: "What materials are used in your juttis?",
    answer: "We use premium quality genuine leather for the upper and lining, with cushioned insoles for comfort. The embroidery is done using high-quality threads and embellishments.",
    category: "About"
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white border-2 border-red-100 rounded-xl mb-4 hover:shadow-md transition-all duration-300 hover:border-red-200">
      <button
        className="w-full p-4 sm:p-6 text-left flex justify-between items-center focus:outline-none group"
        onClick={onClick}
      >
        <span className="text-base sm:text-lg font-bold text-gray-900 pr-4 group-hover:text-red-900 transition-colors">
          {question}
        </span>
        <div className={`w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          isOpen ? 'bg-red-900 rotate-180' : 'group-hover:bg-red-200'
        }`}>
          <TiltArrow
            className={`w-4 h-4 transition-colors duration-200 ${
              isOpen ? 'text-white' : 'text-red-600'
            }`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4 sm:pb-6' : 'max-h-0'
        }`}
      >
        <div className="px-4 sm:px-6">
          <div className="border-t border-red-100 pt-4">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("General");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Category configuration with icons
  const categories = [
    { name: "General", icon: HelpCircle, color: "text-blue-600", bgColor: "bg-blue-50" },
    { name: "Shipping", icon: Package, color: "text-green-600", bgColor: "bg-green-50" },
    { name: "Return", icon: RefreshCw, color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { name: "Customization", icon: Palette, color: "text-purple-600", bgColor: "bg-purple-50" },
    { name: "About", icon: Info, color: "text-gray-600", bgColor: "bg-gray-50" }
  ];
  
  // Filter FAQs based on active category and search term
  const filteredFaqs = allFaqs.filter(faq => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setOpenIndex(null);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold text-red-900">Help Center</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Find answers to the most commonly asked questions about Gulbhahar products and services
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-sm sm:max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-3 sm:py-3 text-sm sm:text-base border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-900 transition-all duration-200 bg-white"
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center sm:text-left">Browse by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.name;
              const categoryFaqCount = allFaqs.filter(faq => faq.category === category.name).length;
              
              return (
                <button 
                  key={category.name}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 text-center ${
                    isActive 
                      ? "bg-red-50 border-red-900 text-red-900 shadow-md transform scale-105" 
                      : "bg-white border-red-200 text-gray-700 hover:border-red-300 hover:bg-red-50/50 hover:scale-102"
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    isActive ? 'bg-red-900' : category.bgColor
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      isActive ? 'text-white' : category.color
                    }`} />
                  </div>
                  <div className="text-sm sm:text-base font-bold mb-1">{category.name}</div>
                  <div className="text-xs text-gray-500">{categoryFaqCount} questions</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
              {categories.find(cat => cat.name === activeCategory)?.icon && (
                React.createElement(categories.find(cat => cat.name === activeCategory).icon, {
                  className: "h-5 w-5 text-white"
                })
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{activeCategory} Questions</h2>
              <p className="text-sm text-gray-600">{filteredFaqs.length} questions found</p>
            </div>
          </div>

          <div className="space-y-0">
            {filteredFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
          
          {/* No results message */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? `No questions match "${searchTerm}" in ${activeCategory} category.`
                  : `No questions available in ${activeCategory} category yet.`
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-red-600 hover:text-red-800 font-medium underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 sm:p-8 border-2 border-red-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="h-6 w-6 text-red-600" />
            <h3 className="text-xl font-bold text-gray-900">Still have questions?</h3>
          </div>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-900 to-red-800 text-white px-6 py-3 rounded-xl font-bold hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Contact Support
            </button>
            <button className="bg-white border-2 border-red-900 text-red-900 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;