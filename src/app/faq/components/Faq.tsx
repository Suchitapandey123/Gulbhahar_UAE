// @ts-nocheck
// src\app\faq\components\Faq.jsx
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

const TiltArrow = ({ className }) => <ChevronDown className={className} />;

const allFaqs = [
  {
    question: "How do I find the right size for me?",
    answer: "All our products typically run true to size, but we recommend referring to our detailed size chart. Our size guide includes both Indian and international measurements to help you make the right choice.",
    category: "General"
  },
  {
    question: "How long does it take to make one pair of juttis?",
    answer: "Each pair is handcrafted and takes around 48-72 hours to complete, depending on the complexity of the design.",
    category: "General"
  },
  {
    question: "Are your suits comfortable for everyday wear?",
    answer: "Yes, our suits are designed with soft fabric to ensure maximum comfort for all-day wear.",
    category: "General"
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination.",
    category: "Shipping"
  },
  {
    question: "How much does shipping cost?",
    answer: "Shipping costs vary based on your location. We offer free shipping on all domestic orders above ₹5,000. For international orders, shipping rates are calculated at checkout.",
    category: "Shipping"
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this to track your package's journey on our website's order tracking page.",
    category: "Shipping"
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of delivery. The products must be unworn and in their original packaging with all tags attached.",
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
  {
    question: "How should I care for my juttis?",
    answer: "To maintain your juttis, avoid water exposure, and clean them with a soft cloth. Store them in a dry place to ensure longevity.",
    category: "About"
  },
  {
    question: "Are your suits and sarees ethically made?",
    answer: "Yes, all our products are ethically handcrafted by skilled artisans who receive fair wages. We take pride in preserving traditional craftsmanship while ensuring ethical working conditions.",
    category: "About"
  },
  {
    question: "What materials are used in your bags?",
    answer: "We use premium quality genuine fabric (or metal) for every bag. The inner lining of the bags are cushioned for comfort. The embroidery is done using high-quality threads and embellishments.",
    category: "About"
  }
];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <div className={`border-b border-red-50 last:border-0 transition-all duration-200 ${isOpen ? 'bg-red-50/50' : 'hover:bg-gray-50/60'}`}>
      <button
        className="w-full px-5 py-4 text-left flex justify-between items-center gap-3 focus:outline-none group"
        onClick={onClick}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 ${
            isOpen ? 'bg-red-900 text-white' : 'bg-red-100 text-red-700 group-hover:bg-red-200'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-sm sm:text-base font-semibold transition-colors duration-150 ${
            isOpen ? 'text-red-900' : 'text-gray-800 group-hover:text-gray-900'
          }`}>
            {question}
          </span>
        </div>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
          isOpen ? 'bg-red-900 rotate-180' : 'bg-red-100 group-hover:bg-red-200'
        }`}>
          <TiltArrow className={`w-3.5 h-3.5 transition-colors duration-150 ${isOpen ? 'text-white' : 'text-red-600'}`} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="px-5 pb-4 pl-14 text-sm text-gray-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("General");
  const [searchTerm, setSearchTerm] = useState("");
  const [showpopup, setshowpopup] = useState(false);

  const categories = [
    { name: "General",       icon: HelpCircle, color: "text-blue-600",   bgColor: "bg-blue-50"   },
    { name: "Shipping",      icon: Package,    color: "text-green-600",  bgColor: "bg-green-50"  },
    { name: "Return",        icon: RefreshCw,  color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { name: "Customization", icon: Palette,    color: "text-purple-600", bgColor: "bg-purple-50" },
    { name: "About",         icon: Info,       color: "text-gray-600",   bgColor: "bg-gray-50"   }
  ];

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
    <div className="bg-gradient-to-br from-red-50/30 to-white pt-8 sm:pt-12 lg:pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">

        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="h-4 w-4 text-red-700" />
            <span className="text-xs font-bold text-red-900 uppercase tracking-wider">Help Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Frequently Asked <span className="text-red-900">Questions</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mb-8">
            Find answers to the most commonly asked questions about Gulbhahar products and services
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm border-2 border-red-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-900 transition-all duration-200 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.name;
              const count = allFaqs.filter(faq => faq.category === category.name).length;

              return (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-200 text-center group overflow-hidden ${
                    isActive
                      ? "bg-red-900 border-red-900 text-white shadow-lg shadow-red-900/20 scale-[1.02]"
                      : "bg-white border-gray-100 text-gray-700 hover:border-red-200 hover:shadow-md"
                  }`}
                >
                  {/* subtle bg pattern on active */}
                  {isActive && (
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white" />
                      <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-white" />
                    </div>
                  )}
                  <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2.5 transition-all duration-200 ${
                    isActive ? 'bg-white/20' : `${category.bgColor} group-hover:scale-110`
                  }`}>
                    <IconComponent className={`h-5 w-5 ${isActive ? 'text-white' : category.color}`} />
                  </div>
                  <div className={`relative text-sm font-bold mb-0.5 ${isActive ? 'text-white' : 'text-gray-800'}`}>
                    {category.name}
                  </div>
                  <div className={`relative text-[11px] font-medium ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                    {count} questions
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
          {/* Section header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-red-50 bg-red-50/30">
            <div className="w-8 h-8 bg-red-900 rounded-xl flex items-center justify-center">
              {categories.find(cat => cat.name === activeCategory) && React.createElement(
                categories.find(cat => cat.name === activeCategory).icon,
                { className: "h-4 w-4 text-white" }
              )}
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">{activeCategory} Questions</h2>
              <p className="text-[11px] text-gray-400">{filteredFaqs.length} questions found</p>
            </div>
          </div>

          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))
          ) : (
            <div className="text-center py-14">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-gray-300" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">No questions found</h3>
              <p className="text-xs text-gray-400 mb-4">
                {searchTerm
                  ? `No match for "${searchTerm}" in ${activeCategory}`
                  : `No questions in ${activeCategory} yet`}
              </p>
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="text-sm text-red-700 font-semibold hover:underline">
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-r from-red-900 to-red-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* decorative */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                <MessageCircle className="h-5 w-5 text-red-200" />
                <h3 className="text-lg font-bold text-white">Still have questions?</h3>
              </div>
              <p className="text-sm text-red-200 max-w-sm">
                Can't find what you're looking for? Our support team is here to help.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:+919220927241"
                className="flex items-center gap-2 bg-white text-red-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 transition-all duration-200 shadow-lg justify-center"
              >
                📞 +91 9220927241
              </a>
              <button
                onClick={() => setshowpopup(true)}
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-all duration-200 justify-center"
              >
                💬 Live Chat
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Popup */}
      {showpopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs text-center shadow-2xl">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-2">🚧 Under Development</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Live chat is currently under development. You can contact us through the call option.
            </p>
            <button
              onClick={() => setshowpopup(false)}
              className="w-full bg-red-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
