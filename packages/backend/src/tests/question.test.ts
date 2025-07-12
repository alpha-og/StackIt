import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.ts';

describe('Question API', () => {
  it('should get all questions', async () => {
    const res = await request(app).get('/api/v1/questions');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});