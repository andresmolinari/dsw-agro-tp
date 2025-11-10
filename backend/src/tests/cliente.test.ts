import request from 'supertest';
import jwt from 'jsonwebtoken';
import sequelize from '../db/connection';
import Server from '../services/server';
import { Usuario } from '../models/usuario';

const app = new Server().app;

describe('GET /clientes/misClientes', () => {
  let token: string;
  let usuarioExistente: any;

  beforeAll(async () => {
 
    usuarioExistente = await Usuario.findOne();

    if (!usuarioExistente) {
      throw new Error('No hay usuarios en la base de datos. Crea uno antes de correr el test.');
    }

    // Genera un token válido con la misma clave que usa tu backend
    token = jwt.sign(
      {
        usuarioId: usuarioExistente.usuarioId,
        usuarioNombre: usuarioExistente.usuarioNombre,
      },
      process.env.SECRET_KEY || 'moli96'
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('debería devolver los clientes del usuario autenticado', async () => {
    const res = await request(app)
      .get('/api/clientes/misClientes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería devolver 401 si no se envía token', async () => {
    const res = await request(app).get('/api/clientes/misClientes');
    expect(res.status).toBe(401);
  });
});
