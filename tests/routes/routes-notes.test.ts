import app from '../setupTest/setupTest';
import request from 'supertest';
import { iUser } from '../../src/common/interface/entity-user';
import { iNote } from '../../src/common/interface/entity-note';

let userId: string | undefined = '67b25223eb90182c6cfd46d7';
let noteId: string | undefined = undefined;
let token: string | undefined = undefined;

describe('Should test the Note routes', () => {
  const userData: iUser = {
    firstName: 'camila',
    lastName: 'Borba Breda',
    email: 'camilabbreda9@example.com',
    password: 'password123',
  };

  const noteData: iNote = {
    title: 'Test Note',
    content: 'This is a test note',
    userId: '',
  };

  it('Should register a user', async () => {
    const response = await request(app)
      .post('/user/register')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(201);

    userId = response.body.response._id;
    expect(userId).toBeDefined();
  });

  it('Should login and get a token', async () => {
    const response = await request(app)
      .post('/user/login')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(200);

    token = response.body.response.token;
    expect(token).toBeDefined();
  });

  it('Should create a note', async () => {
    noteData.userId = userId as string;
    const response = await request(app)
      .post('/note')
      .set('Authorization', `Bearer ${token}`)
      .send(noteData)
      .expect('Content-Type', /json/)
      .expect(201);

    noteId = response.body.response._id;
    expect(noteId).toBeDefined();
    expect(response.body.response.title).toBe(noteData.title);
    expect(response.body.response.content).toBe(noteData.content);
  });

  it('Should get all notes from user', async () => {
    const response = await request(app)
      .get(`/note/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.response).toBeInstanceOf(Array);
    expect(response.body.response.length).toBeGreaterThan(0);
  });

  it('Should get a specific note by ID', async () => {
    const response = await request(app)
      .get(`/note/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.response._id).toBe(noteId);
    expect(response.body.response.title).toBe(noteData.title);
    expect(response.body.response.content).toBe(noteData.content);
  });

  it('Should update a note', async () => {
    const updatedNote = {
      title: 'Updated Note Title',
      content: 'Updated Content',
    };

    await request(app)
      .put(`/note/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedNote)
      .expect(200);

    const response = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.response.notes).toContain(noteId);
  });

  it('Should delete a note', async () => {
    const response = await request(app)
      .delete(`/note/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.response).toBe('Note was successfully deleted.');
  });
  it('Sould test user delete', async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.response).toBe('User was successfully deleted.');
  });
});
