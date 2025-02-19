import app from '../setupTest/setupTest';
import request from 'supertest';
import { iNote } from '../../src/common/interface/entity-note';

describe('Should test title generator route', () => {
  const noteData: iNote = {
    content: 'This is a test note'
  };

  it('Should return a generated title', async () => {
    const response = await request(app)
      .post('/generate/note-title')
      .send(noteData)
      .expect('Content-Type', /json/)
      .expect(201);

    const generatedTitle: iNote = response.body.response.title;
    expect(generatedTitle).toBeDefined();
  });
});
