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
const express_1 = require("express");
const PatientPerformsExercise_1 = require("../entity/PatientPerformsExercise");
const Patient_1 = require("../entity/Patient");
const Exercise_1 = require("../entity/Exercise");
const index_1 = require("../index");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PatientID, ExerciseID } = req.body;
        const patientRepository = index_1.dataSource.getRepository(Patient_1.Patient);
        const exerciseRepository = index_1.dataSource.getRepository(Exercise_1.Exercise);
        const patientPerformsExerciseRepository = index_1.dataSource.getRepository(PatientPerformsExercise_1.PatientPerformsExercise);
        const patient = yield patientRepository.findOne(PatientID);
        const exercise = yield exerciseRepository.findOne(ExerciseID);
        if (!patient || !exercise) {
            return res.status(404).send("Patient or Exercise not found");
        }
        const patientPerformsExercise = new PatientPerformsExercise_1.PatientPerformsExercise();
        patientPerformsExercise.Patient = patient;
        patientPerformsExercise.Exercise = exercise;
        yield patientPerformsExerciseRepository.save(patientPerformsExercise);
        return res.status(201).send(patientPerformsExercise);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
}));
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientPerformsExerciseRepository = index_1.dataSource.getRepository(PatientPerformsExercise_1.PatientPerformsExercise);
        const records = yield patientPerformsExerciseRepository.find({ relations: ["Patient", "Exercise"] });
        return res.status(200).send(records);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
}));
module.exports = router;
