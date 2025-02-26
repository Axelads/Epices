import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

export const createPaymentIntent = async (amount: number, currency = 'usd') => {
  // Crée un Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // montant en centimes
    currency,
  });
  return paymentIntent;
};
