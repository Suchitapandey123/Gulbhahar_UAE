import { 
    ArrowLeft,
    ChevronRight, 
    RefreshCw, 
    CheckCircle, 
    Clock, 
    XCircle,
    Calendar,
    Package,
    DollarSign,
    Filter,
    Download,
    Eye,
    MoreVertical
  } from "lucide-react";
  
  const RefundHistoryDetails = ({ onBack = () => {} }) => {
    const refunds = [
      {
        id: "#5913",
        refundStatus: "In Progress",
        statusColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
        statusIcon: Clock,
        orderDate: "12th Jan, 2025",
        requestDate: "12th Jan, 2025",
        amount: "$89.99",
        reason: "Product defective",
        estimatedCompletion: "3-5 business days",
        items: "Wireless Headphones"
      },
      {
        id: "#5914",
        refundStatus: "Completed",
        statusColor: "bg-green-100 text-green-800 border-green-200",
        statusIcon: CheckCircle,
        orderDate: "12th Jan, 2025",
        requestDate: "12th Jan, 2025",
        amount: "$156.50",
        reason: "Wrong item received",
        estimatedCompletion: "Completed",
        items: "Smart Watch Pro"
      },
      {
        id: "#5912",
        refundStatus: "Rejected",
        statusColor: "bg-red-100 text-red-800 border-red-200",
        statusIcon: XCircle,
        orderDate: "10th Jan, 2025",
        requestDate: "11th Jan, 2025",
        amount: "$45.00",
        reason: "Item damaged in shipping",
        estimatedCompletion: "N/A",
        items: "Phone Case"
      },
      {
        id: "#5911",
        refundStatus: "Processing",
        statusColor: "bg-blue-100 text-blue-800 border-blue-200",
        statusIcon: RefreshCw,
        orderDate: "8th Jan, 2025",
        requestDate: "9th Jan, 2025",
        amount: "$234.75",
        reason: "Change of mind",
        estimatedCompletion: "1-2 business days",
        items: "Laptop Stand & Accessories"
      },
    ];
  
    const handleViewDetails = (refundId) => {
      console.log(`View details for refund ${refundId}`);
    };
  
    const handleDownloadReceipt = (refundId) => {
      console.log(`Download receipt for refund ${refundId}`);
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Header Section */}
          <div className="mb-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-red-900 hover:text-red-700 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-sm sm:text-base font-medium">My Orders</span>
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 text-sm sm:text-base font-medium">Refund History</span>
            </div>
            
            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-900 rounded-xl">
                  <RefreshCw className="text-white w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Refund History
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    Track and manage your refund requests
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-red-900 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-24 mt-6" />
          </div>
  
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">1</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">2</p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">1</p>
                  <p className="text-sm text-gray-600">Rejected</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-red-900" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">$526</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Refunds List - Card Layout */}
          <div className="space-y-4">
            {refunds.length > 0 ? (
              refunds.map((refund, index) => {
                const StatusIcon = refund.statusIcon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:border-red-200 hover:shadow-md transition-all duration-200"
                  >
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                          <Package className="w-6 h-6 text-red-900" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            Order {refund.id}
                          </h3>
                          <p className="text-gray-600 text-sm">{refund.items}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${refund.statusColor}`}>
                          <StatusIcon className="w-4 h-4" />
                          {refund.refundStatus}
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
  
                    {/* Card Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Refund Amount</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">{refund.amount}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Order Date</span>
                        </div>
                        <p className="text-sm text-gray-900">{refund.orderDate}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <RefreshCw className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Request Date</span>
                        </div>
                        <p className="text-sm text-gray-900">{refund.requestDate}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Completion</span>
                        </div>
                        <p className="text-sm text-gray-900">{refund.estimatedCompletion}</p>
                      </div>
                    </div>
  
                    {/* Reason */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Refund Reason</p>
                      <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{refund.reason}</p>
                    </div>
  
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleViewDetails(refund.id)}
                        className="flex items-center justify-center gap-2 bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      
                      {refund.refundStatus === "Completed" && (
                        <button
                          onClick={() => handleDownloadReceipt(refund.id)}
                          className="flex items-center justify-center gap-2 border border-red-200 text-red-900 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Download Receipt
                        </button>
                      )}
                      
                      <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Contact Support
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Empty State */
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="w-12 h-12 text-red-900" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  No Refunds Found
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  You haven't requested any refunds yet. When you do, they'll appear here for easy tracking.
                </p>
                <button
                  onClick={onBack}
                  className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
                >
                  View Orders
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default RefundHistoryDetails;