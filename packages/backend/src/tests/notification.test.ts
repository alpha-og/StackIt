import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.ts';

describe('Notification API', () => {
  // Test for getNotifications
  it('should get all notifications for a user', async () => {
    const authToken = 'YOUR_AUTH_TOKEN'; 

    const res = await request(app)
      .get('/api/v1/notifications')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test for markNotificationRead
  it('should mark a notification as read', async () => {
    const authToken = 'YOUR_AUTH_TOKEN'; 
    const notificationId = 'some-notification-id'; // Replace with a valid notification ID

    const res = await request(app)
      .put(`/api/v1/notifications/${notificationId}/read`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.isRead).toEqual(true);
  });
});