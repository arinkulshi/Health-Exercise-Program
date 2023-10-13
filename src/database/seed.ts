import { dataSource } from "../index";
import { Patient } from "../entity/Patient";
import { Exercise } from "../entity/Exercise";
import { faker } from '@faker-js/faker';

async function seedData() {
    console.log("Inserting new data into the database...");

    const patients = Array(2).fill(null).map(() => {
        const patient = new Patient();
        patient.Name = faker.person.firstName(); // Generates a random name
        patient.InjuryType = faker.science.chemicalElement().name
        return patient;
    });


    const exercises = Array(2).fill(null).map(() => {
        const exercise = new Exercise();
        exercise.Name = faker.person.firstName(); // Generates a random name
        exercise.Description=  faker.science.chemicalElement().name
        exercise.VideoURL=  faker.airline.airline().name
        return exercise;
    });

    const savedPatients =   await dataSource.manager.save(patients);
    await dataSource.manager.save(exercises);

}



dataSource.initialize().then(() => {
    seedData().catch(error => console.log("Seeding error: ", error));
}).catch(error => console.log("TypeORM connection error: ", error));
