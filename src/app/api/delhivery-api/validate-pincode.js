// app/api/validate-pincode/route.js
import axios from 'axios';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pincode = searchParams.get('pincode');

    if (!pincode) {
      return Response.json(
        { error: 'Pincode is required' },
        { status: 400 }
      );
    }

    // Validate pincode format (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
      return Response.json(
        { error: 'Invalid pincode format. Must be 6 digits.' },
        { status: 400 }
      );
    }

    const DELHIVERY_TOKEN = process.env.DELHIVERY_TOKEN || '82967ff67a00c9b';
    
    if (!DELHIVERY_TOKEN) {
      console.error('Delhivery token not configured');
      return Response.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Make API call to Delhivery
    const response = await axios.get(
      `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`,
      {
        timeout: 15000, // 15 seconds timeout
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${DELHIVERY_TOKEN}`,
          'User-Agent': 'PostmanRuntime/7.29.2' // Sometimes helps with API calls
        }
      }
    );

    // Check if delivery codes exist
    if (response.data && response.data.delivery_codes && response.data.delivery_codes.length > 0) {
      const deliveryData = response.data.delivery_codes[0].postal_code;
      
      return Response.json({
        success: true,
        isServiceable: true,
        data: {
          pincode: deliveryData.pin,
          city: deliveryData.city,
          district: deliveryData.district,
          state: deliveryData.state_code,
          cod: deliveryData.cod === 'Y',
          prepaid: deliveryData.pre_paid === 'Y',
          pickup: deliveryData.pickup === 'Y',
          covidZone: deliveryData.covid_zone,
          isODA: deliveryData.is_oda === 'Y',
          sortCode: deliveryData.sort_code,
          maxWeight: deliveryData.max_weight,
          maxAmount: deliveryData.max_amount,
          center: deliveryData.center
        }
      });
    } else {
      return Response.json({
        success: true,
        isServiceable: false,
        message: 'Pincode not serviceable'
      });
    }

  } catch (error) {
    console.error('Delhivery API Error:', error.response?.data || error.message);
    
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      return Response.json(
        { error: 'Request timeout. Please try again.' },
        { status: 408 }
      );
    }
    
    if (error.response?.status === 401) {
      return Response.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
    
    if (error.response?.status === 403) {
      return Response.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    if (error.response?.status === 429) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    return Response.json(
      { error: 'Failed to validate pincode. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}