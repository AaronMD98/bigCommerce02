import { NextRequest, NextResponse } from 'next/server';

const storeHash: string | undefined = process.env.BIGCOMMERCE_STORE_HASH;
const accessToken: string | undefined = process.env.BIGCOMMERCE_ACCESS_TOKEN;
const channelId: string | undefined = process.env.BIGCOMMERCE_CHANNEL_ID;

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  if (!storeHash || !accessToken || !channelId) {
    console.error('Missing required environment variables');
    return new NextResponse(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const url = `https://api.bigcommerce.com/stores/${storeHash}/v3/customers/subscribers`;

    // Prepare the request options
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
      body: JSON.stringify({
        email: body.email,
        first_name: body.firstName,
        source: body.source,
        last_name: '',
        channel_id: channelId,
      }),
    };

    // '{"email":"string","first_name":"string","last_name":"string","source":"string","order_id":1,"channel_id":1}'

    console.log('BODY', body);

    // Perform the fetch operation
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error('BigCommerce API Error:', data);
      return new NextResponse(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Internal server error:', err);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const url = `https://api.bigcommerce.com/stores/${storeHash}/v3/customers/subscribers`;

  if (!storeHash || !accessToken || !channelId) return;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': accessToken,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error('error:' + err));
}

// const fetch = require('node-fetch');

// let url = 'https://api.bigcommerce.com/stores/[store_hash]/v3/customers/subscribers';

// let options = {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'X-Auth-Token': 'xxxxxxxxxxxxxxxxx',
//   },
//   body: '{"email":"string","first_name":"string","last_name":"string","source":"string","order_id":1,"channel_id":1}',
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error('error:' + err));
