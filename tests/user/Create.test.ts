import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Create User', () => {
  it('should create a new user', async () => {

    const response = await testServer
      .post('/user')
      .send({
        name: 'User',
        email: 'userTest@test.com',
        password: '123456'
      });

    expect(response.body).toHaveProperty('id');
    expect(response.statusCode).toEqual(StatusCodes.CREATED);
  });

  it('should not create a new user with invalid data', async () => {
    const response = await testServer.post('/user').send({
      name: 'User',
      email: '',
      password: ''
    });

    expect(response.body).toHaveProperty('error');
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
});
