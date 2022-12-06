import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Login', () => {
  beforeAll( async () => {
    await testServer.post('/user').send({
      name: 'User',
      email: 'test@test.com',
      password: '123456'
    });
  });

  it('should login with valid credentials', async () => {
    const response = await testServer.post('/login').send({
      email: 'test@test.com',
      password: '123456'
    });

    expect(response.body).toHaveProperty('accessToken');
    expect(response.statusCode).toEqual(StatusCodes.OK);
  });

  it('should not login with invalid credentials', async () => {
    const response = await testServer.post('/login').send({
      email: 'test@test.com',
      password: '1234567'
    });

    expect(response.body).toHaveProperty('error');
    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });
});
