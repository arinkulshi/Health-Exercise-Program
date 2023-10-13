import request from 'supertest';
import { app } from '../index';  
import { Exercise } from '../entity/Exercise';
import { dataSource } from "../index";

describe('Exercise Routes', () => {

  
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

    
    await dataSource.getRepository(Exercise).delete(response.body.exerciseID);
  });

  
  it('should retrieve all exercises', async () => {
    const response = await request(app).get('/exercises');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

});

