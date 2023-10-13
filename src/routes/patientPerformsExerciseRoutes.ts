import { Router } from "express";
import { PatientPerformsExercise } from "../entity/PatientPerformsExercise";
import { Patient } from "../entity/Patient";
import { Exercise } from "../entity/Exercise";
import { dataSource } from "../index";

const router = Router();



router.post("/", async (req, res) => {
    try {
        const { PatientID, ExerciseID } = req.body;

        const patientRepository = dataSource.getRepository(Patient);
        const exerciseRepository = dataSource.getRepository(Exercise);
        const patientPerformsExerciseRepository = dataSource.getRepository(PatientPerformsExercise);

        const patient = await patientRepository.findOne(PatientID);
        const exercise = await exerciseRepository.findOne(ExerciseID);

        if (!patient || !exercise) {
            return res.status(404).send("Patient or Exercise not found");
        }

        const patientPerformsExercise = new PatientPerformsExercise();
        patientPerformsExercise.Patient = patient;
        patientPerformsExercise.Exercise = exercise;

        await patientPerformsExerciseRepository.save(patientPerformsExercise);

        return res.status(201).send(patientPerformsExercise);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
});

router.get("/", async (_req, res) => {
    try {
        const patientPerformsExerciseRepository = dataSource.getRepository(PatientPerformsExercise);
        const records = await patientPerformsExerciseRepository.find({ relations: ["Patient", "Exercise"] });

        return res.status(200).send(records);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
});


module.exports = router;
