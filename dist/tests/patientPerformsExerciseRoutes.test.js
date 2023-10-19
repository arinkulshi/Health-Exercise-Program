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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const PatientPerformsExercise_1 = require("../entity/PatientPerformsExercise");
const index_2 = require("../index");
describe('PatientPerformsExercise Routes', () => {
    it('should create a new patient performs exercise record', () => __awaiter(void 0, void 0, void 0, function* () {
        const testPatientId = 1;
        const testExerciseId = 1;
        const response = yield (0, supertest_1.default)(index_1.app)
            .post('/patient-performs-exercise')
            .send({
            PatientID: testPatientId,
            ExerciseID: testExerciseId
        });
        expect(response.status).toBe(201);
        expect(response.body.PatientID).toBe(testPatientId);
        expect(response.body.ExerciseID).toBe(testExerciseId);
        yield index_2.dataSource.getRepository(PatientPerformsExercise_1.PatientPerformsExercise).delete({
            PatientID: response.body.PatientID,
            ExerciseID: response.body.ExerciseID
        });
    }));
    it('should retrieve all patient performs exercise records', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/patient-performs-exercise');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
});
