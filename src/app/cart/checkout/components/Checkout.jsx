// Enhanced Checkout Component with Email and Phone Validation
"use client";
import { useState, useEffect, useRef } from "react";
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
  ChevronDown,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/Providers/ContextProviders/CartContext";
import { useToast } from "@/hooks/useToast";
import { checkoutApi } from '../../../api/cart/cart';

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

const CustomStateDropdown = ({ value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStates, setFilteredStates] = useState(indianStates);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Get the display label for the selected value
  const selectedState = indianStates.find((state) => state.value === value);
  const displayLabel = selectedState ? selectedState.label : "Select State/UT";

  // Filter states based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = indianStates.filter((state) =>
        state.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStates(filtered);
    } else {
      setFilteredStates(indianStates);
    }
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle state selection
  const handleStateSelect = (stateValue) => {
    onChange({ target: { name: "region", value: stateValue } });
    setIsOpen(false);
    setSearchTerm("");
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Main Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border-2 border-red-200 rounded-xl p-4 text-left text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 flex items-center justify-between ${
          isOpen ? "border-red-900 ring-2 ring-red-200" : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {displayLabel}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute z-50 w-full mt-1 bg-white border-2 border-red-200 rounded-xl shadow-2xl max-h-80 overflow-hidden md:max-h-64">
            {/* Search Input */}
            <div className="p-3 border-b border-red-100 bg-red-50/50 sticky top-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg focus:border-red-900 focus:ring-1 focus:ring-red-200 outline-none text-sm"
                />
              </div>
            </div>

            {/* States List */}
            <div className="overflow-y-auto max-h-60 md:max-h-48">
              {filteredStates.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No states found matching "{searchTerm}"
                </div>
              ) : (
                <div className="py-1">
                  {filteredStates.map((state) => (
                    <button
                      key={state.value}
                      type="button"
                      onClick={() => handleStateSelect(state.value)}
                      className={`w-full text-left px-4 py-3 hover:bg-red-50 focus:bg-red-50 focus:outline-none transition-colors duration-150 flex items-center justify-between group ${
                        value === state.value
                          ? "bg-red-100 text-red-900 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                        {state.label}
                      </span>
                      {value === state.value && (
                        <CheckCircle className="h-4 w-4 text-red-900" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer for mobile */}
            <div className="md:hidden border-t border-red-100 p-3 bg-red-50/50">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 px-4 bg-red-900 text-white rounded-lg font-medium hover:bg-red-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  // Remove all non-digits
  const cleanPhone = phone.replace(/\D/g, "");

  // Check for valid Indian phone number - must be exactly 10 digits starting with 6, 7, 8, or 9
  return cleanPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanPhone);
};

const formatPhoneNumber = (phone) => {
  // Remove all non-digits
  const cleanPhone = phone.replace(/\D/g, "");

  // Return only the 10-digit number for storage (no +91 prefix)
  if (cleanPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanPhone)) {
    return cleanPhone; // Just return the 10 digits
  }
  return phone; // Return original if can't format
};

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

  // 🔧 TOGGLE FOR PINCODE API VALIDATION
  const ENABLE_PINCODE_API = true; // ⚠️ Set to true to enable API validation

  // Field validation states
  const [fieldValidation, setFieldValidation] = useState({
    email: { isValid: null, error: null },
    phone: { isValid: null, error: null },
    fullName: { isValid: null, error: null },
  });

  const [postalCodeValidation, setPostalCodeValidation] = useState({
    isValidating: false,
    isValid: null,
    error: null,
    deliveryInfo: null,
  });

  const [formData, setFormData] = useState({
    country: "India", // Default to India
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
  });
   

   useEffect(() => {
    if (cart && cart.length > 0) {
      fbq('track', 'InitiateCheckout', {
        content_ids: cart.map(item => item.id),     // product IDs
        content_name: 'Checkout',
        content_type: 'product',
        value: getCartTotal(),                      // total price
        currency: 'INR'
      });
    }
  }, [cart]);

  // Handle initial loading and cart state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Check if cart is empty after loading
  const isCartEmpty = !isLoading && (!cart || cart.length === 0);

  // Real-time field validation
  const validateField = (name, value) => {
    let isValid = null;
    let error = null;

    switch (name) {
      case "fullName":
        if (value.trim().length === 0) {
          isValid = false;
          error = "Full name is required";
        } else if (value.trim().length < 2) {
          isValid = false;
          error = "Name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          isValid = false;
          error = "Name can only contain letters and spaces";
        } else {
          isValid = true;
          error = null;
        }
        break;

      case "email":
        if (value.trim().length === 0) {
          isValid = false;
          error = "Email is required";
        } else if (!validateEmail(value)) {
          isValid = false;
          error = "Please enter a valid email address";
        } else {
          isValid = true;
          error = null;
        }
        break;

      case "phone":
        if (value.trim().length === 0) {
          isValid = false;
          error = "Phone number is required";
        } else {
          const cleanPhone = value.replace(/\D/g, "");
          if (cleanPhone.length < 10) {
            isValid = false;
            error = "Phone number must be 10 digits";
          } else if (cleanPhone.length > 10) {
            isValid = false;
            error = "Phone number must be exactly 10 digits";
          } else if (!validatePhone(value)) {
            isValid = false;
            error = "Phone number must start with 6, 7, 8, or 9";
          } else {
            isValid = true;
            error = null;
          }
        }
        break;

      default:
        return;
    }

    setFieldValidation((prev) => ({
      ...prev,
      [name]: { isValid, error },
    }));
  };

  // Debounced validation effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.fullName) {
        validateField("fullName", formData.fullName);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.fullName]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.email) {
        validateField("email", formData.email);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.phone) {
        validateField("phone", formData.phone);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.phone]);

  // 🎯 MODIFIED: Default validation without API (can be easily switched back)
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

    console.log(validatePostalCode)

    // 🔧 CHECK IF API IS ENABLED
    if (!ENABLE_PINCODE_API) {
      // ✅ DEFAULT VALIDATION WITHOUT API
      // console.log("📍 Pincode API disabled - using default validation");
      
      // Simulate a brief validation delay
      setPostalCodeValidation(prev => ({
        ...prev,
        isValidating: true,
        error: null,
      }));

      setTimeout(() => {
        // Default to valid with COD available
        setPostalCodeValidation({
          isValidating: false,
          isValid: true,
          error: null,
          deliveryInfo: {
            city: "Default City",
            district: "Default District", 
            state: "Default State",
            cod: true, // ✅ COD available by default
            prepaid: true,
            pickup: true,
            covidZone: "Green",
            isODA: false, // ✅ No ODA charges by default
          },
        });

        showToast(`✅ Postal code ${postalCode} - Default validation (API disabled)`, "success");
      }, 500);
      
      return;
    }
    // 🚀 ORIGINAL API VALIDATION CODE (kept intact)
    const DELHIVERY_TOKEN = "8225de";
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
      // const response = await axios.get(
      //   `https://api.gulbhahar.com/delhiveryRoutes/v0/checkAvalibility?pincode=${postalCode}`,
      //   {
      //     timeout: 10000,
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //       Authorization: `${DELHIVERY_TOKEN}`,
      //     },
      //   }
      // );

      const result = await checkoutApi.validatePostalCode(postalCode);

      // if (
      //   response.data.msg &&
      //   response.data.msg.delivery_codes &&
      //   response.data.msg.delivery_codes.length > 0
      // ) {
      //   const deliveryData = response.data.msg.delivery_codes[0].postal_code;

        // setPostalCodeValidation({
        //   isValidating: false,
        //   isValid: true,
        //   error: null,
        //   deliveryInfo: {
        //     city: deliveryData.city,
        //     district: deliveryData.district,
        //     state: deliveryData.state_code,
        //     cod: deliveryData.cod === "Y",
        //     prepaid: deliveryData.pre_paid === "Y",
        //     pickup: deliveryData.pickup === "Y",
        //     covidZone: deliveryData.covid_zone,
        //     isODA: deliveryData.is_oda === "Y",
        //   },
        // });

      //   showToast(
      //     `✅ Postal code valid for ${deliveryData.city}, ${deliveryData.district}`,
      //     "success"
      //   );
      // } else {
      //   setPostalCodeValidation({
      //     isValidating: false,
      //     isValid: false,
      //     error: "Postal code not serviceable",
      //     deliveryInfo: null,
      //   });

      //   showToast(
      //     "This postal code is not serviceable in our delivery network",
      //     "error"
      //   );
      // }

      setPostalCodeValidation(result);

  if (result.isValid) {
    showToast(
      `✅ Postal code valid for ${result.deliveryInfo.city}, ${result.deliveryInfo.district}`,
      "success"
    );
  } else {
    showToast(result.error, "error");
  }
// } catch (error) {
//   setPostalCodeValidation({
//     isValidating: false,
//     isValid: false,
//     error: error.message || "Unable to validate postal code",
//     deliveryInfo: null,
//   });
//   showToast(error.message || "Unable to validate postal code", "error");

// }
   } catch (error) {
      let errorMessage = "Unable to validate postal code";
      if (error.code === "ECONNABORTED") {
        errorMessage = "Validation timeout - please try again";
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication failed - please contact support";
      } else if (error.response?.status === 403) {
        errorMessage = "Access denied - please contact support";
      } else if (error.response?.status === 404) {
        errorMessage = "Postal code not found";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests - please wait and try again";
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
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData.postalCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone number - only allow digits and limit to 10
    if (name === "phone") {
      // Allow only digits and limit to 10 characters
      const cleanValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({
        ...formData,
        [name]: cleanValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear validation state when user starts typing
    if (fieldValidation[name]) {
      setFieldValidation((prev) => ({
        ...prev,
        [name]: { isValid: null, error: null },
      }));
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      // Validate all required fields
      const requiredFields = ["fullName", "email", "phone"];
      const validationErrors = [];

      // Check if fields are filled
      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        validationErrors.push(`Please fill in: ${missingFields.join(", ")}`);
      }

      // Check field validations
      requiredFields.forEach((field) => {
        if (formData[field]) {
          validateField(field, formData[field]);
        }
      });
       

      // Wait a bit for validation to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check if any field validation failed
      const hasValidationErrors = requiredFields.some(
        (field) => fieldValidation[field]?.isValid === false
      );

      if (hasValidationErrors) {
        const errorMessages = requiredFields
          .filter((field) => fieldValidation[field]?.isValid === false)
          .map((field) => fieldValidation[field]?.error)
          .filter(Boolean);

        validationErrors.push(...errorMessages);
      }

      if (validationErrors.length > 0) {
        showToast(validationErrors[0], "error");
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

      // Generate unique IDs (keeping your existing logic)
      const generateOrderId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `ORDER_${timestamp}_${random}`.toUpperCase();
      };

      const generateTransactionId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `TXN_${timestamp}_${random}`.toUpperCase();
      };

      const generateSessionId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `SESSION_${timestamp}_${random}`.toUpperCase();
      };

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

      // Format phone number for storage (without +91)
      const formattedPhone = formatPhoneNumber(formData.phone);

      // Complete checkout data with clean phone number
      const checkoutData = {
        // Form data with clean phone number (no +91)
        ...formData,
        phone: formattedPhone, // This will be just the 10 digits

        // Generated IDs
        orderId: orderId,
        transactionId: transactionId,
        sessionId: sessionId,
        fingerprint: fingerprint,

        // Order details
        deliveryInfo: postalCodeValidation.deliveryInfo,
        shippingMethod,
        orderTotal: total,
        orderSubtotal: subtotal,
        orderShipping: shipping,
        orderItems: cart,

        // Timestamps
        checkoutCompletedAt: new Date().toISOString(),

        // Additional metadata
        userAgent:
          typeof window !== "undefined" ? window.navigator.userAgent : "",
        browserInfo: {
          language: typeof navigator !== "undefined" ? navigator.language : "",
          platform: typeof navigator !== "undefined" ? navigator.platform : "",
        },

        // Validation status
        validationStatus: {
          email: fieldValidation.email?.isValid === true,
          phone: fieldValidation.phone?.isValid === true,
          fullName: fieldValidation.fullName?.isValid === true,
          postalCode: postalCodeValidation.isValid === true,
        },
      };

      // console.log(
      //   "💾 Saving validated checkout data to localStorage:",
      //   checkoutData
      // );

      // Save to localStorage
      try {
        localStorage.setItem("checkoutFormData", JSON.stringify(checkoutData));
        // console.log("✅ Checkout data saved to localStorage successfully");

        // Verify the data was saved correctly
        const savedData = localStorage.getItem("checkoutFormData");
        if (savedData) {
          const parsedSavedData = JSON.parse(savedData);
          // console.log("✅ Verified saved data:", parsedSavedData);
        }
      } catch (error) {
        console.error("❌ Error saving checkout data:", error);
        showToast("Error saving checkout data. Please try again.", "error");
        setIsProcessing(false);
        return;
      }

      showToast(
        "Information validated! Redirecting to payment...",
        "success"
      );

      // Add a small delay to ensure localStorage is written
      setTimeout(() => {
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
    if (item.images && Array.isArray(item.images)) {
      if (item.images.length > 0 && Array.isArray(item.images[0])) {
        return item.images[0][0];
      }
    }
    if (item.image && Array.isArray(item.image)) {
      return item.image[0][0];
    }
    return null;
  };

  const shippingOptions = {
    standard: {
      price: 0,
      days: "3-5 business days",
      icon: "📦",
      name: "Free Shipping",
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
    if (shippingMethod === "free" && !isFreeShippingEligible) {
      setShippingMethod("standard");
    }
  }, [isFreeShippingEligible, shippingMethod]);

  // Calculate shipping cost based on eligibility and ODA
  let shipping = shippingOptions[shippingMethod]?.price || 0;
  if (isFreeShippingEligible && shippingMethod === "free") {
    shipping = 0;
  }

  const odaSurcharge = postalCodeValidation.deliveryInfo?.isODA ? 50 : 0;
  shipping += odaSurcharge;

  const total = subtotal + shipping;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

  // Redirect if cart is empty
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

        {/* 🔧 API STATUS INDICATOR */}
        {/* {!ENABLE_PINCODE_API && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800 font-medium">
                📍 Pincode API is currently disabled - using default validation
              </span>
            </div>
          </div>
        )} */}

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
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full border-2 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 pr-12 ${
                        fieldValidation.fullName?.isValid === true
                          ? "border-green-500 focus:border-green-500"
                          : fieldValidation.fullName?.isValid === false
                          ? "border-red-500 focus:border-red-500"
                          : "border-red-200 focus:border-red-900"
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                    {/* Validation Icon */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {fieldValidation.fullName?.isValid === true && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {fieldValidation.fullName?.isValid === false && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  {/* Error Message */}
                  {fieldValidation.fullName?.error && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {fieldValidation.fullName.error}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full border-2 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 pr-12 ${
                        fieldValidation.email?.isValid === true
                          ? "border-green-500 focus:border-green-500"
                          : fieldValidation.email?.isValid === false
                          ? "border-red-500 focus:border-red-500"
                          : "border-red-200 focus:border-red-900"
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                    {/* Validation Icon */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {fieldValidation.email?.isValid === true && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {fieldValidation.email?.isValid === false && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  {/* Error Message */}
                  {fieldValidation.email?.error && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {fieldValidation.email.error}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    {/* Country Code Prefix */}
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium bg-gray-100 px-2 py-1 rounded text-sm border-r border-gray-300">
                      +91
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full border-2 rounded-xl p-4 pl-16 text-gray-700 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 pr-12 ${
                        fieldValidation.phone?.isValid === true
                          ? "border-green-500 focus:border-green-500"
                          : fieldValidation.phone?.isValid === false
                          ? "border-red-500 focus:border-red-500"
                          : "border-red-200 focus:border-red-900"
                      }`}
                      placeholder="9876543210"
                      maxLength="10"
                      pattern="[6-9][0-9]{9}"
                      inputMode="numeric"
                      required
                    />
                    {/* Validation Icon */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {fieldValidation.phone?.isValid === true && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {fieldValidation.phone?.isValid === false && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  {/* Error Message */}
                  {fieldValidation.phone?.error && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {fieldValidation.phone.error}
                    </p>
                  )}
                  {/* Helper text for phone format */}
                  {!fieldValidation.phone?.error &&
                    formData.phone &&
                    fieldValidation.phone?.isValid !== true && (
                      <p className="mt-1 text-xs text-gray-500">
                        Enter 10-digit mobile number starting with 6, 7, 8, or 9
                      </p>
                    )}
                </div>

                {/* Address */}
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

                {/* City */}
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

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State/Union Territory
                  </label>
                  <CustomStateDropdown
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Postal Code */}
                <div className="md:col-span-2 col-span-1">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Postal Code
                    <span className="text-xs text-gray-500 ml-1">
                      {ENABLE_PINCODE_API ? "(Auto-validated)" : "(Default validation)"}
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
                      maxLength="6"
                      pattern="[0-9]*"
                      inputMode="numeric"
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
                          Delivery Available {!ENABLE_PINCODE_API && "(Default)"}
                        </span>
                      </div>
                      <div className="text-xs text-green-700 space-y-2">
                        {/* Badges - Responsive flex */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          {postalCodeValidation.deliveryInfo.cod && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs inline-flex items-center gap-1 w-fit">
                              COD Available
                            </span>
                          )}
                          {postalCodeValidation.deliveryInfo.isODA && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs inline-flex items-center gap-1 w-fit">
                             Remote Area (+₹50)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Postal code error */}
                  {postalCodeValidation.error && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {postalCodeValidation.error}
                    </p>
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
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
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
                        key={item.id + (item.selectedSize || "") + (item.selectedColor || "")}
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

                  {/* Delivery Info Summary */}
                  {postalCodeValidation.deliveryInfo && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-800">
                          Delivery Details {!ENABLE_PINCODE_API && "(Default)"}
                        </span>
                      </div>
                      <div className="text-xs text-red-700 space-y-1">
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
                      Cash on Delivery available
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