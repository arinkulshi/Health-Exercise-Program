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
const index_1 = require("../index"); // Ensure you export your app from its module
const Exercise_1 = require("../entity/Exercise");
const index_2 = require("../index");
describe('Exercise Routes', () => {
    // POST: Create a new exercise
    it('should create a new exercise', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app)
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
        // Cleanup: Delete the created exercise
        yield index_2.dataSource.getRepository(Exercise_1.Exercise).delete(response.body.exerciseID);
    }));
    // GET: Retrieve all exercises
    it('should retrieve all exercises', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/exercises');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
});
