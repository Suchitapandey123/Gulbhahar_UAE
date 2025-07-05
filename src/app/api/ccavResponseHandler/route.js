// app/api/ccavResponseHandler/route.js
import { decrypt } from '@/utils/cavutil';
import crypto from 'crypto';
export async function POST(request) {
    try {
        // CCAvenue credentials
        const workingKey = process.env.CCAV_WORKING_KEY || 'B61936D1B4F8F4861C5DA0ADF8144ABD';
        
        if (!workingKey) {
            throw new Error('CCAvenue working key not configured');
        }

        // Generate Md5 hash for the key and then convert to base64 string
        const md5 = crypto.createHash('md5').update(workingKey).digest();
        const keyBase64 = Buffer.from(md5).toString('base64');

        // Initializing Vector and then convert to base64 string
        const ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

        // Get the encrypted response from CCAvenue
        const formData = await request.formData();
        const encResp = formData.get('encResp');

        if (!encResp) {
            throw new Error('No encrypted response received from CCAvenue');
        }

        // Decrypt the response
        const ccavResponse = decrypt(encResp.toString(), keyBase64, ivBase64);
        console.log('Decrypted response:', ccavResponse);

        // Parse the response (convert from query string format)
        const responseParams = {};
        const pairs = ccavResponse.split('&');
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key && value) {
                responseParams[key] = decodeURIComponent(value);
            }
        });

        // Create response table (like the Node.js example)
        let pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>';
        pData = pData + ccavResponse.replace(/=/gi, '</td><td>');
        pData = pData.replace(/&/gi, '</td></tr><tr><td>');
        pData = pData + '</td></tr></table>';

        const htmlcode = `
            <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Response Handler</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { border-collapse: collapse; margin: 20px auto; }
                        td { padding: 8px; border: 1px solid #ccc; }
                        .header { background-color: #f0f0f0; font-weight: bold; }
                        .success { color: green; }
                        .failure { color: red; }
                    </style>
                </head>
                <body>
                    <center>
                        <font size="4" color="blue"><b>Payment Response</b></font><br>
                        <div style="margin: 20px 0;">
                            <strong>Order Status:</strong> 
                            <span class="${responseParams.order_status === 'Success' ? 'success' : 'failure'}">
                                ${responseParams.order_status || 'Unknown'}
                            </span>
                        </div>
                        ${pData}
                        <br>
                        <button onclick="window.close()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                            Close
                        </button>
                    </center>
                </body>
            </html>
        `;

        return new Response(htmlcode, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });

    } catch (error) {
        console.error('CCAvenue response handler error:', error);
        
        const errorHtml = `
            <html>
                <head><title>Response Error</title></head>
                <body>
                    <center>
                        <h2>Response Processing Error</h2>
                        <p>Error: ${error.message}</p>
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