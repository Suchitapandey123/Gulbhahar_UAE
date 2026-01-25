"use client";
import { useState } from "react";
import { Check, HelpCircle, Info, Ruler, X } from "lucide-react";

const CUSTOM_RED = "hsl(359.39deg 63.87% 30.39%)";

const FOOTWEAR_SIZE_CHART = [
  { eu: '35', uk: '2.5', us: '5', cm: '22.5', inches: '8.9' },
  { eu: '36', uk: '3.5', us: '6', cm: '23.0', inches: '9.1' },
  { eu: '37', uk: '4', us: '6.5', cm: '23.5', inches: '9.3' },
  { eu: '38', uk: '5', us: '7.5', cm: '24.0', inches: '9.4' },
  { eu: '39', uk: '6', us: '8.5', cm: '24.5', inches: '9.6' },
  { eu: '40', uk: '6.5', us: '9', cm: '25.0', inches: '9.8' },
  { eu: '41', uk: '7.5', us: '10', cm: '25.5', inches: '10.0' },
];

const CLOTHING_SIZE_CHART = [
  { size: "XS", chest: "34-36", waist: "28-30", length: "26" },
  { size: "S", chest: "36-38", waist: "30-32", length: "27" },
  { size: "M", chest: "38-40", waist: "32-34", length: "28" },
  { size: "L", chest: "40-42", waist: "34-36", length: "29" },
  { size: "XL", chest: "42-44", waist: "36-38", length: "30" },
  { size: "XXL", chest: "44-46", waist: "38-40", length: "31" },
  { size: "3XL", chest: "46-48", waist: "40-42", length: "32" },
];

const SAREE_SIZE_CHART = [
  { type: "Standard Saree", length: "5.5 - 6 yards", blouse: "Separate blouse piece included" },
  { type: "Designer Saree", length: "5.5 - 6 yards", blouse: "Blouse included or available separately" },
  { type: "Wedding Saree", length: "6 - 9 yards", blouse: "Heavy blouse piece included" },
];

const MEASUREMENT_STEPS = [
  { number: "1", title: "Prepare", description: "Place a piece of paper on a hard floor against a wall. Wear the socks you plan to wear with the shoes." },
  { number: "2", title: "Position", description: "Stand on the paper with your heel against the wall. Keep your full weight on the foot you're measuring." },
  { number: "3", title: "Mark", description: "Mark the end of your longest toe on the paper. This might not be your big toe!" },
  { number: "4", title: "Measure", description: "Use a ruler to measure the distance from the wall to the mark. This is your foot length." },
  { number: "5", title: "Repeat", description: "Repeat for the other foot and use the larger measurement to find your size in our chart." },
];

