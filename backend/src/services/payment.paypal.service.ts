import * as paypal from '@paypal/checkout-server-sdk';

function environment() {
  let clientId = process.env.PAYPAL_CLIENT_ID as string;
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET as string;
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  // Remplacez SandboxEnvironment par LiveEnvironment en production
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

export const createOrder = async (amount: string, currency: string = 'USD') => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount, // valeur en string, par exemple "50.00"
        },
      },
    ],
  });
  const response = await client().execute(request);
  return response.result;
};

export const captureOrder = async (orderId: string) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  const response = await client().execute(request);
  return response.result;
};
