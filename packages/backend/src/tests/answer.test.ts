import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.ts';

describe('Answer API', () => {
  // Test for postAnswer
  it('should create an answer for a question', async () => {
    // Placeholder for authentication token
    const authToken = 'YOUR_AUTH_TOKEN'; 
    const questionId = 'some-question-id'; // Replace with a valid question ID from your test data

    const res = await request(app)
      .post(`/api/v1/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'This is a test answer with at least 5 characters.',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.content).toEqual('This is a test answer with at least 5 characters.');
  });

  // Test for acceptAnswer
  it('should accept an answer', async () => {
    const authToken = 'YOUR_AUTH_TOKEN'; 
    const answerId = 'some-answer-id'; // Replace with a valid answer ID

    const res = await request(app)
      .put(`/api/v1/answers/${answerId}/accept`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.isAccepted).toEqual(true);
  });

  // Test for deleteAnswer
  it('should delete an answer', async () => {
    const authToken = 'YOUR_AUTH_TOKEN'; 
    const answerId = 'some-answer-id'; // Replace with a valid answer ID

    const res = await request(app)
      .delete(`/api/v1/answers/${answerId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(204);
  });
});