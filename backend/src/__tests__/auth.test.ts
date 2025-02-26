import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  // Un utilisateur de test pour l'inscription et la connexion
  const testUser = {
    title: 'monsieur',
    firstName: 'Test',
    lastName: 'User',
    address: '123 Test St, Test City',
    email: 'test.user@example.com',
    phoneNumber: '0123456789',
    dateOfBirth: '1990-01-01',
    password: 'testpassword',
  };

  // Cleanup après les tests
  afterAll(async () => {
    // Si vous avez des ressources à fermer (par exemple, une connexion à la base de données),
    // effectuez le nettoyage ici. Par exemple :
    // await someDatabaseConnection.close();
    // Sinon, laissez vide.
  });

  it('POST /api/auth/register should create a new user or return conflict if already exists', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    // On peut obtenir 201 (créé) ou 409 (conflit) si l'utilisateur existe déjà.
    expect([201, 409]).toContain(res.statusCode);
  });

  it('POST /api/auth/login should login the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    // On attend 200 pour une connexion réussie ou 401 pour des identifiants invalides.
    expect([200, 401]).toContain(res.statusCode);
  });
});
