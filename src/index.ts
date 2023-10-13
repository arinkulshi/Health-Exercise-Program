import "reflect-metadata";
import {DataSource } from "typeorm";
import express from "express";

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

app.use('/auth', authRoutes);
app.use('/patients',patientRoutes);
app.use('/exercises', exerciseRoutes);



export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "hep",
    entities: [
        Patient,
        Provider,
        Exercise,
        Program,
        PatientPerformsExercise
    ],
    synchronize: true, 
    logging: false
});

dataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));


