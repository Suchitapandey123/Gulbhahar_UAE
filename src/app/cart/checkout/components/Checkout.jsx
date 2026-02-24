// Enhanced Checkout Component with Email and Phone Validation
"use client";
import analyticsAPI from "@/app/api/analytics/analytics";
import { useToast } from "@/hooks/useToast";
import { useCart } from "@/providers/ContextProviders/CartContext";
import { fbEvent } from "@/utils/fb/metaPixels";
import { gaEvent } from "@/utils/gtm/gtag";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  CreditCard,
  Loader2,
  MapPin,
  Package,
  Search,
  Shield,
  ShoppingBag,
  User,
  ChevronRight,
  Lock,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { checkoutApi } from "../../../api/cart/cart";

const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-gray-400 mt-24 mb-8">
    <span
      className="hover:text-gray-700 transition-colors cursor-pointer"
      onClick={() => (window.location.href = "/")}
    >
      Home
    </span>
    <ChevronRight className="w-3.5 h-3.5" />
    <span
      className="hover:text-gray-700 transition-colors cursor-pointer"
      onClick={() => (window.location.href = "/cart")}
    >
      Cart
    </span>
    <ChevronRight className="w-3.5 h-3.5" />
    <span className="text-[#800000] font-medium">Checkout</span>
  </nav>
);

