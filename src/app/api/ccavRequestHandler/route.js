// app/api/ccavRequestHandler/route.js
import { encrypt } from '@/utils/cavutil';
import crypto from 'crypto';


export async function POST(request) {
    try {
        const body = await request.json();

        // access_code: ATIG06MG45AI73GIIA

        // // Working key: B61936D1B4F8F4861C5DA0ADF8144ABD
        
        // CCAvenue credentials (put your actual credentials here)
        const workingKey = process.env.CCAV_WORKING_KEY || 'B61936D1B4F8F4861C5DA0ADF8144ABD'; // Default test key
        const accessCode = process.env.CCAV_ACCESS_CODE || 'ATIG06MG45AI73GIIA'; // Default test access code
        
        console.log('Working Key length:', workingKey.length);
        console.log('Access Code:', accessCode);

        // Generate Md5 hash for the key and then convert to base64 string
        const md5 = crypto.createHash('md5').update(workingKey).digest();
        const keyBase64 = Buffer.from(md5).toString('base64');

        // Initializing Vector and then convert to base64 string
        const ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

        console.log('Key Base64:', keyBase64);
        console.log('IV Base64:', ivBase64);

        // Create query string from form data (exactly like the Node.js example)
        let formData = '';
        const orderedParams = [
            'merchant_id', 'order_id', 'currency', 'amount', 'redirect_url', 'cancel_url', 'language',
            'billing_name', 'billing_address', 'billing_city', 'billing_state', 'billing_zip', 
            'billing_country', 'billing_tel', 'billing_email',
            'delivery_name', 'delivery_address', 'delivery_city', 'delivery_state', 'delivery_zip', 
            'delivery_country', 'delivery_tel',
            'merchant_param1', 'merchant_param2', 'merchant_param3', 'merchant_param4', 'merchant_param5',
            'promo_code', 'customer_identifier'
        ];

        // Build query string in consistent order
        for (const param of orderedParams) {
            if (body[param] && body[param].toString().trim() !== '') {
                formData += `${param}=${body[param]}&`;
            }
        }
        
        // Remove trailing &
        formData = formData.slice(0, -1);

        console.log('Form data to encrypt:', formData);

        // Encrypt the request using the same method as ccavRequestHandler.js
        const encRequest = encrypt(formData, keyBase64, ivBase64);
        console.log('Encrypted request:', encRequest);

        // Generate the form HTML exactly like the Node.js example
        const formbody = `
<!DOCTYPE html>
<html>
<head>
    <title>Redirecting to CCAvenue</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
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
        }
        .spinner { 
            border: 4px solid #f3f3f3; 
            border-top: 4px solid #3498db; 
            border-radius: 50%; 
            width: 40px; 
            height: 40px; 
            animation: spin 1s linear infinite; 
            margin: 20px auto; 
        }
        @keyframes spin { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h2>Redirecting to Payment Gateway</h2>
        <p>Please wait while we securely redirect you...</p>
        <p><small>Encrypted Request: ${encRequest.substring(0, 50)}...</small></p>
    </div>
    
    <form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
        <input type="hidden" id="encRequest" name="encRequest" value="${encRequest}">
        <input type="hidden" name="access_code" id="access_code" value="${accessCode}">
    </form>
    
    <script language="javascript">
        console.log('Submitting form with encrypted request length:', '${encRequest}'.length);
        console.log('Access code:', '${accessCode}');
        setTimeout(function() {
            document.redirect.submit();
        }, 2000);
    </script>
</body>
</html>`;

        // Return the HTML form (just like the Node.js version)
        return new Response(formbody, {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });

    } catch (error) {
        console.error('CCAvenue request handler error:', error);
        
        const errorHtml = `
            <html>
                <head><title>Payment Error</title></head>
                <body>
                    <center>
                        <h2>Payment Initialization Error</h2>
                        <p>Error: ${error.message}</p>
                        <p>Stack: ${error.stack}</p>
                        <button onclick="window.history.back()">Go Back</button>
                    </center>
                </body>
            </html>
        `;

        return new Response(errorHtml, {
            status: 500,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }
}