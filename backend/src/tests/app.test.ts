import request from 'supertest';
import sequelize from '../db/connection';
import Server from '../services/server';

const server = new Server();
const app = server.app; // obtenés la instancia de express

describe('GET /ping', () => {
  it('debería responder con pong', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'pong' });
  });

   afterAll(async () => {
    await sequelize.close(); 
  });

});
