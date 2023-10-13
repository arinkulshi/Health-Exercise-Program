"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.authenticateJWT = exports.app = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
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
exports.app.use('/auth', authRoutes);
exports.app.use('/patients', patientRoutes);
exports.app.use('/exercises', exerciseRoutes);
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "hep",
    entities: [
        Patient_1.Patient,
        Provider_1.Provider,
        Exercise_1.Exercise,
        Program_1.Program,
        PatientPerformsExercise_1.PatientPerformsExercise
    ],
    synchronize: true,
    logging: false
});
exports.dataSource.initialize().then(() => {
    exports.app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));