export default function SizeGuideModal({ isOpen, onClose, category, productSizes }) {
  const [activeTab, setActiveTab] = useState("chart");

  if (!isOpen) return null;

  const categoryLower = Array.isArray(category) ? category[0]?.toLowerCase() : category?.toLowerCase();
  const isFootwear = ["juttis", "heels", "footwear"].includes(categoryLower);
  const isBag = categoryLower === "bags";
  const isSaree = categoryLower === "sarees";
  const isClothing = ["suits", "clothing", "clothes"].includes(categoryLower);

  const fitTips = [
    {
      title: "What to Look For in a Good Fit",
      points: [
        "There should be about a thumb's width (1/2 inch) between your longest toe and the front of the shoe",
        "The shoe should feel snug but not tight around the widest part of your foot",
        "Your heel should not slip when walking",
        "You should be able to wiggle your toes freely",
        "If you're between sizes, consider the shoe style - go larger for thick socks or athletic shoes"
      ]
    }
  ];

  const clothingFitTips = [
    {
      title: "What to Look For in a Good Fit",
      points: [
        "Shoulders should align with the garment's shoulder seams",
        "Sleeves should end at your wrist bone",
        "There should be enough room to move comfortably",
        "The waist should sit comfortably without digging in",
        "Length should be appropriate for the garment style"
      ]
    }
  ];

  const sareeFitTips = [
    {
      title: "What to Look For in a Good Fit",
      points: [
        "Ensure the saree length is appropriate for your height",
        "The blouse should fit snugly but comfortably",
        "Pallu length should drape elegantly",
        "Consider the fabric weight for comfort",
        "Check for ease of movement when draped"
      ]
    }
  ];

  const getCurrentFitTips = () => {
    if (isFootwear) return fitTips;
    if (isSaree) return sareeFitTips;
    if (isClothing) return clothingFitTips;
    return [];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center" style={{ backgroundColor: `${CUSTOM_RED}20` }}>
                <Ruler className="w-5 h-5" style={{ color: CUSTOM_RED }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Size Guide</h2>
                <p className="text-gray-600">Find your perfect fit</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mt-6">
            <button
              onClick={() => setActiveTab("chart")}
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === "chart" ? "border-b-2" : "text-gray-500 hover:text-gray-700"}`}
              style={activeTab === "chart" ? { borderColor: CUSTOM_RED, color: CUSTOM_RED } : {}}
            >
              <span className="text-lg">📏</span> Size Chart
            </button>

            {isFootwear && (
              <button
                onClick={() => setActiveTab("measure")}
                className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === "measure" ? "border-b-2" : "text-gray-500 hover:text-gray-700"}`}
                style={activeTab === "measure" ? { borderColor: CUSTOM_RED, color: CUSTOM_RED } : {}}
              >
                <span className="text-lg">📐</span> How to Measure
              </button>
            )}

            <button
              onClick={() => setActiveTab("tips")}
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === "tips" ? "border-b-2" : "text-gray-500 hover:text-gray-700"}`}
              style={activeTab === "tips" ? { borderColor: CUSTOM_RED, color: CUSTOM_RED } : {}}
            >
              <span className="text-lg">💡</span> Fit Tips
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Size Chart Tab */}
          {activeTab === "chart" && (
            <div className="space-y-6">
              {isBag ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Bag Dimensions</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {productSizes && productSizes.length > 0 ? (
                      <div className="space-y-2">
                        {productSizes[0].split(/[x\s]+/).map((dim, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">
                              {["Height", "Width", "Depth"][idx] || `Dimension ${idx + 1}`}:
                            </span>
                            <span className="font-medium" style={{ color: CUSTOM_RED }}>{dim.trim()} cm</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No size information available</p>
                    )}
                  </div>
                </div>
              ) : isSaree ? (
                <div className="overflow-x-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Saree Size Guide</h3>
                  <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Saree Type</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Length</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Blouse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SAREE_SIZE_CHART.map((size, index) => (
                        <tr key={size.type} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                          <td className="border border-gray-200 px-4 py-3 font-semibold" style={{ color: CUSTOM_RED }}>{size.type}</td>
                          <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.length}</td>
                          <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.blouse}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : isFootwear ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Footwear Size Chart</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">EU Size</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">UK Size</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">US Size</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Foot Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {FOOTWEAR_SIZE_CHART.map((size, index) => (
                          <tr key={size.eu} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                            <td className="border border-gray-200 px-4 py-3 font-semibold" style={{ color: CUSTOM_RED }}>{size.eu}</td>
                            <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.uk}</td>
                            <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.us}</td>
                            <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">{size.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : isClothing ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Clothing Size Chart</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Size</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Chest (inches)</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Waist (inches)</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Length (inches)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CLOTHING_SIZE_CHART.map((size, index) => (
                          <tr key={size.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                            <td className="border border-gray-200 px-4 py-3 font-semibold" style={{ color: CUSTOM_RED }}>{size.size}</td>
                            <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.chest}</td>
                            <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.waist}</td>
                            <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No size chart available for this product category.</p>
                </div>
              )}
            </div>
          )}

          {/* How to Measure Tab */}
          {activeTab === "measure" && isFootwear && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">How to Measure Your Feet</h3>
              <p className="text-gray-600">Follow these simple steps for the most accurate measurement</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MEASUREMENT_STEPS.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: CUSTOM_RED }}>
                          {step.number}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Always measure both feet and use the larger measurement. If your measurements fall between sizes, we recommend choosing the larger size.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fit Tips Tab */}
          {activeTab === "tips" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Perfect Fit Tips</h3>
              <p className="text-gray-600">Expert advice for finding your ideal fit</p>

              {getCurrentFitTips().length > 0 ? (
                <div className="space-y-4">
                  {getCurrentFitTips().map((tip, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">{tip.title}</h4>
                          <ul className="space-y-2">
                            {tip.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Fit tips are specific to each product category.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-3 sm:p-6 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <p>Need more help? <a href="/contact" className="hover:underline" style={{ color: CUSTOM_RED }}>Contact Us</a></p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="text-gray-700 bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Back to Product
              </button>
              <button
                onClick={onClose}
                className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors font-medium"
                style={{ backgroundColor: CUSTOM_RED }}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
