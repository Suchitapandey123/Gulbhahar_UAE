"use client";
import { Award, ChevronDown, Clock, Heart, MapPin, Star, Users } from 'lucide-react';
import { useState, } from 'react';

const LuxuryCulturePage = () => {
  const [selectedCraft, setSelectedCraft] = useState(null);

  const heritageElements = [
    {
      id: 1,
      title: "Royal Embroidery",
      subtitle: "Zardozi & Gold Thread Work",
      description: "At Gulbhahar, royal embroidery is part of our daily work and tradition, and each piece is made slowly, with focus on small details, just like in earlier times. Zardozi and gold thread work are old techniques that people in Indian culture have been using for many years. People usually use them for weddings and special occasions. We like to keep our designs simple and true to where they come from. Our suits are made with fabric and have light embroidery that looks very royal. Our suits are also very comfortable to wear. We use embroidery and Zardozi to make them stand out. The sarees have gold thread work that adds beauty without making them heavy, so they are easy to carry for long hours. Our Lehngas are made with careful handwork that gives a festive look.",
      fullDescription: "The same hand embroidery can be seen on the juttis, where the detailed work adds beauty while keeping them comfortable on the feet. Our juttis are made in a way that they feel easy on your feet. We also use this embroidery on our bags. It gives our bags a feel, and it is still easy to carry them around and use them. Gulbhahar bags and juttis go well with the Jewellery we make. The Jewellery is made to go with clothes that have embroidery on them. This way, you can wear everything together. It looks great. Every single Gulbhahar product is made by hand by artisans. These artisans are very careful and patient when they make our products. Each stitch shows the time and effort that goes into keeping this old craft alive, so it can be worn and enjoyed today in a simple and honest form.",
      image: "/heritage-culture/royal-embroidery-optimized.webp",
      color: "from-amber-700 via-yellow-600 to-orange-500",
      accent: "border-amber-400",
      heritage: "1000+ Years",
      region: "Lucknow",
      techniques: ["Zari Embroidery",
        "Aari Work",
       "Dabka Work",
        "Pitta Embroidery"
        ],
      artisans: 18,
      avgTime: "A single piece takes between 180 and 220 hours to complete",
      significance: "Each pair of juttis functions as a detailed representation of complex storytelling and artistic sophistication."
    },
    {
      id: 2,
      title: "Handwoven Textiles",
      subtitle: "Banarasi & Silk Weaving",
      description: "The handloom fabrics have been a tradition in India, and Gulbhahar is carrying forward this tradition with love and care. Banarasi and Silk Weaving are traditional ways of weaving that have been passed down from generation to generation. These Beautiful Fabrics are famous for their beauty and strength. Gulbhahar's focus is on simple designs that highlight the fabric instead of covering it up with heavy designs. The fabric is woven on handlooms in a slow process where every thread is woven with love and patience. It takes time, but it gives the fabric a rich look and natural shine. Banarasi and silk fabrics are traditional, so they are preferred for weddings and functions.",
      fullDescription: "These fabrics are used in Gulbhahar collections to create suits, sarees, and lehengas that look beautiful and easy to wear. The soft silk fabric makes the outfit comfortable while the woven patterns add quiet beauty. The handloom work can be seen in accessories like bags, where woven fabrics give a traditional touch without making them heavy. Gulbhahar Juttis also reflect this craft through fabric details that feel soft and natural. Jewellery is beautifully designed to match these pretty outfits, keeping the overall look simple. Every skilled weaver works with focus and care. Their hands, patience and experience bring life to the fabric, keeping the old tradition alive.",
      image: "/heritage-culture/handwoven-optimized.webp",
      color: "from-purple-700 via-indigo-600 to-blue-500",
      accent: "border-purple-400",
      heritage: "800+ Years",
      region: "Varanasi",
      techniques: ["Kadhua Weave",
        "Cutwork Weaving",
        "Brocade Weaving",
        "Ektara & Do-Tara Weaving"
        ],
      artisans: "10 to 14",
      avgTime: "A single piece takes between 80 and 140 hours to complete.",
      significance: "Lightweight elegance inspired by Banarasi silks and a blend of ancient brocade artistry."
    },
    {
      id: 3,
      title: "Leather Artistry",
      subtitle: "Traditional Juttiwork",
      description: "Traditional juttiwork is an old indian craft; it takes time, skill and patience. The leather is prepared by hand, so it feels soft and easy to wear. Small embroidery details are added, giving each piece a traditional look without making it heavy. This craft blends well with suits that carry light embroidery, adding a complete look. You can also pair sarees and lehngas with traditional juttiwork, especially during weddings and festive occasions, where comfort and style both matter.",
      fullDescription: "Leather bags with hand details provide a traditional look but are easy to carry. These products can be worn with embroidered and handwoven clothes. The accessories are designed in such a way that they go well with ethnic wear and add to the overall look without making it loud. Skilled craftsmen take their time to make these products. Leather bags, suits, sarees, lehngas, juttis, bags, and jewellery, Gulbhahar keeps this traditional leather craft simple and meaningful by making it easy to wear.",
      image: "/heritage-culture/leather-artistry-2-optimized.webp",
      color: "from-emerald-700 via-teal-600 to-cyan-500",
      accent: "border-emerald-400",
      heritage: "500+ Years",
      region: "Punjab",
      techniques: ["Hand-Cutting & Shaping Leather",
        "Double-Layer Construction",
        "Leather Moulding & Softening",
        "Natural Dyeing & Polishing"
        ],
      artisans: 8,
      avgTime: "A single piece takes between 90 and 160 hours to complete.",
      significance: "The traditional leather craftsmanship of Punjab underwent revival because of the abandonment of artisinal practices."
    },
    {
      id: 4,
      title: "Gemstone Craft",
      subtitle: "Crystal Embellishment & Kundan Work",
      description: "Gemstone work is a craft where small details matter. Crystal and Kundan work have been used in indian dressing, mainly for celebrations and important events. This craft is done with a light hand, keeping the look clean and wearable.",
      fullDescription: "At Gulbhahar, stones are placed carefully so they add shine without making the outfit feel heavy or uncomfortable. Crystal and Kundan give a neat festive touch to our suits that works well for both day and evening events. This craft adds beauty to sarees while staying easy to wear for long hours. Lehngas use gemstone work, which is perfect for weddings and family functions.Small stone details on juttis add charm and pair well with festive outfits. Bags carry light stone work that makes them stand out. Jewellery naturally completes the fit, as kundan and crystals are often the focus of traditional designs. These pieces are made to match the embroidered and handwoven outfits, creating a balanced look. Every piece of Gulbhahar is made by hand, where each artisans place each stone with focus and care.",
      image: "/heritage-culture/gemstone-craft2-optimized.webp",
      // image: "https://d21ojmskh8ksuv.cloudfront.net/gulbhahar-8.png",
      color: "from-rose-700 via-pink-600 to-red-500",
      accent: "border-rose-400",
      heritage: "600+ Years",
      region: "Rajasthan",
      techniques: ["Crystal Hand Embellishment",
        "Stone Appliqué Work",
        'Kundan Setting',
        "Mirror and Glass Inlay"
        ],
      artisans: 14,
      avgTime: "A single piece takes between 100 and 150 hours to complete.",
      significance: "The process of creating each pair transforms it into a unique piece of art. Our juttis transform into gemstone creations that people can wear as jewellery."
    },
    {
      id: 5,
      title: "Ornate Metals",
      subtitle: "Gota Patti, Sequins & Foil Work",
      description: "Gota patti, sequins, and foil work have been a part of Indian clothing for a very long time. This type of work is generally seen in weddings, festivals, and family functions. At Gulbhahar, this type of work is done in a calm and simple way, without making the clothes feel heavy and uncomfortable.",
      fullDescription: "The idea is to give shine to the clothes, not to make them heavy. Gota patti provides a soft shine to the clothes, sequins provide a small sparkle, and foil work provides light to the clothes. If done carefully, these details give a festive look to the clothes while still making them comfortable to wear. Suits with this type of work look bright and clean and can be worn for a long time. Sarees carry the shine in a gentle manner, making them easy to handle during major events. Lehngas carry these details to give a happy and festive look while still maintaining balance.This type of metal work is also done in accessories that go along with the suit. Juttis have some small shiny details that go well with party suits and are still comfortable on the feet. Bags have some light metal work that makes them look unique and easy to carry at the same time. The jewellery is made in such a way that it will complement suits that have gota patti, sequins, and foil work. Gulbhahar’s products are all made by skilled craftsmen who work on them slowly. They see minute details and take time to complete every piece. Gulbhahar’s products include suits, sarees, lehngas, juttis, bags, and jewellery. This traditional metal work art is kept simple and functional. This allows traditional designs to be worn comfortably today while still retaining their festive and cultural essence.",
      image: "/heritage-culture/ornate-metals-optimized.webp",
      color: "from-gray-700 via-slate-600 to-zinc-500",
      accent: "border-gray-400",
      heritage: "700+ Years",
      region: "Bidar",
      techniques: ["Gota Patti Appliqué",
        "Sitara Work (Sequin Embroidery)",
        "Metallic Lace & Border Work",
        "Mirror-Foil Overlay"
        ],
      artisans: 12,
      avgTime: "A single piece takes between 90 and 120 hours to complete.",
      significance: "The juttis showcase an extravagant celebratory style. The brilliance of handcrafted work with intricate metallic cultural revival."
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