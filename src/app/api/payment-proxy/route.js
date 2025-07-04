// app/api/payment-proxy/route.js
import crypto from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Get the base URL for redirect URLs
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    // Kotak credentials (these should be from environment variables)
    const MERCHANT_ID = process.env.KOTAK_MERCHANT_ID || "4371009"; // Replace with your merchant ID
    const ACCESS_CODE = process.env.KOTAK_ACCESS_CODE || "AVKN79MF41BN60NKNB"; // Replace with your access code
    const WORKING_KEY = process.env.KOTAK_WORKING_KEY || "6FE99E8673F79609B9B9C1343BDA2F0A"; // Replace with your working key
    
    // Prepare payment data according to Kotak documentation
    const paymentData = {
      merchant_id: MERCHANT_ID,
      order_id: body.order_id || `ORDER_${Date.now()}`,
      amount: body.amount || "1.00",
      currency: body.currency || "INR",
      redirect_url: `${baseUrl}/payment-success`,
      cancel_url: `${baseUrl}/payment-failure`,
      language: "EN",
      billing_name: body.billing_name || "",
      billing_tel: body.billing_tel || "",
      billing_email: body.billing_email || "",
      billing_address: body.billing_address || "",
      billing_city: body.billing_city || "",
      billing_state: body.billing_state || "",
      billing_zip: body.billing_zip || "",
      billing_country: body.billing_country || "India",
      delivery_name: body.delivery_name || "",
      delivery_address: body.delivery_address || "",
      delivery_city: body.delivery_city || "",
      delivery_state: body.delivery_state || "",
      delivery_zip: body.delivery_zip || "",
      delivery_country: body.delivery_country || "India",
      delivery_tel: body.delivery_tel || "",
      merchant_param1: "nextjs_test",
      merchant_param2: "app_router",
      merchant_param3: "",
      merchant_param4: "",
      merchant_param5: ""
    };

    // Create query string from payment data
    let dataString = "";
    for (const [key, value] of Object.entries(paymentData)) {
      if (value) {
        dataString += `${key}=${encodeURIComponent(value)}&`;
      }
    }
    dataString = dataString.slice(0, -1); // Remove last &

    console.log('Payment data string:', dataString);

    // AES encryption function compatible with CCAvenue
    function encrypt(text, key) {
      try {
        // Pad the key to 16 bytes for AES-128
        const keyBuffer = Buffer.from(key.substring(0, 16).padEnd(16, '\0'), 'utf8');
        
        // Use a fixed IV for compatibility (in production, use random IV)
        const iv = Buffer.alloc(16, 0);
        
        const cipher = crypto.createCipheriv('aes-128-cbc', keyBuffer, iv);
        cipher.setAutoPadding(true);
        
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return encrypted;
      } catch (error) {
        console.error('Encryption error:', error);
        throw error;
      }
    }

    // Encrypt the request
    let encRequest;
    try {
      encRequest = encrypt(dataString, WORKING_KEY);
      console.log('Encrypted request generated successfully');
    } catch (encryptionError) {
      console.error('Encryption failed:', encryptionError);
      // For testing purposes, if encryption fails, we'll create a mock response
      encRequest = Buffer.from(dataString).toString('base64'); // Simple base64 encoding as fallback
    }

    // Create the HTML form that auto-submits to CCAvenue
    const htmlResponse = `
<!DOCTYPE html>
<html>
<head>
    <title>Redirecting to Payment Gateway</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        .container {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 400px;
            width: 90%;
        }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        h2 {
            color: #333;
            margin-bottom: 10px;
        }
        p {
            color: #666;
            line-height: 1.5;
        }
        .progress-bar {
            width: 100%;
            height: 4px;
            background-color: #f3f3f3;
            border-radius: 2px;
            overflow: hidden;
            margin: 20px 0;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 0%;
            animation: progress 3s ease-in-out forwards;
        }
        @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        .security-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            border-left: 4px solid #28a745;
        }
        .security-info p {
            margin: 0;
            font-size: 12px;
            color: #28a745;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h2>Redirecting to Kotak Payment Gateway</h2>
        <p>Please wait while we securely redirect you to the payment page...</p>
        
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        
        <div class="security-info">
            <p>🔒 Your transaction is secured with 256-bit SSL encryption</p>
        </div>
        
        <p style="font-size: 12px; color: #999; margin-top: 20px;">
            If you are not redirected automatically, please click the button below.
        </p>
        
        <button onclick="document.redirect.submit();" style="
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 10px;
            display: none;
        " id="manualSubmit">
            Continue to Payment
        </button>
    </div>
    
    <form method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction" style="display: none;">
        <input type="hidden" name="encRequest" value="${encRequest}">
        <input type="hidden" name="access_code" value="${ACCESS_CODE}">
    </form>
    
    <script>
        // Auto-submit the form after a delay
        let countdown = 3;
        
        const timer = setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                clearInterval(timer);
                document.redirect.submit();
            }
        }, 1000);
        
        // Show manual submit button after 5 seconds as fallback
        setTimeout(() => {
            document.getElementById('manualSubmit').style.display = 'inline-block';
        }, 5000);
        
        // Handle potential errors
        window.addEventListener('error', function(e) {
            console.error('Error during redirect:', e);
            document.getElementById('manualSubmit').style.display = 'inline-block';
        });
    </script>
</body>
</html>`;

    return new Response(htmlResponse, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
  } catch (error) {
    console.error('Payment proxy error:', error);
    
    // Return a user-friendly error page
    const errorHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Payment Error</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .container {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 400px;
        }
        .error-icon {
            font-size: 48px;
            color: #dc3545;
            margin-bottom: 20px;
        }
        h2 { color: #dc3545; margin-bottom: 10px; }
        p { color: #666; line-height: 1.5; }
        button {
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 20px;
            font-size: 14px;
        }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="error-icon">⚠️</div>
        <h2>Payment Initialization Failed</h2>
        <p>We're sorry, but there was an error setting up your payment. Please try again or contact support if the problem persists.</p>
        <p style="font-size: 12px; color: #999;">Error: ${error.message}</p>
        <button onclick="window.history.back()">Go Back</button>
    </div>
</body>
</html>`;

    return new Response(errorHtml, {
      status: 500,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  }
}