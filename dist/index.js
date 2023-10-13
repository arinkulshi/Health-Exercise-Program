"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.authenticateJWT = exports.app = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const cors = require('cors');
// Entities
const Patient_1 = require("./entity/Patient");
const Provider_1 = require("./entity/Provider");
const Exercise_1 = require("./entity/Exercise");
const Program_1 = require("./entity/Program");
const PatientPerformsExercise_1 = require("./entity/PatientPerformsExercise");
exports.app = (0, express_1.default)();
const port = 3000;
exports.app.use(express_1.default.json());
const express_jwt_1 = require("express-jwt");
exports.authenticateJWT = (0, express_jwt_1.expressjwt)({ secret: '1234', algorithms: ['HS256'] });
const patientRoutes = require('./routes/patientRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const authRoutes = require('./routes/authRoutes');
const patientPerformsExercise = require('./routes/patientPerformsExerciseRoutes');
exports.app.use(cors());
exports.app.use('/auth', authRoutes);
exports.app.use('/patients', patientRoutes);
exports.app.use('/exercises', exerciseRoutes);
exports.app.use('/patients_exercises', patientPerformsExercise);
require('dotenv').config();
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        Patient_1.Patient,
        Provider_1.Provider,
        Exercise_1.Exercise,
        Program_1.Program,
        PatientPerformsExercise_1.PatientPerformsExercise
    ],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true'
});
exports.dataSource.initialize().then(() => {
    exports.app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));
