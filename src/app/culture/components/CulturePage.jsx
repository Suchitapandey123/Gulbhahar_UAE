"use client";
import React, { useState, useRef } from 'react';
import { ChevronDown, MapPin, Clock, Users, Award, Sparkles, Heart, Star } from 'lucide-react';

const LuxuryCulturePage = () => {
  const [selectedCraft, setSelectedCraft] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const heritageElements = [
    {
      id: 1,
      title: "Royal Embroidery",
      subtitle: "Zardozi & Gold Thread Work",
      description: "Royal embroidery is a classic form with beautiful detailing and a rich finish. It is associated with India's royal heritage, often using zardozi. It is a traditional embroidery technique using gold and silver threads to form frequently elaborate patterns. It is most popularly used on lush and opulent fabrics, like silk and velvet.",
      fullDescription: "Zardozi embroidery represents the pinnacle of Indian textile artistry, tracing its origins to the Mughal era. Master artisans spend years perfecting this intricate craft, using real gold and silver threads to create patterns that tell stories of royal courts and ancient traditions. Each piece requires hundreds of hours of meticulous hand work, making every creation a unique masterpiece.",
      image: "/Anarkali/anarkali-4.jpg",
      // image: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-1.png",
    //  
    // 
    // "/Lal-ishq/lal-ishq-3.jpg",
      color: "from-amber-700 via-yellow-600 to-orange-500",
      accent: "border-amber-400",
      heritage: "1000+ Years",
      region: "Lucknow",
      techniques: ["Zardozi", "Aari Work", "Gota Patti", "Dabka Work"],
      artisans: 15,
      avgTime: "120-200 hours per piece",
      significance: "Symbol of royal luxury and Mughal heritage"
    },
    {
      id: 2,
      title: "Handwoven Textiles",
      subtitle: "Banarasi & Silk Weaving",
      description: "Handwoven textiles embody the essence of true Indian craftsmanship. They are a confluence of tradition and artistic expression. Banarasi textiles are among the finest celebrated in India. They are well known for their opulent silk weaving and intricate motifs reflecting the splendour of Indo-Persian art.",
      fullDescription: "Banarasi weaving is a 1,500-year-old tradition that has been passed down through generations of skilled weavers. The intricate patterns are created using a complex technique that involves multiple silk threads and gold zari work. Each saree can take anywhere from 15 days to 6 months to complete, depending on the complexity of the design.",
      image: "/Lal-ishq/lal-ishq-2.jpg",
      color: "from-purple-700 via-indigo-600 to-blue-500",
      accent: "border-purple-400",
      heritage: "800+ Years",
      region: "Varanasi",
      techniques: ["Cutwork", "Tanchoi", "Jangla", "Tissue Work"],
      artisans: 12,
      avgTime: "15-180 days per piece",
      significance: "Sacred art form integral to Indian ceremonies"
    },
    {
      id: 3,
      title: "Leather Artistry",
      subtitle: "Traditional Juttiwork",
      description: "Master craftsmen shape premium leather into exquisite footwear, each pair telling a story of skill, tradition, and timeless elegance.",
      fullDescription: "Traditional juttiwork represents centuries of leather craftsmanship refined in the royal courts of Punjab and Rajasthan. Skilled artisans use time-honored techniques to create footwear that combines comfort with artistic beauty. The process involves multiple stages of leather treatment, cutting, stitching, and embellishment.",
      image: "/Gulabo/gulabo-3.jpg",
      // image: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-7.png",
      color: "from-emerald-700 via-teal-600 to-cyan-500",
      accent: "border-emerald-400",
      heritage: "500+ Years",
      region: "Punjab",
      techniques: ["Hand Stitching", "Leather Tooling", "Embossing", "Beadwork"],
      artisans: 8,
      avgTime: "3-7 days per pair",
      significance: "Traditional footwear of Indian royalty"
    },
    {
      id: 4,
      title: "Gemstone Craft",
      subtitle: "Crystal Embellishment & Kundan Work",
      description: "Gemstone Craft is a sparkling display of India's ornamental legacy, highlighting the encrustation of stones through various intricate techniques such as crystal embellishment and Kundan work. Crystal embellishment is when sparkling stones are added to give an effect of twinkle or shine.",
      fullDescription: "Kundan work is a traditional form of Indian gemstone jewelry that involves setting uncut diamonds and precious stones in gold foil. This ancient technique, dating back to the Mughal era, creates stunning pieces that catch and reflect light beautifully. The process requires exceptional skill and patience from master craftsmen.",
      image: "/Laddu/laddo-3.jpg",
      // image: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-8.png",
      color: "from-rose-700 via-pink-600 to-red-500",
      accent: "border-rose-400",
      heritage: "600+ Years",
      region: "Rajasthan",
      techniques: ["Kundan Setting", "Meenakari", "Jadau Work", "Crystal Mounting"],
      artisans: 10,
      avgTime: "20-60 hours per piece",
      significance: "Traditional jewelry craft of Rajasthani royalty"
    },
    {
      id: 5,
      title: "Ornate Metals",
      subtitle: "Gota Patti, Sequins & Foil Work",
      description: "Ornate Metals offers juttis bathed in timeless glimmer with a unique Gota Patti, sequins and foil work that pair traditional metallic artistry with a contemporary design approach.",
      fullDescription: "Metal work in traditional Indian crafts involves intricate techniques passed down through generations. Gota Patti, originally made from pure gold and silver ribbons, creates stunning patterns when applied to fabrics. Combined with sequin and foil work, it produces pieces that shimmer with celestial beauty.",
      image: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-9.png",
      color: "from-gray-700 via-slate-600 to-zinc-500",
      accent: "border-gray-400",
      heritage: "700+ Years",
      region: "Bidar",
      techniques: ["Gota Patti", "Sequin Work", "Foil Application", "Metal Threading"],
      artisans: 6,
      avgTime: "10-40 hours per piece",
      significance: "Decorative metalwork for festive occasions"
    }
  ];

  const heritageStats = [
    { label: "Years of Tradition", value: "1000+", icon: Clock },
    { label: "Master Artisans", value: "50+", icon: Users },
    { label: "Craft Techniques", value: "25+", icon: Award },
    { label: "Heritage Regions", value: "15+", icon: MapPin }
  ];

  const craftingProcess = [
    {
      step: 1,
      title: "Design & Planning",
      description: "Master artisans sketch traditional patterns and plan the intricate details",
      duration: "2-5 days"
    },
    {
      step: 2,
      title: "Material Selection",
      description: "Premium materials are carefully chosen and prepared for crafting",
      duration: "1-2 days"
    },
    {
      step: 3,
      title: "Foundation Work",
      description: "Base structure is created with precision and attention to detail",
      duration: "5-10 days"
    },
    {
      step: 4,
      title: "Embellishment",
      description: "Intricate embroidery, beadwork, or metalwork is applied by hand",
      duration: "10-30 days"
    },
    {
      step: 5,
      title: "Finishing Touches",
      description: "Final quality checks and finishing details are completed",
      duration: "2-3 days"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Cultural Enthusiast",
      content: "The attention to detail in every piece is extraordinary. You can feel the heritage and craftsmanship in every thread.",
      rating: 5
    },
    {
      name: "Arjun Patel",
      role: "Fashion Designer",
      content: "Working with these artisans has been inspiring. Their skill and dedication to preserving tradition is unmatched.",
      rating: 5
    },
    {
      name: "Maya Gupta",
      role: "Heritage Collector",
      content: "Each piece tells a story of India's rich cultural heritage. The quality is exceptional and the artistry is breathtaking.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-800/10 to-red-900/20"></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-red-400 to-pink-600 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex itrms-center justify-center flex-col">
            <h1 className="text-4xl sm:text-6xl py-2 lg:text-8xl font-light border bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-transparent mb-6 tracking-wide">
              Heritage Culture
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-amber-900 font-light mb-8 max-w-4xl mx-auto leading-relaxed">
              Celebrating millennia of masterful craftsmanship where each creation tells a story of tradition, luxury, and timeless artistry
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {heritageStats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/30">
                <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-3xl lg:text-4xl font-light text-amber-800 mb-1">{stat.value}</div>
                <div className="text-sm text-amber-700 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => document.getElementById('crafts').scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-light text-lg shadow-2xl border border-amber-400/30 hover:from-amber-700 hover:to-orange-700 transition-all duration-300 group"
          >
            Explore Our Heritage
            <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Heritage Crafts Section */}
      <section id="crafts" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-amber-800 mb-6">
              Master Crafts
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Discover the five pillars of our heritage craftsmanship, each representing centuries of artistic excellence
            </p>
          </div>

          <div className="grid gap-8 lg:gap-12">
            {heritageElements.map((element, index) => (
              <div key={element.id} className={`relative rounded-3xl overflow-hidden ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex shadow-2xl`}>
                <div className={`lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]`}>
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${element.image})` }}
                  ></div>
                  {/* Color Overlay - 30% opacity */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${element.color} opacity-30`}></div>
                  
                  <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-white text-sm font-medium flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {element.region}
                        </span>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-white text-sm">{element.heritage}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30">
                      <h3 className="text-3xl lg:text-4xl font-light text-white mb-3">{element.title}</h3>
                      <p className="text-white/90 text-lg mb-4">{element.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 bg-white p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {element.description}
                    </p>
                    
                    {/* Always show full content on large screens */}
                    <div className="hidden lg:block space-y-6 border-t pt-6">
                      <p className="text-gray-600 leading-relaxed">
                        {element.fullDescription}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-amber-50 rounded-lg p-4">
                          <h4 className="font-semibold text-amber-800 mb-2">Techniques Used</h4>
                          <ul className="text-sm text-amber-700 space-y-1">
                            {element.techniques.map((technique, i) => (
                              <li key={i} className="flex items-center">
                                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                                {technique}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-800 mb-2">Craft Details</h4>
                          <div className="text-sm text-orange-700 space-y-1">
                            <p><strong>Artisans:</strong> {element.artisans}</p>
                            <p><strong>Time:</strong> {element.avgTime}</p>
                            <p><strong>Significance:</strong> {element.significance}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile expandable content */}
                    <div className="lg:hidden">
                      <button
                        onClick={() => setSelectedCraft(selectedCraft === element.id ? null : element.id)}
                        className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors font-medium"
                      >
                        Learn More
                        <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${selectedCraft === element.id ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {selectedCraft === element.id && (
                        <div className="space-y-6 border-t pt-6 mt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {element.fullDescription}
                          </p>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-amber-50 rounded-lg p-4">
                              <h4 className="font-semibold text-amber-800 mb-2">Techniques Used</h4>
                              <ul className="text-sm text-amber-700 space-y-1">
                                {element.techniques.map((technique, i) => (
                                  <li key={i} className="flex items-center">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                                    {technique}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-orange-50 rounded-lg p-4">
                              <h4 className="font-semibold text-orange-800 mb-2">Craft Details</h4>
                              <div className="text-sm text-orange-700 space-y-1">
                                <p><strong>Artisans:</strong> {element.artisans}</p>
                                <p><strong>Time:</strong> {element.avgTime}</p>
                                <p><strong>Significance:</strong> {element.significance}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crafting Process Section */}
      <section className="py-20 bg-gradient-to-br from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-amber-800 mb-6">
              Our Crafting Journey
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Each piece follows a meticulous process that ensures the highest quality and authenticity
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 to-orange-600 hidden lg:block"></div>
            
            <div className="space-y-12 lg:space-y-16">
              {craftingProcess.map((step, index) => (
                <div key={step.step} className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-amber-200/50">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.step}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-2xl font-light text-amber-800">{step.title}</h3>
                          <p className="text-amber-600 text-sm">{step.duration}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 flex justify-center my-8 lg:my-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-amber-800 mb-6">
              What People Say
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Hear from those who appreciate the artistry and heritage behind our crafts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl border border-amber-200/50">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-amber-800">{testimonial.name}</h4>
                    <p className="text-amber-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-800 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Heart className="w-16 h-16 mx-auto mb-6 text-amber-300" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Preserve Heritage
          </h2>
          <p className="text-xl mb-8 text-amber-100 leading-relaxed">
            Join us in preserving these ancient crafts for future generations. 
            Every purchase supports master artisans and keeps traditions alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => window.location.href = "/collections"} className="px-8 py-4 bg-white text-amber-800 rounded-full font-medium text-lg shadow-xl hover:bg-amber-50 transition-colors">
              Shop Heritage Collection
            </button>
            {/* <button className="px-8 py-4 border-2 border-white text-white rounded-full font-medium text-lg hover:bg-white hover:text-amber-800 transition-colors">
              Learn More About Artisans
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuxuryCulturePage;