// @ts-nocheck
"use client";
import { formatAED, formatAEDShort } from "@/utils/currency";
import analyticsAPI from "@/services/analytics/analyticsService";
import { trackVisitorEvent } from "@/services/analytics/journeyService";
import { useToast } from "@/hooks/useToast";
import { fbEvent } from "@/utils/fb/metaPixels";
import { gaEvent } from "@/utils/gtm/gtag";
import { cartService as checkoutApi } from "@/services/cart/cartService";
import { getProductImagesForColor } from "@/utils/productImageUtils";
import { API_BASE_URL } from "@/utils/envHere";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  CreditCard,
  Loader2,
  MapPin,
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

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface ParsedProduct {
  productId: string;
  quantity: number;
}

interface AdCartItem {
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  availableColors: { name: string; hexcode: string }[];
  availableSizes: string[];
  image: string;
  images: any[];
}

/* ------------------------------------------------------------------ */
/* Helpers shared with Checkout.tsx */
/* ------------------------------------------------------------------ */

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// UAE phone validation — accepts 05XXXXXXXX, 5XXXXXXXX, +9715XXXXXXXX or 9715XXXXXXXX
const normalizeUAEDigits = (phone: string) => {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00971")) digits = digits.slice(4);
  else if (digits.startsWith("971")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits;
};

const validatePhone = (phone: string) => {
  // UAE mobile numbers are 9 digits starting with 5 (e.g. 5X XXX XXXX)
  const digits = normalizeUAEDigits(phone);
  return digits.length === 9 && /^5\d{8}$/.test(digits);
};

const formatPhoneNumber = (phone: string) => {
  const digits = normalizeUAEDigits(phone);
  // Store canonical international form: +9715XXXXXXXX
  return digits.length === 9 && /^5\d{8}$/.test(digits) ? `+971${digits}` : phone;
};

// UAE Emirates
const uaeEmirates = [
  { value: "abu-dhabi", label: "Abu Dhabi" },
  { value: "dubai", label: "Dubai" },
  { value: "sharjah", label: "Sharjah" },
  { value: "ajman", label: "Ajman" },
  { value: "umm-al-quwain", label: "Umm Al Quwain" },
  { value: "ras-al-khaimah", label: "Ras Al Khaimah" },
  { value: "fujairah", label: "Fujairah" },
];

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-gray-400 mt-28 sm:mt-32 lg:mt-36 mb-8">
    <span className="hover:text-gray-700 transition-colors cursor-pointer" onClick={() => (window.location.href = "/")}>
      Home
    </span>
    <ChevronRight className="w-3.5 h-3.5" />
    <span className="text-[#800000] font-medium">Checkout</span>
  </nav>
);

