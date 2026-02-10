import { SizeChartData } from "@/app/api/v0/type";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Ruler, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeChart: SizeChartData;
}

export const SizeGuideModal = ({
  isOpen,
  onClose,
  sizeChart,
}: SizeGuideModalProps) => {
  const [activeTab, setActiveTab] = useState<"chart" | "measure" | "tips">(
    "chart",
  );

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Determine available tabs based on data and settings
  const showChart = sizeChart?.displaySettings?.showChartTab ?? true;
  const showMeasure =
    sizeChart?.displaySettings?.showMeasurementTab ??
    !!sizeChart?.measurementSteps?.length;
  const showTips =
    sizeChart?.displaySettings?.showFitTipsTab ?? !!sizeChart?.fitTips?.length;

  // Set initial active tab
  useEffect(() => {
    if (isOpen) {
      // Only set initial tab when modal opens
      if (showChart) setActiveTab("chart");
      else if (showMeasure) setActiveTab("measure");
      else if (showTips) setActiveTab("tips");
    }
  }, [showChart, showMeasure, showTips, isOpen]);

  // Prepare table data
  const tableData = sizeChart?.sizes || sizeChart?.charts || [];
  const tableKeys =
    tableData.length > 0
      ? Object.keys(tableData[0]).filter((k) => !["_id", "id"].includes(k))
      : [];

  const renderTabContent = () => {
    switch (activeTab) {
      case "chart":
        return (
          <div className="space-y-6">
            {!tableData.length ? (
              <div className="text-center py-10 text-gray-500">
                <p>No size chart available.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border rounded-lg border-gray-100">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      {tableKeys.map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 font-semibold text-gray-900"
                        >
                          {key.toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tableData.map((row: any, idx: number) => (
                      <tr key={idx} className="bg-white hover:bg-gray-50">
                        {tableKeys.map((key) => (
                          <td
                            key={key}
                            className="px-6 py-4 font-medium text-gray-900"
                          >
                            {row[key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#800000]" />
              <p>
                All measurements are in inches/cm as specified. For the most
                accurate fit, we recommend measuring yourself in your
                undergarments.
              </p>
            </div>
          </div>
        );

      case "measure":
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#800000]/5 flex items-center justify-center text-[#800000]">
                <Ruler className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                How to Measure
              </h3>
            </div>

            <div className="grid gap-6">
              {sizeChart?.measurementSteps?.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="relative pl-4 border-l-2 border-gray-200 hover:border-[#800000] transition-colors"
                >
                  <span className="text-xs font-bold text-[#800000] tracking-wider uppercase mb-1 block">
                    Step {step.number || idx + 1}
                  </span>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "tips":
        return (
          <div className="space-y-8">
            {sizeChart?.fitTips?.map((tip: any, idx: number) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {tip.title}
                </h3>
                <ul className="space-y-3">
                  {tip.points.map((point: string, pIdx: number) => (
                    <li
                      key={pIdx}
                      className="flex gap-3 text-sm text-gray-600 items-start"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#800000] mt-1.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-colors"
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-0 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white pointer-events-auto w-full h-full md:h-[75vh] md:max-w-7xl md:rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif text-gray-900">
                      Size Guide
                    </h2>
                    {sizeChart?.parentCategory && (
                      <p className="text-sm text-gray-500 mt-1 capitalize">
                        {sizeChart.parentCategory} Collection
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-6 border-b border-gray-200">
                  {showChart && (
                    <button
                      onClick={() => setActiveTab("chart")}
                      className={`pb-3 text-sm font-medium transition-colors relative ${
                        activeTab === "chart"
                          ? "text-[#800000]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Size Chart
                      {activeTab === "chart" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#800000]"
                        />
                      )}
                    </button>
                  )}
                  {showMeasure && (
                    <button
                      onClick={() => setActiveTab("measure")}
                      className={`pb-3 text-sm font-medium transition-colors relative ${
                        activeTab === "measure"
                          ? "text-[#800000]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      How to Measure
                      {activeTab === "measure" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#800000]"
                        />
                      )}
                    </button>
                  )}
                  {showTips && (
                    <button
                      onClick={() => setActiveTab("tips")}
                      className={`pb-3 text-sm font-medium transition-colors relative ${
                        activeTab === "tips"
                          ? "text-[#800000]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Fit Tips
                      {activeTab === "tips" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#800000]"
                        />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderTabContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
