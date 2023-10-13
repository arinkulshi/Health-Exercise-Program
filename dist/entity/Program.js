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
exports.Program = void 0;
const typeorm_1 = require("typeorm");
const Patient_1 = require("./Patient");
const Provider_1 = require("./Provider");
const Exercise_1 = require("./Exercise");
let Program = class Program {
};
exports.Program = Program;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Program.prototype, "ProgramID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Patient_1.Patient),
    (0, typeorm_1.JoinColumn)({ name: "AssignedPatient" }),
    __metadata("design:type", Patient_1.Patient)
], Program.prototype, "AssignedPatient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Provider_1.Provider),
    (0, typeorm_1.JoinColumn)({ name: "AssignedProvider" }),
    __metadata("design:type", Provider_1.Provider)
], Program.prototype, "AssignedProvider", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Program.prototype, "CreatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Exercise_1.Exercise),
    (0, typeorm_1.JoinTable)({
        name: "ProgramExercise",
        joinColumn: {
            name: "ProgramID",
            referencedColumnName: "ProgramID"
        },
        inverseJoinColumn: {
            name: "ExerciseID",
            referencedColumnName: "ExerciseID"
        }
    }),
    __metadata("design:type", Array)
], Program.prototype, "Exercises", void 0);
exports.Program = Program = __decorate([
    (0, typeorm_1.Entity)()
], Program);
