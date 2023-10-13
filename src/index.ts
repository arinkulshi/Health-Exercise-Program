import "reflect-metadata";
import {DataSource } from "typeorm";
import express from "express";
const cors = require('cors');

// Entities
import { Patient } from "./entity/Patient";
import { Provider } from "./entity/Provider";
import { Exercise } from "./entity/Exercise";
import { Program } from "./entity/Program";
import { PatientPerformsExercise } from "./entity/PatientPerformsExercise";

export const app = express();
const port = 3000;


app.use(express.json());

import {expressjwt} from "express-jwt";

export const authenticateJWT = expressjwt({ secret: '1234', algorithms: ['HS256'] });


const patientRoutes = require('./routes/patientRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const authRoutes = require('./routes/authRoutes')
const patientPerformsExercise = require('./routes/patientPerformsExerciseRoutes')


app.use(cors());

app.use('/auth', authRoutes);
app.use('/patients',patientRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/patients_exercises', patientPerformsExercise);

require('dotenv').config();


export const dataSource = new DataSource({
    type:"postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        Patient,
        Provider,
        Exercise,
        Program,
        PatientPerformsExercise
    ],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true'
});



dataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));


