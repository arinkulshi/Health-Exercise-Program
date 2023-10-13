"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Patient_1 = require("../entity/Patient");
const Exercise_1 = require("../entity/Exercise");
const faker_1 = require("@faker-js/faker");
function seedData() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Inserting new data into the database...");
        const patients = Array(2).fill(null).map(() => {
            const patient = new Patient_1.Patient();
            patient.Name = faker_1.faker.person.firstName(); // Generates a random name
            patient.InjuryType = faker_1.faker.science.chemicalElement().name;
            return patient;
        });
        const exercises = Array(2).fill(null).map(() => {
            const exercise = new Exercise_1.Exercise();
            exercise.Name = faker_1.faker.person.firstName(); // Generates a random name
            exercise.Description = faker_1.faker.science.chemicalElement().name;
            exercise.VideoURL = faker_1.faker.airline.airline().name;
            return exercise;
        });
        yield index_1.dataSource.manager.save(patients);
        yield index_1.dataSource.manager.save(exercises);
    });
}
index_1.dataSource.initialize().then(() => {
    seedData().catch(error => console.log("Seeding error: ", error));
}).catch(error => console.log("TypeORM connection error: ", error));
