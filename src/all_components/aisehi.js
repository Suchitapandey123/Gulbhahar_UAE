// Key parts of checkout page that need to be updated for proper data saving

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