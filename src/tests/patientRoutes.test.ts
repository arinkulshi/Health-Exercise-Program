import request from 'supertest';
import { app } from '../index';  

describe('Patient Routes', () => {
  
  it('should create a new patient', async () => {
    const newPatient = {
      Name: 'John Doe',
      InjuryType: 'Sprained Ankle',
    };

    const response = await request(app)
      .post('/patients')
      .send(newPatient);

    expect(response.status).toBe(200);
    expect(response.body.Name).toBe(newPatient.Name);
    expect(response.body.InjuryType).toBe(newPatient.InjuryType);
  });

  it('should retrieve all patients', async () => {
    const response = await request(app).get('/patients');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  
});