const CustomEmirateDropdown = ({ value, onChange, className = "", fieldValidation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStates, setFilteredStates] = useState(uaeEmirates);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const selectedState = uaeEmirates.find((s) => s.value === value);
  const displayLabel = selectedState ? selectedState.label : "Select Emirate";

  useEffect(() => {
    setFilteredStates(
      searchTerm
        ? uaeEmirates.filter((s) => s.label.toLowerCase().includes(searchTerm.toLowerCase()))
        : uaeEmirates
    );
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
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
        <span className={value ? "text-gray-900" : "text-gray-400"}>{displayLabel}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-hidden md:max-h-64">
            <div className="p-3 border-b border-gray-100 bg-gray-50/80 sticky top-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search Emirates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/5 outline-none text-sm bg-white"
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-60 md:max-h-48">
              {filteredStates.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">No Emirates found</div>
              ) : (
                <div className="py-1">
                  {filteredStates.map((state) => (
                    <button
                      key={state.value}
                      type="button"
                      onClick={() => {
                        onChange({ target: { name: "region", value: state.value } });
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-[#800000]/5 focus:outline-none transition-colors duration-150 flex items-center justify-between group ${
                        value === state.value ? "bg-[#800000]/10 text-[#800000] font-medium" : "text-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <MapPin className="h-3.5 w-3.5 text-gray-300 group-hover:text-[#800000] transition-colors" />
                        {state.label}
                      </span>
                      {value === state.value && <CheckCircle className="h-4 w-4 text-[#800000]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
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

/* ------------------------------------------------------------------ */
/* Color/Size selector */
/* ------------------------------------------------------------------ */

const ProductSelector = ({
  item,
  onColorChange,
  onSizeChange,
}: {
  item: any;
  onColorChange: (productId: string, color: string) => void;
  onSizeChange: (productId: string, size: string) => void;
}) => {
  const hasColors = item.availableColors?.length > 0;
  const hasSizes = item.availableSizes?.length > 0;
  if (!hasColors && !hasSizes) return null;

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-gray-200 space-y-5">
      {hasColors && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Color</span>
            {item.selectedColor
              ? <span className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full bg-[#800000]/10 text-[#800000]">{item.selectedColor}</span>
              : <span className="text-xs text-amber-500 font-medium animate-pulse">← Select one</span>}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {item.availableColors.map((color) => {
              const selected = item.selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => onColorChange(item.productId, color.name)}
                  className={`relative flex items-center gap-2 pl-2 pr-3.5 py-2 rounded-full text-xs font-medium capitalize transition-all duration-200 border-2 ${
                    selected
                      ? "border-[#800000] bg-[#800000] text-white shadow-lg shadow-[#800000]/20"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#800000]/40 hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex-shrink-0 shadow-inner ${selected ? "ring-2 ring-white ring-offset-1 ring-offset-[#800000]" : "ring-1 ring-gray-200"}`}
                    style={{ backgroundColor: color.hexcode || "#ccc" }}
                  />
                  {color.name}
                  {selected && <CheckCircle className="w-3 h-3 ml-0.5 opacity-80" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasSizes && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Size</span>
            {item.selectedSize
              ? <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#800000]/10 text-[#800000]">{item.selectedSize}</span>
              : <span className="text-xs text-amber-500 font-medium animate-pulse">← Select one</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {item.availableSizes.map((size) => {
              const selected = item.selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSizeChange(item.productId, size)}
                  className={`min-w-[44px] h-10 px-3.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                    selected
                      ? "border-[#800000] bg-[#800000] text-white shadow-lg shadow-[#800000]/20 scale-105"
                      : "border-gray-200 bg-white text-gray-800 hover:border-[#800000]/50 hover:bg-gray-50"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main component */
/* ------------------------------------------------------------------ */

export default function MetaCheckoutComponent({
  productsParam,
  source,
}: {
  productsParam: string;
  source: string;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [items, setItems] = useState<AdCartItem[]>([]);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);

  const ENABLE_PINCODE_API = false;

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
    country: "UAE",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
  });

  /* ---------- Parse URL and fetch products ---------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // "PROD001:2,PROD002:1"
        const parsed: ParsedProduct[] = productsParam
          .split(",")
          .map((chunk) => {
            const [productId, qtyStr] = chunk.trim().split(":");
            return { productId: productId?.trim(), quantity: parseInt(qtyStr || "1", 10) || 1 };
          })
          .filter((p) => p.productId);

        if (parsed.length === 0) {
          setFetchError("No valid products found in URL.");
          setIsLoading(false);
          return;
        }

        const results = await Promise.all(
          parsed.map(async ({ productId, quantity }) => {
            const res = await fetch(`${API_BASE_URL}/new-api/products/get-product-by-id`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify({ productId }),
            });
            if (!res.ok) return { product: null, quantity };
            const data = await res.json();
            console.log("[AdCheckout] raw API response for", productId, data);
            // API returns product directly, or wrapped in data/products
            const product = data?.productId
              ? data
              : data?.data && !Array.isArray(data.data) && data.data?.productId
                ? data.data
                : data?.products?.[0] ?? null;
            return { product, quantity };
          })
        );

        const cartItems: AdCartItem[] = results
          .filter(({ product }) => product !== null)
          .map(({ product, quantity }) => {
            const sizes =
              product.totalSizes?.length > 0
                ? product.totalSizes
                : product.availableSizes?.map((s: any) => s.name) ?? [];

            const firstImage = (() => {
              try {
                const imgs = getProductImagesForColor(product.productId, product.images, 0, "cards");
                return imgs[0]?.url || "/about/lal-ishq-1.jpg";
              } catch {
                return "/about/lal-ishq-1.jpg";
              }
            })();

            return {
              productId: product.productId,
              name: product.name || product.title || "Product",
              price: product.price,
              originalPrice: product.originalPrice,
              quantity,
              selectedColor: "",
              selectedSize: sizes.length === 1 ? sizes[0] : "",
              availableColors: product.availableColors ?? [],
              availableSizes: sizes,
              image: firstImage,
              images: product.images ?? [],
            };
          });

        if (cartItems.length === 0) {
          setFetchError("Could not load product details. Please try again.");
        } else {
          setItems(cartItems);
        }
      } catch (err) {
        setFetchError("Failed to load products. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productsParam]);

  /* ---------- Color / Size handlers ---------- */
  const handleColorChange = (productId: string, color: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId !== productId) return item;
        return { ...item, selectedColor: color };
      })
    );
  };

  const handleSizeChange = (productId: string, size: string) => {
    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, selectedSize: size } : item))
    );
  };

  /* ---------- Validation ---------- */
  const validateField = (name: string, value: string) => {
    let isValid = null;
    let error = null;

    switch (name) {
      case "fullName":
        if (!value.trim()) { isValid = false; error = "Full name is required"; }
        else if (value.trim().length < 2) { isValid = false; error = "Name must be at least 2 characters"; }
        else if (!/^[a-zA-Z\s]+$/.test(value.trim())) { isValid = false; error = "Name can only contain letters and spaces"; }
        else { isValid = true; }
        break;
      case "email":
        if (!value.trim()) { isValid = false; error = "Email is required"; }
        else if (!validateEmail(value)) { isValid = false; error = "Please enter a valid email address"; }
        else { isValid = true; }
        break;
      case "phone":
        if (!value.trim()) { isValid = false; error = "Phone number is required"; }
        else {
          const clean = value.replace(/\D/g, "");
          if (clean.length < 9) { isValid = false; error = "Phone number must be at least 9 digits"; }
          else if (clean.length > 10) { isValid = false; error = "Phone number must be at most 10 digits"; }
          else if (!validatePhone(value)) { isValid = false; error = "Enter a valid UAE mobile number (e.g. 05X XXX XXXX)"; }
          else { isValid = true; }
        }
        break;
      case "region":
        isValid = !!value?.trim();
        error = isValid ? null : "Please select an emirate";
        break;
      default:
        return;
    }

    setFieldValidation((prev) => ({ ...prev, [name]: { isValid, error } }));
  };

  useEffect(() => {
    const t = setTimeout(() => { if (formData.fullName) validateField("fullName", formData.fullName); }, 500);
    return () => clearTimeout(t);
  }, [formData.fullName]);

  useEffect(() => {
    const t = setTimeout(() => { if (formData.email) validateField("email", formData.email); }, 500);
    return () => clearTimeout(t);
  }, [formData.email]);

  useEffect(() => {
    const t = setTimeout(() => { if (formData.phone) validateField("phone", formData.phone); }, 500);
    return () => clearTimeout(t);
  }, [formData.phone]);

  /* ---------- Postal code ---------- */
  const validatePostalCode = async (postalCode: string) => {
    if (!postalCode || postalCode.length < 5) {
      setPostalCodeValidation({ isValidating: false, isValid: null, error: null, deliveryInfo: null });
      return;
    }

    if (!ENABLE_PINCODE_API) {
      setPostalCodeValidation((prev) => ({ ...prev, isValidating: true, error: null }));
      setTimeout(() => {
        setPostalCodeValidation({
          isValidating: false, isValid: true, error: null,
          deliveryInfo: { city: "Default City", district: "Default District", state: "UAE", cod: true, prepaid: true, pickup: true, isODA: false },
        });
      }, 500);
      return;
    }

    setPostalCodeValidation((prev) => ({ ...prev, isValidating: true, error: null }));
    try {
      const result = await checkoutApi.validatePostalCode(postalCode);
      setPostalCodeValidation(result);
      if (result.isValid) {
        toast.success(`Postal code valid for ${result.deliveryInfo.city}, ${result.deliveryInfo.district}`);
      } else {
        toast.error(`${result.error}`);
      }
    } catch (error: any) {
      let msg = "Unable to validate postal code";
      if (error.code === "ECONNABORTED") msg = "Validation timeout - please try again";
      else if (error.response?.status === 404) msg = "Postal code not found";
      setPostalCodeValidation({ isValidating: false, isValid: false, error: msg, deliveryInfo: null });
      toast.error(msg);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => { if (formData.postalCode) validatePostalCode(formData.postalCode); }, 1000);
    return () => clearTimeout(t);
  }, [formData.postalCode]);

  /* ---------- Input change ---------- */
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const newValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (fieldValidation[name]) {
      setFieldValidation((prev) => ({ ...prev, [name]: { isValid: null, error: null } }));
    }
  };

  /* ---------- Totals ---------- */
  const shippingOptions = {
    standard: { price: 0, days: "3-5 business days", icon: "📦", name: "Free Shipping" },
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShippingEligible = subtotal >= 5000;
  const odaSurcharge = postalCodeValidation.deliveryInfo?.isODA ? 50 : 0;
  const shipping = odaSurcharge;
  const total = subtotal + shipping;

  /* ---------- All variants selected ---------- */
  const allVariantsSelected = items.every(
    (item) =>
      (item.availableColors.length === 0 || item.selectedColor) &&
      (item.availableSizes.length === 0 || item.selectedSize)
  );

  /* ---------- Payment ---------- */
  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      if (!allVariantsSelected) {
        toast.error("Please select color and size for all products");
        setIsProcessing(false);
        return;
      }

      const requiredFields = ["fullName", "email", "phone", "region"];
      const missingFields = requiredFields.filter((f) => !formData[f]);
      if (missingFields.length > 0) {
        toast.error(`Please fill: ${missingFields.join(", ")}`);
        setIsProcessing(false);
        return;
      }

      requiredFields.forEach((f) => { if (formData[f]) validateField(f, formData[f]); });
      await new Promise((r) => setTimeout(r, 100));

      const hasErrors = requiredFields.some((f) => fieldValidation[f]?.isValid === false);
      if (hasErrors) {
        const msg = requiredFields.map((f) => fieldValidation[f]?.error).filter(Boolean)[0];
        toast.error(msg || "Please fix validation errors");
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

      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
      const sessionId = `SESSION_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`.toUpperCase();

      const formattedPhone = formatPhoneNumber(formData.phone);

      const checkoutData = {
        ...formData,
        phone: formattedPhone,
        orderId,
        transactionId,
        sessionId,
        source,
        deliveryInfo: postalCodeValidation.deliveryInfo,
        shippingMethod,
        orderTotal: total,
        orderSubtotal: subtotal,
        orderShipping: shipping,
        orderItems: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          image: item.image,
        })),
        checkoutCompletedAt: new Date().toISOString(),
        checkoutType: "meta-direct",
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
      };

      try {
        const serialized = JSON.stringify(checkoutData);
        localStorage.setItem("checkoutFormData", serialized);
        localStorage.setItem(`checkoutData_${orderId}`, serialized);
      } catch {
        toast.error("Error saving checkout data. Please try again.");
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
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.name,
          color: item.selectedColor,
          size: item.selectedSize,
          quantity: item.quantity,
        })),
      };

      try {
        await analyticsAPI.trackContinueToPayment(userData);
      } catch {}

      trackVisitorEvent("CHECKOUT_FORM_FILLED", userData);

      gaEvent({ action: "Continued To Payment", params: { Customer_Name: formData.fullName, Customer_Number: formData.phone, Source: source } });
      fbEvent({ action: "ContinuedToPayment", params: { Customer_Name: formData.fullName, Customer_Number: formData.phone, Customer_Email: formData.email, Source: source } });

      toast.success("Information validated! Redirecting to payment...");
      setTimeout(() => {
        router.push(`/cart/checkout/payment?orderId=${orderId}&amount=${total}&source=meta`);
      }, 500);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  /* ---------- Input border helper ---------- */
  const getInputBorderClass = (fieldName: string) => {
    const v = fieldValidation[fieldName];
    if (v?.isValid === true) return "border-emerald-400 focus:border-emerald-500";
    if (v?.isValid === false) return "border-red-400 focus:border-[#800000]";
    return "border-gray-200 hover:border-gray-300 focus:border-[#800000]";
  };

  /* ------------------------------------------------------------------ */
  /* Render states */
  /* ------------------------------------------------------------------ */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center mt-32">
          <div className="flex flex-col items-center gap-3 text-gray-500">
            <div className="w-8 h-8 border-2 border-[#800000] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading checkout...</span>
          </div>
        </div>
      </div>
    );
  }

  if (fetchError || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Products not found</h2>
          <p className="text-gray-500 mb-6">{fetchError || "Unable to load the products."}</p>
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

  /* ------------------------------------------------------------------ */
  /* Main layout — mirrors Checkout.tsx exactly */
  /* ------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Breadcrumb />

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
                  <h3 className="text-lg font-bold text-gray-900">Shipping Address</h3>
                  <p className="text-sm text-gray-400">🇦🇪 Delivering across the UAE</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="fullName" name="fullName" type="text"
                      value={formData.fullName} onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white pr-11 placeholder:text-gray-400 ${getInputBorderClass("fullName")}`}
                      placeholder="Enter your full name" required
                    />
                    <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                      {fieldValidation.fullName?.isValid === true && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                      {fieldValidation.fullName?.isValid === false && <AlertCircle className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                  {fieldValidation.fullName?.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />{fieldValidation.fullName.error}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email" name="email" type="email"
                      value={formData.email} onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white pr-11 placeholder:text-gray-400 ${getInputBorderClass("email")}`}
                      placeholder="you@example.com" required
                    />
                    <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                      {fieldValidation.email?.isValid === true && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                      {fieldValidation.email?.isValid === false && <AlertCircle className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                  {fieldValidation.email?.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />{fieldValidation.email.error}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 flex items-center gap-1.5">
                      <span className="text-gray-500 text-sm font-medium border-r border-gray-200 pr-2">+971</span>
                    </div>
                    <input
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleInputChange}
                      className={`w-full border rounded-xl pl-16 pr-11 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white placeholder:text-gray-400 ${getInputBorderClass("phone")}`}
                      placeholder="5X XXX XXX" maxLength={10} inputMode="numeric" required
                    />
                    <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                      {fieldValidation.phone?.isValid === true && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                      {fieldValidation.phone?.isValid === false && <AlertCircle className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                  {fieldValidation.phone?.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />{fieldValidation.phone.error}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
                  <input
                    id="address" name="address" type="text"
                    value={formData.address} onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder:text-gray-400"
                    placeholder="House number and street name"
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <input
                    id="city" name="city" type="text"
                    value={formData.city} onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 placeholder:text-gray-400"
                    placeholder="City"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Emirate <span className="text-red-500">*</span></label>
                  <CustomEmirateDropdown
                    value={formData.region} onChange={handleInputChange}
                    className="w-full" fieldValidation={fieldValidation}
                  />
                  {fieldValidation.region?.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />{fieldValidation.region.error}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="md:col-span-2">
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Postal Code
                    <span className="text-xs text-gray-400 ml-1.5">(5-digit code)</span>
                  </label>
                  <div className="relative mb-3">
                    <input
                      id="postalCode" name="postalCode" type="text"
                      value={formData.postalCode} onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#800000]/5 transition-all duration-200 bg-gray-50/50 hover:bg-white pr-11 placeholder:text-gray-400 ${
                        postalCodeValidation.isValid === true ? "border-emerald-400 focus:border-emerald-500"
                          : postalCodeValidation.isValid === false ? "border-red-400 focus:border-[#800000]"
                          : "border-gray-200 hover:border-gray-300 focus:border-[#800000]"
                      }`}
                      placeholder="12345" maxLength={5} inputMode="numeric"
                    />
                    <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                      {postalCodeValidation.isValidating && <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />}
                      {postalCodeValidation.isValid === true && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                      {postalCodeValidation.isValid === false && <AlertCircle className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>

                  {postalCodeValidation.deliveryInfo && (
                    <div className="mb-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-xs font-semibold text-emerald-800">Delivery Available</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {postalCodeValidation.deliveryInfo.cod && (
                          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-medium">COD Available</span>
                        )}
                        {postalCodeValidation.deliveryInfo.isODA && (
                          <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-medium">Remote Area (+AED 2)</span>
                        )}
                      </div>
                    </div>
                  )}

                  {postalCodeValidation.error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />{postalCodeValidation.error}
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
                  <h3 className="text-lg font-bold text-gray-900">Shipping Method</h3>
                  <p className="text-sm text-gray-400">Choose your preferred delivery speed</p>
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(shippingOptions).map(([key, { price, days, icon, name }]) => (
                  <label
                    key={key}
                    className={`flex items-center p-4 border rounded-xl transition-all duration-200 cursor-pointer ${
                      shippingMethod === key
                        ? "border-[#800000]/20 bg-[#800000]/5 ring-2 ring-[#800000]/10"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                  >
                    <input
                      type="radio" name="shipping" value={key}
                      checked={shippingMethod === key}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-4 h-4 text-[#800000] focus:ring-[#800000] focus:ring-2 cursor-pointer"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{icon}</span>
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{name}</p>
                            <p className="text-xs mt-0.5 text-gray-500">{days}</p>
                            {postalCodeValidation.deliveryInfo?.isODA && (
                              <p className="text-xs text-amber-600 font-medium mt-1">+AED 2 Remote area surcharge</p>
                            )}
                          </div>
                        </div>
                        <span className="font-bold text-gray-900">
                          {shipping === 0 && !postalCodeValidation.deliveryInfo?.isODA ? "FREE" : `${formatAEDShort(odaSurcharge)}`}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
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
                  <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                  <p className="text-xs text-gray-400">{items.length} item{items.length !== 1 ? "s" : ""}</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Cart Items with color/size selectors */}
                {items.map((item) => (
                  <div key={item.productId} className="bg-gray-50/80 rounded-xl p-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={200} height={200} priority
                          className="w-full object-cover scale-y-[1.15] h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h3>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {item.selectedColor && (
                            <span className="bg-white text-gray-600 px-2 py-0.5 rounded-md text-xs font-medium border border-gray-100">{item.selectedColor}</span>
                          )}
                          {item.selectedSize && (
                            <span className="bg-white text-gray-600 px-2 py-0.5 rounded-md text-xs font-medium border border-gray-100">{item.selectedSize}</span>
                          )}
                          <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                        {formatAED(item.price * item.quantity)}
                      </span>
                    </div>

                    <ProductSelector
                      item={item}
                      onColorChange={handleColorChange}
                      onSizeChange={handleSizeChange}
                    />
                  </div>
                ))}

                {!allVariantsSelected && (
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                    <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <p className="text-xs text-amber-700 font-medium">Please select color &amp; size for all items to continue</p>
                  </div>
                )}

                <div className="border-t border-gray-100 my-1" />

                {/* Delivery Info */}
                {postalCodeValidation.deliveryInfo && (
                  <div className="bg-gray-50 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-700">Delivery Details</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {postalCodeValidation.deliveryInfo.cod && (
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-xs font-medium">COD Available</span>
                      )}
                      {postalCodeValidation.deliveryInfo.isODA && (
                        <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs font-medium">Remote Area</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-900">{formatAED(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className={`font-semibold ${shipping === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                      {shipping === 0 ? "FREE" : `${formatAEDShort(shipping)}`}
                    </span>
                  </div>
                  {odaSurcharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-600">Remote Surcharge</span>
                      <span className="font-semibold text-amber-600">{formatAEDShort(odaSurcharge)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-[#800000]">{formatAED(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={postalCodeValidation.isValidating || isProcessing || !allVariantsSelected}
                  className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2.5 mt-2 ${
                    postalCodeValidation.isValidating || isProcessing || !allVariantsSelected
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#800000] text-white hover:bg-[#600000] shadow-lg shadow-[#800000]/10 hover:shadow-xl hover:shadow-[#800000]/20 hover:-translate-y-0.5"
                  }`}
                >
                  {postalCodeValidation.isValidating ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Validating...</>
                  ) : isProcessing ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Processing...</>
                  ) : !allVariantsSelected ? (
                    <><AlertCircle className="h-4 w-4" />Select Color &amp; Size</>
                  ) : (
                    <><CreditCard className="h-4 w-4" />Continue to Payment</>
                  )}
                </button>

                {/* Security */}
                <div className="flex items-center justify-center gap-4 pt-3 pb-1">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Lock className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Secure checkout</span>
                  </div>
                  <div className="w-px h-3 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Shield className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Encrypted</span>
                  </div>
                  {postalCodeValidation.deliveryInfo?.cod && (
                    <>
                      <div className="w-px h-3 bg-gray-200" />
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
