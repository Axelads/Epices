import request from 'supertest';
import app from '../app';

describe('Category API', () => {
  afterAll(async () => {
    // Si nécessaire, fermez ici les connexions ou effectuez d'autres opérations de nettoyage.
  });

  it('GET /api/categories should return an array of categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
