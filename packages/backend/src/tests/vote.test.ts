import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.ts';

describe('Vote API', () => {
  // Test for voteAnswer
  it('should allow a user to vote on an answer', async () => {
    const authToken = 'YOUR_AUTH_TOKEN'; 
    const answerId = 'some-answer-id'; // Replace with a valid answer ID

    const res = await request(app)
      .post(`/api/v1/answers/${answerId}/vote`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        type: 'upvote',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.type).toEqual('upvote');
  });

  // Test for removeVote
  it('should allow a user to remove their vote', async () => {
    const authToken = 'YOUR_AUTH_TOKEN'; 
    const voteId = 'some-vote-id'; // Replace with a valid vote ID

    const res = await request(app)
      .delete(`/api/v1/votes/${voteId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(204);
  });
});