import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Create Customer', () => {
  let accessToken = '';
  beforeAll( async () => {
    const adminEmail = 'admin@example.com';
    const adminPassword = '123456';

    await testServer.post('/user').send({
      email: adminEmail,
      password: adminPassword,
      name: 'Admin Geral',
    });

    const loginAdmin = await testServer.post('/login').send({
      email: adminEmail,
      password: adminPassword,
    });

    accessToken = loginAdmin.body.accessToken;
  });

  it('should create a new customer', async () => {

    const createCustomer = await testServer
      .post('/customer')
      .send({
        'customer': {
          'name': 'User',
          'email': 'User@test.com',
          'cpf': '12312312566',
        },
        'address': {
          'zip_code': '01001000',
          'number': '101',
          'complement': 'Bloco x, Apto y',
        },
        'phone': {
          'number': '2211933221133',
        },
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(createCustomer.body).toHaveProperty('id');
    expect(createCustomer.statusCode).toEqual(StatusCodes.CREATED);
  });
});
