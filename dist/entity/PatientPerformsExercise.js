"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientPerformsExercise = void 0;
const typeorm_1 = require("typeorm");
const Patient_1 = require("./Patient");
const Exercise_1 = require("./Exercise");
let PatientPerformsExercise = class PatientPerformsExercise {
};
exports.PatientPerformsExercise = PatientPerformsExercise;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PatientPerformsExercise.prototype, "PatientID", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PatientPerformsExercise.prototype, "ExerciseID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Patient_1.Patient),
    (0, typeorm_1.JoinColumn)({ name: "PatientID" }),
    __metadata("design:type", Patient_1.Patient)
], PatientPerformsExercise.prototype, "Patient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Exercise_1.Exercise),
    (0, typeorm_1.JoinColumn)({ name: "ExerciseID" }),
    __metadata("design:type", Exercise_1.Exercise)
], PatientPerformsExercise.prototype, "Exercise", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PatientPerformsExercise.prototype, "PerformedDate", void 0);
exports.PatientPerformsExercise = PatientPerformsExercise = __decorate([
    (0, typeorm_1.Entity)()
], PatientPerformsExercise);
