import request from 'supertest';
import app from '../app';

describe('Order API', () => {
  afterAll(async () => {
    // Ajoutez ici le nettoyage, par exemple la fermeture des connexions à la base de données,
    // si nécessaire.
  });

  it('GET /api/orders should return an array of orders', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
