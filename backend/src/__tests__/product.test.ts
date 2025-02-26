import request from 'supertest';
import app from '../app';

describe('Product API', () => {
  afterAll(async () => {
    // Si nécessaire, effectuez ici le nettoyage des ressources (par exemple, fermer des connexions de base de données)
  });

  it('GET /api/products should return an array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
