import request from 'supertest';
import { app } from '../index'; 
import { Patient } from '../entity/Patient';
import { Exercise } from '../entity/Exercise';
import { PatientPerformsExercise } from '../entity/PatientPerformsExercise';
import { dataSource } from "../index";

describe('PatientPerformsExercise Routes', () => {


  it('should create a new patient performs exercise record', async () => {
    
    const testPatientId = 1;
    const testExerciseId = 1;

    const response = await request(app)
      .post('/patient-performs-exercise')
      .send({
        PatientID: testPatientId,
        ExerciseID: testExerciseId
      });

    expect(response.status).toBe(201);
    expect(response.body.PatientID).toBe(testPatientId);
    expect(response.body.ExerciseID).toBe(testExerciseId);

  
    await dataSource.getRepository(PatientPerformsExercise).delete({
      PatientID: response.body.PatientID,
      ExerciseID: response.body.ExerciseID
    });
  });

  
  it('should retrieve all patient performs exercise records', async () => {
    const response = await request(app).get('/patient-performs-exercise');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });


});
