import request from 'supertest';
import app from '../app';

describe('Payment API', () => {
  afterAll(async () => {
    // Ajoutez ici le code de nettoyage si nécessaire,
    // par exemple la fermeture d'une connexion à la base de données
    // ou d'autres ressources.
  });

  it('POST /api/payments/stripe/create-intent should create a Stripe Payment Intent', async () => {
    const res = await request(app)
      .post('/api/payments/stripe/create-intent')
      .send({ amount: 5000, currency: 'usd' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('clientSecret');
  });

  it('POST /api/payments/paypal/create-order should create a PayPal order', async () => {
    const res = await request(app)
      .post('/api/payments/paypal/create-order')
      .send({ amount: "50.00", currency: "USD" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id'); // L'ID de la commande PayPal
  });

  // Vous pouvez ajouter des tests pour capturer une commande PayPal si votre environnement le permet.
});
