import { Router } from "express";
import { dataSource } from "../index";
import { Exercise } from "../entity/Exercise";
import { FindOneOptions } from "typeorm";

const router = Router();

router.get("/", async (_req, res) => {
  const exerciseRepository = dataSource.getRepository(Exercise);
  const exercises = await exerciseRepository.find();
  return res.send(exercises);
});

router.post("/", async (req, res) => {
  try {
    const exerciseRepository = dataSource.getRepository(Exercise);
    const exercise = exerciseRepository.create(req.body);
    await exerciseRepository.save(exercise);
    return res.status(201).send(exercise);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/:exerciseId", async (req, res) => {
  try {
    const exerciseId = +req.params.exerciseId;
    const exerciseRepository = dataSource.getRepository(Exercise);

    const exercise = exerciseRepository.find({
      where: {
        ExerciseID: exerciseId,
      },
    });

    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }

    return res.status(200).send(exercise);
  } catch (error) {
    // error handling
  }
});






module.exports = router;
