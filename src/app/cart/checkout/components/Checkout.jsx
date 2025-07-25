"use client";
import { useState, useEffect } from "react";
import {
  MapPin,
  User,
  Package,
  ShoppingBag,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useCart } from "@/Providers/ContextProviders/CartContext";
import { useToast } from "@/hooks/useToast";

const Breadcrumb = () => (
  <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
    <span className="hover:text-red-900 transition-colors cursor-pointer">
      Home
    </span>
    <span className="text-red-900">/</span>
    <span className="hover:text-red-900 transition-colors cursor-pointer">
      Cart
    </span>
    <span className="text-red-900">/</span>
    <span className="text-red-900 font-semibold bg-red-50 px-3 py-1 rounded-md">
      Checkout
    </span>
  </nav>
);

// Indian States and Union Territories
const indianStates = [
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
  { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal-pradesh", label: "Himachal Pradesh" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west-bengal", label: "West Bengal" },
  // Union Territories
  { value: "andaman-nicobar", label: "Andaman and Nicobar Islands" },
  { value: "chandigarh", label: "Chandigarh" },
  {
    value: "dadra-nagar-haveli-daman-diu",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  { value: "delhi", label: "Delhi" },
  { value: "jammu-kashmir", label: "Jammu and Kashmir" },
  { value: "ladakh", label: "Ladakh" },
  { value: "lakshadweep", label: "Lakshadweep" },
  { value: "puducherry", label: "Puducherry" },
];

export default function CheckoutComponent() {
  const router = useRouter();
  const { cart, getCartTotal } = useCart();
  const { showToast, ToastContainer } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [shippingMethod, setShippingMethod] = useState("free");
  const [isProcessing, setIsProcessing] = useState(false);

  const [postalCodeValidation, setPostalCodeValidation] = useState({
    isValidating: false,
    isValid: null,
    error: null,
    deliveryInfo: null,
  });
  const [formData, setFormData] = useState({
    country: "india", // Default to India
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
  });

  // Handle initial loading and cart state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Check if cart is empty after loading
  const isCartEmpty = !isLoading && (!cart || cart.length === 0);

  // Validate postal code with Delhivery API
  const validatePostalCode = async (postalCode) => {
    if (!postalCode || postalCode.length < 6) {
      setPostalCodeValidation({
        isValidating: false,
        isValid: null,
        error: null,
        deliveryInfo: null,
      });
      return;
    }

    // Check if Delhivery API token is available
    // const DELHIVERY_TOKEN = process.env.NEXT_PUBLIC_DELHIVERY_TOKEN;
    const DELHIVERY_TOKEN = "101d6952983607b883a57570fde4c97bc4c882a1";
    if (!DELHIVERY_TOKEN) {
      console.warn("Delhivery API token not configured");
      setPostalCodeValidation({
        isValidating: false,
        isValid: null,
        error: "Postal code validation temporarily unavailable",
        deliveryInfo: null,
      });
      return;
    }

    setPostalCodeValidation((prev) => ({
      ...prev,
      isValidating: true,
      error: null,
    }));

    try {
      console.log("Making API call to Delhivery with postal code:", postalCode);
      console.log(
        "API URL:",
        `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${postalCode}`
      );
      console.log("Using token:", DELHIVERY_TOKEN);

      const response = await axios.get(
        `https://staging-express.delhivery.com/c/api/pin-codes/json/?filter_codes=${postalCode}`,
        {
          timeout: 10000, // 10 seconds timeout
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${DELHIVERY_TOKEN}`,
          },
        }
      );

      console.log("API Response:", response);
      console.log("Response Data:", response.data);
      console.log("Response Status:", response.status);

      if (
        response.data &&
        response.data.delivery_codes &&
        response.data.delivery_codes.length > 0
      ) {
        const deliveryData = response.data.delivery_codes[0].postal_code;

        setPostalCodeValidation({
          isValidating: false,
          isValid: true,
          error: null,
          deliveryInfo: {
            city: deliveryData.city,
            district: deliveryData.district,
            state: deliveryData.state_code,
            cod: deliveryData.cod === "Y",
            prepaid: deliveryData.pre_paid === "Y",
            pickup: deliveryData.pickup === "Y",
            covidZone: deliveryData.covid_zone,
            isODA: deliveryData.is_oda === "Y", // Out of Delivery Area
          },
        });

        // Auto-fill disabled - user can manually enter city and region
        // setFormData((prev) => ({
        //   ...prev,
        //   city: deliveryData.city || prev.city,
        //   region: deliveryData.district || prev.region,
        // }));

        showToast(
          `✅ Postal code valid for ${deliveryData.city}, ${deliveryData.district}`,
          "success"
        );
      } else {
        setPostalCodeValidation({
          isValidating: false,
          isValid: false,
          error: "Postal code not serviceable",
          deliveryInfo: null,
        });

        showToast(
          "This postal code is not serviceable in our delivery network",
          "error"
        );
      }
    } catch (error) {
      console.error("Error validating postal code:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      let errorMessage = "Unable to validate postal code";
      if (error.code === "ECONNABORTED") {
        errorMessage = "Validation timeout - please try again";
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication failed - please contact support";
        console.error("401 Error - Check if token is valid");
      } else if (error.response?.status === 403) {
        errorMessage = "Access denied - please contact support";
        console.error("403 Error - Token may not have permissions");
      } else if (error.response?.status === 404) {
        errorMessage = "Postal code not found";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests - please wait and try again";
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection";
      } else if (error.code === "ERR_NETWORK") {
        errorMessage = "Network error - check CORS settings";
        console.error("Network error - this might be a CORS issue");
      }

      setPostalCodeValidation({
        isValidating: false,
        isValid: false,
        error: errorMessage,
        deliveryInfo: null,
      });

      showToast(errorMessage, "error");
    }
  };

  // Debounced postal code validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.postalCode) {
        validatePostalCode(formData.postalCode);
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timeoutId);
  }, [formData.postalCode]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
  
      // Your existing validation code...
      const requiredFields = ["fullName", "email", "phone"];
      const missingFields = requiredFields.filter((field) => !formData[field]);
  
      if (missingFields.length > 0) {
        showToast(
          `Please fill in all required fields: ${missingFields.join(", ")}`,
          "error"
        );
        setIsProcessing(false);
        return;
      }
  
      // Validate postal code
      if (formData.postalCode) {
        if (postalCodeValidation.isValidating) {
          showToast(
            "Please wait for postal code validation to complete",
            "warning"
          );
          setIsProcessing(false);
          return;
        }
  
        if (postalCodeValidation.isValid === false) {
          showToast("Please enter a valid postal code for delivery", "error");
          setIsProcessing(false);
          return;
        }
      }
  
      // Generate unique order ID
      const generateOrderId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `ORDER_${timestamp}_${random}`.toUpperCase();
      };
  
      // Generate transaction ID for internal tracking
      const generateTransactionId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `TXN_${timestamp}_${random}`.toUpperCase();
      };
  
      // Generate session ID
      const generateSessionId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `SESSION_${timestamp}_${random}`.toUpperCase();
      };
  
      // Generate fingerprint
      const generateFingerprint = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          ctx.textBaseline = "top";
          ctx.font = "14px Arial";
          ctx.fillText("Browser fingerprint", 2, 2);
  
          const screen = `${window.screen.width}x${window.screen.height}`;
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const language = navigator.language;
          const platform = navigator.platform;
  
          const fingerprint = btoa(
            `${canvas.toDataURL()}_${screen}_${timezone}_${language}_${platform}`
          );
          return `FP_${fingerprint.substring(0, 16)}`;
        } catch (error) {
          return `FP_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 8)}`;
        }
      };
  
      const orderId = generateOrderId();
      const transactionId = generateTransactionId();
      const sessionId = generateSessionId();
      const fingerprint = generateFingerprint();
  
      // 🎯 COMPLETE checkout data with ALL user information and delivery info
      const checkoutData = {
        // 📝 Form data (User Information)
        ...formData, // This includes: fullName, email, phone, address, city, region, postalCode, country
  
        // 🆔 Generated IDs
        orderId: orderId,
        transactionId: transactionId,
        sessionId: sessionId,
        fingerprint: fingerprint,
  
        // 📦 Order details
        deliveryInfo: postalCodeValidation.deliveryInfo, // 🎯 IMPORTANT: Include delivery info with COD availability
        shippingMethod,
        orderTotal: total,
        orderSubtotal: subtotal,
        orderShipping: shipping,
        orderItems: cart, // 🛒 Cart items
  
        // ⏰ Timestamps
        checkoutCompletedAt: new Date().toISOString(),
  
        // 🔍 Additional metadata
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
        browserInfo: {
          language: typeof navigator !== "undefined" ? navigator.language : "",
          platform: typeof navigator !== "undefined" ? navigator.platform : "",
        },
      };
  
      console.log('💾 Saving complete checkout data to localStorage:', checkoutData);
  
      // 🎯 Save to localStorage for payment page to pick up
      try {
        localStorage.setItem("checkoutFormData", JSON.stringify(checkoutData));
        console.log("✅ Checkout data saved to localStorage successfully");
        
        // Verify the data was saved correctly
        const savedData = localStorage.getItem("checkoutFormData");
        if (savedData) {
          const parsedSavedData = JSON.parse(savedData);
          console.log("✅ Verified saved data:", parsedSavedData);
          
          // Check if critical fields are present
          const criticalFields = ['fullName', 'email', 'phone', 'orderId', 'orderTotal', 'orderItems'];
          const missingCriticalFields = criticalFields.filter(field => !parsedSavedData[field]);
          
          if (missingCriticalFields.length > 0) {
            console.warn('⚠️ Missing critical fields in saved data:', missingCriticalFields);
          } else {
            console.log('✅ All critical fields saved successfully');
          }
        }
      } catch (error) {
        console.error("❌ Error saving checkout data:", error);
        showToast("Error saving checkout data. Please try again.", "error");
        setIsProcessing(false);
        return;
      }
  
      showToast("Redirecting to payment...", "success");
  
      // Add a small delay to ensure localStorage is written
      setTimeout(() => {
        // Redirect to payment page with order details
        router.push(
          `/cart/checkout/payment?orderId=${orderId}&amount=${total}`
        );
      }, 1000);
    } catch (error) {
      console.error("Error processing checkout:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  // Get the current image for display with proper error handling
  const getCurrentImage = (item) => {
    // Check if it's images (plural) - array of arrays
    if (item.images && Array.isArray(item.images)) {
      if (item.images.length > 0 && Array.isArray(item.images[0])) {
        return item.images[0][0]; // First image from first array
      }
    }

    // Check if it's image (singular) - single array
    if (item.image && Array.isArray(item.image)) {
      return item.image[0][0]; // First image from array
    }
    return null;
  };

  const shippingOptions = {
    free: {
      price: 0,
      days: "5-7 business days",
      icon: "🚛",
      name: "Free Shipping",
    },
    standard: {
      price: 250,
      days: "3-5 business days",
      icon: "📦",
      name: "Standard Shipping",
    },
    express: {
      price: 300,
      days: "1-2 business days",
      icon: "⚡",
      name: "Express Shipping",
    },
  };

  // Calculate totals from cart - with safety checks
  const subtotal =
    cart && Array.isArray(cart)
      ? cart.reduce((sum, item) => {
          if (
            !item ||
            typeof item.price !== "number" ||
            typeof item.quantity !== "number"
          ) {
            return sum;
          }
          return sum + item.price * item.quantity;
        }, 0)
      : 0;

  const isFreeShippingEligible = subtotal >= 5000;
  useEffect(() => {
    // If free shipping is selected but not eligible, switch to standard shipping
    if (shippingMethod === "free" && !isFreeShippingEligible) {
      setShippingMethod("standard");
    }
  }, [isFreeShippingEligible, shippingMethod]);

  // Calculate shipping cost based on eligibility and ODA
  let shipping = shippingOptions[shippingMethod]?.price || 0;
  if (isFreeShippingEligible && shippingMethod === "free") {
    shipping = 0;
  }

  // Add ODA surcharge if applicable
  const odaSurcharge = postalCodeValidation.deliveryInfo?.isODA ? 50 : 0;
  shipping += odaSurcharge;

  const total = subtotal + shipping;

  // Show loading state (keeping existing loading UI)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <span>/</span>
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
            <span>/</span>
            <div className="h-6 w-20 bg-red-200 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border border-red-100 p-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                    <div>
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                    <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                  <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-red-50/50 rounded-xl border border-red-100 p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="h-3 w-16 bg-gray-100 rounded animate-pulse mb-2"></div>
                          <div className="h-3 w-12 bg-gray-100 rounded animate-pulse"></div>
                        </div>
                        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t-2 border-red-100 pt-4 space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-12 bg-green-200 rounded animate-pulse"></div>
                    </div>
                    <div className="border-t-2 border-red-200 pt-3 bg-red-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <div className="h-6 w-12 bg-red-200 rounded animate-pulse"></div>
                        <div className="h-6 w-24 bg-red-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-5 h-5 border-2 border-red-900 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Loading checkout...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty (after loading)
  if (isCartEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="text-gray-300 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => router.push("/")}
            className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <User className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Shipping Address
                  </h3>
                  <p className="text-sm text-gray-600">
                    🇮🇳 Delivering within India
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30"
                    placeholder="+91 12345 67890"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Street Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30"
                    placeholder="House number and street name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    State/Union Territory
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30"
                  >
                    <option value="">Select State/UT</option>
                    {indianStates.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 col-span-1">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Postal Code
                    <span className="text-xs text-gray-500 ml-1">
                      (Auto-validated)
                    </span>
                  </label>

                  {/* Input and Validation Icons Container */}
                  <div className="relative mb-3">
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full border-2 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 pr-12 ${
                        postalCodeValidation.isValid === true
                          ? "border-green-500 focus:border-green-500"
                          : postalCodeValidation.isValid === false
                          ? "border-red-500 focus:border-red-500"
                          : "border-red-200 focus:border-red-900"
                      }`}
                      placeholder="110001"
                    />

                    {/* Validation Icons - Positioned absolutely within input */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {postalCodeValidation.isValidating && (
                        <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                      )}
                      {postalCodeValidation.isValid === true && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {postalCodeValidation.isValid === false && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>

                  {/* Delivery Info - Full width and responsive */}
                  {postalCodeValidation.deliveryInfo && (
                    <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm font-semibold text-green-800">
                          Delivery Available
                        </span>
                      </div>
                      <div className="text-xs text-green-700 space-y-2">
                        {/* Location Info - Hidden on mobile for space */}
                        {/* <p className="hidden sm:block">
                        📍 {postalCodeValidation.deliveryInfo.city},{" "}
                        {postalCodeValidation.deliveryInfo.district}
                      </p> */}

                        {/* Badges - Responsive flex */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          {postalCodeValidation.deliveryInfo.cod && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs inline-flex items-center gap-1 w-fit">
                              💰 COD Available
                            </span>
                          )}
                          {postalCodeValidation.deliveryInfo.isODA && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs inline-flex items-center gap-1 w-fit">
                              🚛 Remote Area (+₹50)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Method Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <Package className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Shipping Method
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose your preferred delivery speed
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(shippingOptions).map(
                  ([key, { price, days, icon, name }]) => {
                    const isFreeShippingOption = key === "free";
                    const isDisabled =
                      isFreeShippingOption && !isFreeShippingEligible;
                    const displayPrice =
                      isFreeShippingEligible && isFreeShippingOption
                        ? 0
                        : price;
                    const finalPrice =
                      displayPrice +
                      (postalCodeValidation.deliveryInfo?.isODA ? 50 : 0);

                    return (
                      <label
                        key={key}
                        className={`flex items-center p-4 border-2 rounded-xl transition-all duration-200 ${
                          isDisabled
                            ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                            : shippingMethod === key
                            ? "border-red-900 bg-red-50 ring-2 ring-red-200 cursor-pointer"
                            : "border-red-200 hover:border-red-300 hover:bg-red-50 cursor-pointer"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={key}
                          checked={shippingMethod === key}
                          onChange={(e) => {
                            if (!isDisabled) {
                              setShippingMethod(e.target.value);
                            }
                          }}
                          disabled={isDisabled}
                          className={`w-4 h-4 focus:ring-2 ${
                            isDisabled
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-900 focus:ring-red-500 cursor-pointer"
                          }`}
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-2xl ${
                                  isDisabled ? "opacity-50" : ""
                                }`}
                              >
                                {icon}
                              </span>
                              <div>
                                <p
                                  className={`font-bold ${
                                    isDisabled
                                      ? "text-gray-400"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {name}
                                  {isDisabled && (
                                    <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                      Requires ₹5000+ order
                                    </span>
                                  )}
                                </p>
                                <p
                                  className={`text-sm ${
                                    isDisabled
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {days}
                                </p>
                                {isFreeShippingEligible &&
                                  isFreeShippingOption && (
                                    <p className="text-xs text-green-600 font-semibold">
                                      🎉 Free upgrade - On{" "}
                                      <strong>prepaid</strong> orders above
                                      ₹5000+
                                    </p>
                                  )}
                                {postalCodeValidation.deliveryInfo?.isODA &&
                                  !isDisabled && (
                                    <p className="text-xs text-orange-600 font-medium">
                                      +₹50 Remote area surcharge
                                    </p>
                                  )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span
                                className={`font-bold text-lg ${
                                  isDisabled ? "text-gray-400" : "text-red-900"
                                }`}
                              >
                                {isDisabled
                                  ? `₹${price}`
                                  : finalPrice === 0
                                  ? "FREE"
                                  : `₹${finalPrice}`}
                              </span>
                              {isFreeShippingEligible &&
                                isFreeShippingOption &&
                                !postalCodeValidation.deliveryInfo?.isODA && (
                                  <p className="text-xs text-gray-500 line-through">
                                    ₹{price}
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  }
                )}
              </div>

              {/* Helper text for free shipping eligibility */}
              {!isFreeShippingEligible && subtotal > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡{" "}
                    <strong>
                      Add ₹{(5000 - subtotal).toLocaleString()} more
                    </strong>{" "}
                    to unlock free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 ">
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 lg:sticky lg:top-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mt-6 mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <ShoppingBag className="text-white h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4">
                {/* Cart Items */}
                {cart &&
                  cart.length > 0 &&
                  cart.map((item) => {
                    if (!item || !item.id) return null;

                    return (
                      <div
                        key={item.id}
                        className="bg-red-50/50 rounded-xl border border-red-100 p-4"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={getCurrentImage(item) || "/placeholder.jpg"}
                              alt={item.name || "Product"}
                              width={200}
                              height={200}
                              priority
                              className="w-full object-cover scale-y-[1.15] h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">
                              {item.name || "Product"}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              {item.selectedColor && (
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                                  {item.selectedColor}
                                </span>
                              )}
                              {item.selectedSize && (
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                                  Size {item.selectedSize}
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 mt-1 font-medium">
                              Qty:{" "}
                              <span className="text-red-900">
                                {item.quantity || 1}
                              </span>
                            </div>
                          </div>
                          <span className="font-bold text-lg text-red-900">
                            ₹
                            {(
                              (item.price || 0) * (item.quantity || 1)
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                {/* Summary Section */}
                <div className="border-t-2 border-red-100 pt-4 space-y-3">
                  {/* Free Shipping Notification */}
                  {shippingMethod === "free" && (
                    <>
                      {!isFreeShippingEligible && subtotal > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                          <p className="text-sm text-blue-800">
                            💡{" "}
                            <strong>
                              Add ₹{(5000 - subtotal).toLocaleString()} more
                            </strong>{" "}
                            to qualify for free shipping!
                          </p>
                        </div>
                      )}

                      {isFreeShippingEligible && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                          <p className="text-sm text-green-800">
                            🎉 <strong>Congratulations!</strong> You qualify for
                            free shipping on orders ₹5000+
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Delivery Info Summary */}
                  {postalCodeValidation.deliveryInfo && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-800">
                          Delivery Details
                        </span>
                      </div>
                      <div className="text-xs text-red-700 space-y-1">
                        {/* <p>
                          📍 {postalCodeValidation.deliveryInfo.city},{" "}
                          {postalCodeValidation.deliveryInfo.district}
                        </p> */}
                        <div className="flex gap-2 flex-wrap">
                          {postalCodeValidation.deliveryInfo.cod && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              COD ✓
                            </span>
                          )}
                          {postalCodeValidation.deliveryInfo.isODA && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                              Remote Area
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Shipping</span>
                    <div className="text-right">
                      <span className="font-bold text-green-600">
                        {shipping === 0
                          ? "FREE"
                          : `₹${shipping.toLocaleString()}`}
                      </span>
                      {isFreeShippingEligible &&
                        shippingMethod === "free" &&
                        shippingOptions[shippingMethod]?.price > 0 &&
                        !postalCodeValidation.deliveryInfo?.isODA && (
                          <p className="text-xs text-gray-500 line-through">
                            ₹{shippingOptions[shippingMethod].price}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* ODA Surcharge */}
                  {odaSurcharge > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span className="font-medium text-orange-600">
                        Remote Area Surcharge
                      </span>
                      <span className="font-bold text-orange-600">
                        ₹{odaSurcharge}
                      </span>
                    </div>
                  )}

                  <div className="border-t-2 border-red-200 pt-3 bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between text-xl font-bold text-red-900">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={postalCodeValidation.isValidating || isProcessing}
                  className={`w-full py-4 rounded-xl font-bold text-lg transform transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    postalCodeValidation.isValidating || isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-900 to-red-800 text-white hover:from-red-800 hover:to-red-700 hover:scale-105"
                  }`}
                >
                  {postalCodeValidation.isValidating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Validating...
                    </>
                  ) : isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Continue to Payment →
                    </>
                  )}
                </button>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-600 bg-red-50 p-4 rounded-xl border border-red-100">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-red-600" />
                    <span className="font-semibold text-red-900">
                      Secure Checkout
                    </span>
                  </div>
                  <p className="text-xs">
                    Your payment information is encrypted and secure
                  </p>
                  {postalCodeValidation.deliveryInfo?.cod && (
                    <p className="text-xs text-green-700 mt-1">
                      💰 Cash on Delivery available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
