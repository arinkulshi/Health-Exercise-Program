import request from 'supertest';
import { app } from '../index';  // Ensure you export your app from its module
import { Exercise } from '../entity/Exercise';
import { dataSource } from "../index";

describe('Exercise Routes', () => {

  // POST: Create a new exercise
  it('should create a new exercise', async () => {
    const response = await request(app)
      .post('/exercises')
      .send({
        name: 'Squat',
        description: 'A basic squat exercise',
        videoURL: 'http://example.com/squat'
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Squat');
    expect(response.body.description).toBe('A basic squat exercise');
    expect(response.body.videoURL).toBe('http://example.com/squat');

    // Cleanup: Delete the created exercise
    await dataSource.getRepository(Exercise).delete(response.body.exerciseID);
  });

  // GET: Retrieve all exercises
  it('should retrieve all exercises', async () => {
    const response = await request(app).get('/exercises');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

});