const CustomStateDropdown = ({
  value,
  onChange,
  className = "",
  fieldValidation,
}) => {
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
        state.label.toLowerCase().includes(searchTerm.toLowerCase()),
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
        className={`w-full border rounded-xl px-4 py-3.5 text-left focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white flex items-center justify-between ${
          fieldValidation.region?.isValid === true
            ? "border-emerald-400"
            : fieldValidation.region?.isValid === false
              ? "border-red-400"
              : "border-gray-200 hover:border-gray-300 focus:border-[#800000]"
        } ${isOpen ? "border-[#800000] ring-4 ring-[#800000]/5" : ""}`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {displayLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-hidden md:max-h-64">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-100 bg-gray-50/80 sticky top-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/5 outline-none text-sm bg-white"
                />
              </div>
            </div>

            {/* States List */}
            <div className="overflow-y-auto max-h-60 md:max-h-48">
              {filteredStates.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">
                  No states found matching &ldquo;{searchTerm}&rdquo;
                </div>
              ) : (
                <div className="py-1">
                  {filteredStates.map((state) => (
                    <button
                      key={state.value}
                      type="button"
                      onClick={() => handleStateSelect(state.value)}
                      className={`w-full text-left px-4 py-3 hover:bg-[#800000]/5 focus:bg-[#800000]/5 focus:outline-none transition-colors duration-150 flex items-center justify-between group ${
                        value === state.value
                          ? "bg-[#800000]/10 text-[#800000] font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <MapPin className="h-3.5 w-3.5 text-gray-300 group-hover:text-[#800000] transition-colors" />
                        {state.label}
                      </span>
                      {value === state.value && (
                        <CheckCircle className="h-4 w-4 text-[#800000]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer for mobile */}
            <div className="md:hidden border-t border-gray-100 p-3 bg-gray-50/80">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 bg-[#800000] text-white rounded-lg font-medium hover:bg-[#600000] transition-colors text-sm"
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

  const ENABLE_PINCODE_API = true;

  // Field validation states
  const [fieldValidation, setFieldValidation] = useState({
    email: { isValid: null, error: null },
    phone: { isValid: null, error: null },
    fullName: { isValid: null, error: null },
    region: { isValid: null, error: null },
  });

  const [postalCodeValidation, setPostalCodeValidation] = useState({
    isValidating: false,
    isValid: null,
    error: null,
    deliveryInfo: null,
  });

  const [formData, setFormData] = useState({
    country: "India",
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
    }, 500);

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

      case "region":
        if (!value || value.trim().length === 0) {
          isValid = false;
          error = "Please select a state";
        } else {
          isValid = true;
          error = null;
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

    if (!ENABLE_PINCODE_API) {
      setPostalCodeValidation((prev) => ({
        ...prev,
        isValidating: true,
        error: null,
      }));

      setTimeout(() => {
        setPostalCodeValidation({
          isValidating: false,
          isValid: true,
          error: null,
          deliveryInfo: {
            city: "Default City",
            district: "Default District",
            state: "Default State",
            cod: true,
            prepaid: true,
            pickup: true,
            covidZone: "Green",
            isODA: false,
          },
        });

        toast.success(
          `Postal code ${postalCode} - Default validation (API disabled)`,
        );
      }, 500);

      return;
    }

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
      const result = await checkoutApi.validatePostalCode(postalCode);
      setPostalCodeValidation(result);
      if (result.isValid) {
        toast.success(
          `Postal code valid for ${result.deliveryInfo.city}, ${result.deliveryInfo.district}`,
        );
      } else {
        toast.error(`${result.error}`);
      }
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

      toast.error(errorMessage);
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

    if (name === "phone") {
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

      const calculateTotals = () => {
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

        let shipping = shippingOptions[shippingMethod]?.price || 0;
        if (isFreeShippingEligible && shippingMethod === "free") {
          shipping = 0;
        }

        const odaSurcharge = postalCodeValidation.deliveryInfo?.isODA ? 50 : 0;
        shipping += odaSurcharge;

        const total = subtotal + shipping;

        return { subtotal, shipping, total };
      };

      const { subtotal, shipping, total } = calculateTotals();

      const requiredFields = ["fullName", "email", "phone", "region"];
      const validationErrors = [];

      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        validationErrors.push(`Please fill : ${missingFields.join(", ")}`);
      }

      requiredFields.forEach((field) => {
        if (formData[field]) {
          validateField(field, formData[field]);
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const hasValidationErrors = requiredFields.some(
        (field) => fieldValidation[field]?.isValid === false,
      );

      if (hasValidationErrors) {
        const errorMessages = requiredFields
          .filter((field) => fieldValidation[field]?.isValid === false)
          .map((field) => fieldValidation[field]?.error)
          .filter(Boolean);

        validationErrors.push(...errorMessages);
      }

      if (validationErrors.length > 0) {
        toast.error(validationErrors[0], "error");
        setIsProcessing(false);
        return;
      }

      if (formData.postalCode) {
        if (postalCodeValidation.isValidating) {
          toast.warning("Please wait for postal code validation to complete");
          setIsProcessing(false);
          return;
        }

        if (postalCodeValidation.isValid === false) {
          toast.error("Please enter a valid postal code for delivery");

          setIsProcessing(false);
          return;
        }
      }

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
            `${canvas.toDataURL()}_${screen}_${timezone}_${language}_${platform}`,
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

      const formattedPhone = formatPhoneNumber(formData.phone);

      const checkoutData = {
        ...formData,
        phone: formattedPhone,
        orderId: orderId,
        transactionId: transactionId,
        sessionId: sessionId,
        fingerprint: fingerprint,
        deliveryInfo: postalCodeValidation.deliveryInfo,
        shippingMethod,
        orderTotal: total,
        orderSubtotal: subtotal,
        orderShipping: shipping,
        orderItems: cart,
        checkoutCompletedAt: new Date().toISOString(),
        userAgent:
          typeof window !== "undefined" ? window.navigator.userAgent : "",
        browserInfo: {
          language: typeof navigator !== "undefined" ? navigator.language : "",
          platform: typeof navigator !== "undefined" ? navigator.platform : "",
        },
        validationStatus: {
          email: fieldValidation.email?.isValid === true,
          phone: fieldValidation.phone?.isValid === true,
          fullName: fieldValidation.fullName?.isValid === true,
          postalCode: postalCodeValidation.isValid === true,
        },
      };

      try {
        localStorage.setItem("checkoutFormData", JSON.stringify(checkoutData));
        const savedData = localStorage.getItem("checkoutFormData");
        if (savedData) {
          const parsedSavedData = JSON.parse(savedData);
        }
      } catch (error) {
        toast.error(" Error saving checkout data. Please try again.");
        setIsProcessing(false);
        return;
      }

      const userData = {
        user: {
          email: checkoutData.email,
          phoneNumber: checkoutData.phone,
          name: checkoutData.fullName,
          address: {
            streetAddress: checkoutData.address,
            city: checkoutData.city,
            state: checkoutData.region,
            pincode: checkoutData.postalCode,
          },
        },
        items: checkoutData.orderItems.map((item) => ({
          productId: item.productId,
          productName: item.name,
          color: item.selectedColor,
          size: item.selectedSize,
          quantity: item.quantity,
        })),
      };

      try {
        const res = await analyticsAPI.trackContinueToPayment(userData);
      } catch (error) {
        console.error(error);
      }

      gaEvent({
        action: "Continued To Payment",
        params: {
          Customer_Name: formData.fullName,
          Customer_Number: formData.phone,
        },
      });
      fbEvent({
        action: "ContinuedToPayment",
        params: {
          Customer_Name: formData.fullName,
          Customer_Number: formData.phone,
          Customer_Email: formData.email,
        },
      });

      toast.success("Information validated! Redirecting to payment...");
      setTimeout(() => {
        router.push(
          `/cart/checkout/payment?orderId=${orderId}&amount=${total}`,
        );
      }, 500);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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

  let shipping = shippingOptions[shippingMethod]?.price || 0;
  if (isFreeShippingEligible && shippingMethod === "free") {
    shipping = 0;
  }

  const odaSurcharge = postalCodeValidation.deliveryInfo?.isODA ? 50 : 0;
  shipping += odaSurcharge;

  const total = subtotal + shipping;

  // Helper for input border classes
  const getInputBorderClass = (fieldName) => {
    const validation = fieldValidation[fieldName];
    if (validation?.isValid === true) return "border-emerald-400 focus:border-emerald-500";
    if (validation?.isValid === false) return "border-red-400 focus:border-[#800000]";
    return "border-gray-200 hover:border-gray-300 focus:border-[#800000]";
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center mt-32">
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <div className="w-8 h-8 border-2 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
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
      <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">Add some items to get started</p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#800000] text-white px-8 py-3 rounded-xl hover:bg-[#600000] transition-all duration-300 font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Breadcrumb />

        {/* Page Header */}
        {/* <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#800000]">Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your order details below</p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-7 space-y-6">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-[#800000] rounded-xl flex items-center justify-center">
                  <User className="text-white h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Shipping Address
                  </h3>
                  <p className="text-sm text-gray-400">
                   🇮🇳 Delivering within India
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white pr-11 placeholder:text-gray-400 ${getInputBorderClass("fullName")}`}
                      placeholder="Enter your full name"
                      required
                    />
                    <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                      {fieldValidation.fullName?.isValid === true && (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      )}
                      {fieldValidation.fullName?.isValid === false && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  {fieldValidation.fullName?.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {fieldValidation.fullName.error}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white pr-11 placeholder:text-gray-400 ${getInputBorderClass("email")}`}
                      placeholder="you@example.com"
                      required
                    />
                    <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                      {fieldValidation.email?.isValid === true && (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      )}
                      {fieldValidation.email?.isValid === false && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  {fieldValidation.email?.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {fieldValidation.email.error}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 flex items-center gap-1.5">
                      <span className="text-gray-500 text-sm font-medium border-r border-gray-200 pr-2">
                        +91
                      </span>
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl pl-16 pr-11 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white placeholder:text-gray-400 ${getInputBorderClass("phone")}`}
                      placeholder="9876543210"
                      maxLength="10"
                      pattern="[6-9][0-9]{9}"
                      inputMode="numeric"
                      required
                    />
                    <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                      {fieldValidation.phone?.isValid === true && (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      )}
                      {fieldValidation.phone?.isValid === false && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  {fieldValidation.phone?.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {fieldValidation.phone.error}
                    </p>
                  )}
                  {!fieldValidation.phone?.error &&
                    formData.phone &&
                    fieldValidation.phone?.isValid !== true && (
                      <p className="mt-1.5 text-xs text-gray-400">
                        Enter 10-digit mobile number starting with 6, 7, 8, or 9
                      </p>
                    )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Street Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder:text-gray-400"
                    placeholder="House number and street name"
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder:text-gray-400"
                    placeholder="City"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    State / Union Territory
                  </label>
                  <CustomStateDropdown
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full"
                    fieldValidation={fieldValidation}
                  />
                  {fieldValidation.region?.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {fieldValidation.region.error}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="md:col-span-2 col-span-1">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Postal Code
                    <span className="text-xs text-gray-400 ml-1.5">
                      {ENABLE_PINCODE_API
                        ? "(Auto-validated)"
                        : "(Default validation)"}
                    </span>
                  </label>

                  <div className="relative mb-3">
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white pr-11 placeholder:text-gray-400 ${
                        postalCodeValidation.isValid === true
                          ? "border-emerald-400 focus:border-emerald-500"
                          : postalCodeValidation.isValid === false
                            ? "border-red-400 focus:border-[#800000]"
                            : "border-gray-200 hover:border-gray-300 focus:border-[#800000]"
                      }`}
                      placeholder="110001"
                      maxLength="6"
                      pattern="[0-9]*"
                      inputMode="numeric"
                    />

                    <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                      {postalCodeValidation.isValidating && (
                        <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                      )}
                      {postalCodeValidation.isValid === true && (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      )}
                      {postalCodeValidation.isValid === false && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  {postalCodeValidation.deliveryInfo && (
                    <div className="mb-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-xs font-semibold text-emerald-800">
                          Delivery Available{" "}
                          {!ENABLE_PINCODE_API && "(Default)"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {postalCodeValidation.deliveryInfo.cod && (
                          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                            COD Available
                          </span>
                        )}
                        {postalCodeValidation.deliveryInfo.isODA && (
                          <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                            Remote Area (+₹50)
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {postalCodeValidation.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {postalCodeValidation.error}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Method Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-[#800000] rounded-xl flex items-center justify-center">
                  <Truck className="text-white h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Shipping Method
                  </h3>
                  <p className="text-sm text-gray-400">
                    Choose your preferred delivery speed
                  </p>
                </div>
              </div>

              <div className="space-y-3">
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
                        className={`flex items-center p-4 border rounded-xl transition-all duration-200 ${
                          isDisabled
                            ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
                            : shippingMethod === key
                              ? "border-[#800000]/20 bg-[#800000]/5 ring-2 ring-[#800000]/10 cursor-pointer"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 cursor-pointer"
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
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-[#800000] focus:ring-[#800000] cursor-pointer"
                          }`}
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className={`text-xl ${isDisabled ? "opacity-50" : ""}`}>
                                {icon}
                              </span>
                              <div>
                                <p className={`font-semibold text-sm ${isDisabled ? "text-gray-400" : "text-gray-900"}`}>
                                  {name}
                                  {isDisabled && (
                                    <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                                      Min. ₹5000
                                    </span>
                                  )}
                                </p>
                                <p className={`text-xs mt-0.5 ${isDisabled ? "text-gray-300" : "text-gray-500"}`}>
                                  {days}
                                </p>
                                {isFreeShippingEligible &&
                                  isFreeShippingOption && (
                                    <p className="text-xs text-emerald-600 font-medium mt-1">
                                      Free upgrade on prepaid orders above ₹5000
                                    </p>
                                  )}
                                {postalCodeValidation.deliveryInfo?.isODA &&
                                  !isDisabled && (
                                    <p className="text-xs text-amber-600 font-medium mt-1">
                                      +₹50 Remote area surcharge
                                    </p>
                                  )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`font-bold ${isDisabled ? "text-gray-300" : "text-gray-900"}`}>
                                {isDisabled
                                  ? `₹${price}`
                                  : finalPrice === 0
                                    ? "FREE"
                                    : `₹${finalPrice}`}
                              </span>
                              {isFreeShippingEligible &&
                                isFreeShippingOption &&
                                !postalCodeValidation.deliveryInfo?.isODA && (
                                  <p className="text-xs text-gray-400 line-through">
                                    ₹{price}
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 lg:sticky lg:top-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-[#800000] rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-white h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Order Summary
                  </h2>
                  <p className="text-xs text-gray-400">
                    {cart?.length || 0} item{cart?.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Cart Items */}
                {cart &&
                  cart.length > 0 &&
                  cart.map((item) => {
                    if (!item || !item.id) return null;

                    return (
                      <div
                        key={
                          item.id +
                          (item.selectedSize || "") +
                          (item.selectedColor || "")
                        }
                        className="bg-gray-50/80 rounded-xl p-3.5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                            <Image
                              src={getCurrentImage(item) || "/placeholder.jpg"}
                              alt={item.name || "Product"}
                              width={200}
                              height={200}
                              priority
                              className="w-full object-cover scale-y-[1.15] h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-gray-900 truncate">
                              {item.name || "Product"}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                              {item.selectedColor && (
                                <span className="bg-white text-gray-600 px-2 py-0.5 rounded-md text-xs font-medium border border-gray-100">
                                  {item.selectedColor}
                                </span>
                              )}
                              {item.selectedSize && (
                                <span className="bg-white text-gray-600 px-2 py-0.5 rounded-md text-xs font-medium border border-gray-100">
                                  {item.selectedSize}
                                </span>
                              )}
                              <span className="text-xs text-gray-400">
                                Qty: {item.quantity || 1}
                              </span>
                            </div>
                          </div>
                          <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                            ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                {/* Divider */}
                <div className="border-t border-gray-100 my-1"></div>

                {/* Delivery Info Summary */}
                {postalCodeValidation.deliveryInfo && (
                  <div className="bg-gray-50 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-700">
                        Delivery Details {!ENABLE_PINCODE_API && "(Default)"}
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {postalCodeValidation.deliveryInfo.cod && (
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-xs font-medium">
                          COD Available
                        </span>
                      )}
                      {postalCodeValidation.deliveryInfo.isODA && (
                        <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs font-medium">
                          Remote Area
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Summary Numbers */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <div className="text-right">
                      <span className={`font-semibold ${shipping === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                        {shipping === 0
                          ? "FREE"
                          : `₹${shipping.toLocaleString()}`}
                      </span>
                      {isFreeShippingEligible &&
                        shippingMethod === "free" &&
                        shippingOptions[shippingMethod]?.price > 0 &&
                        !postalCodeValidation.deliveryInfo?.isODA && (
                          <p className="text-xs text-gray-400 line-through">
                            ₹{shippingOptions[shippingMethod].price}
                          </p>
                        )}
                    </div>
                  </div>

                  {odaSurcharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-600">Remote Surcharge</span>
                      <span className="font-semibold text-amber-600">
                        ₹{odaSurcharge}
                      </span>
                    </div>
                  )}

                  {/* Total */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-[#800000]">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={postalCodeValidation.isValidating || isProcessing}
                  className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2.5 mt-2 ${
                    postalCodeValidation.isValidating || isProcessing
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#800000] text-white hover:bg-[#600000] shadow-lg shadow-[#800000]/10 hover:shadow-xl hover:shadow-[#800000]/20 hover:-translate-y-0.5"
                  }`}
                >
                  {postalCodeValidation.isValidating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Validating...
                    </>
                  ) : isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Continue to Payment
                    </>
                  )}
                </button>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-4 pt-3 pb-1">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Lock className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Secure checkout</span>
                  </div>
                  <div className="w-px h-3 bg-gray-200"></div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Shield className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Encrypted</span>
                  </div>
                  {postalCodeValidation.deliveryInfo?.cod && (
                    <>
                      <div className="w-px h-3 bg-gray-200"></div>
                      <span className="text-xs font-medium text-emerald-500">COD Available</span>
                    </>
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
