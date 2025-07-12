import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.ts';

describe('Tag API', () => {
  // Test for getTags
  it('should get all tags', async () => {
    const res = await request(app).get('/api/v1/tags');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test for createTag
  it('should create a new tag', async () => {
    const authToken = 'YOUR_AUTH_TOKEN'; 

    const res = await request(app)
      .post('/api/v1/tags')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'TestTag',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('TestTag');
  });
});