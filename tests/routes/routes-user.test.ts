import app from '../setupTest/setupTest';
import request from 'supertest';
import { iUser } from '../../src/common/interface/entity-user';

let _id: string | undefined = undefined;
let token: string | undefined = undefined;

describe('Should test the POST app routes', () => {
  const data: iUser = {
    firstName: 'camila',
    lastName: 'Borba Breda',
    email: 'camilabbreda10@example.com',
    password: 'password123',
  };

  it('Sould test user register', async () => {
    const response = await request(app)
      .post('/user/register')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201);
    _id = response.body.response._id;
    expect(response.body.response._id).not.toBeNull();
    expect(response.body.response._id).toBeDefined();
    expect(response.body.response.firstName).toBe(
      data.firstName?.toLowerCase(),
    );
    expect(response.body.response.lastName).toBe(data.lastName?.toLowerCase());
    expect(response.body.response.email).toBe(data.email?.toLowerCase());
  });

  it('Sould test user login', async () => {
    const response = await request(app)
      .post('/user/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200);
    token = response.body.response.token;

    expect(response.body.response.token).not.toBeNull();
    expect(response.body.response.token).toBeDefined();
  });
});

describe('Should test the PUT app routes', () => {
  it.each([
    ['firstName', { firstName: 'jose paulo' }],
    ['lasttname', { lastName: 'fontes' }],
    ['email', { email: 'jose.paulo@gmail.com' }],
    ['password', { password: '123@sjsld#' }],
  ])('Sould update column %s', async (key, param) => {
    await request(app)
      .put(`/user/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(param)
      .expect(204);
  });
});

describe('Should test the DELETE app routes', () => {
  it('Sould test user delete', async () => {
    const response = await request(app)
      .delete(`/user/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.response).toBe('User was successfully deleted.');
  });
});
