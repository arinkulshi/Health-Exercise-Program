import { Router } from "express";
import { dataSource } from "../index";
import { Patient } from "../entity/Patient";

const router = Router();



router.post("/", async (req, res) => {
    const patientRepository = dataSource.getRepository(Patient);
    const patient = patientRepository.create(req.body);
    await patientRepository.save(patient);
    return res.send(patient);
});

router.get("/", async (_req, res) => {
    const patientRepository = dataSource.getRepository(Patient);
    const patients = await patientRepository.find();
    return res.send(patients);
});



router.delete("/:id", async (req, res) => {
    const patientRepository = dataSource.getRepository(Patient);
    await patientRepository.delete(req.params.id);
    return res.send({ message: "Patient deleted" });
});

module.exports = router;


