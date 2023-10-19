import { Router } from "express";
import { dataSource } from "../index";
import { Exercise } from "../entity/Exercise";


const router = Router();

router.get("/", async (_req, res) => {
  const exerciseRepository = dataSource.getRepository(Exercise);
  const exercises = await exerciseRepository.find();
  return res.send(exercises);
});

///Create a POST for exercis where we update progress_percentage, thumbs_up, thumbs_down, date_exercise_completed, rating, difficulty
router.post("/", async (req, res) => {
  const exerciseRepository = dataSource.getRepository(Exercise);
  const exercise = exerciseRepository.create(req.body);
  await exerciseRepository.save(exercise);
  return res.send(exercise);
});

router.delete("/:id", async (req, res) => {
  const exerciseRepository = dataSource.getRepository(Exercise);
  await exerciseRepository.delete(req.params.id);
  return res.send({ message: "Exercise deleted" });
});







module.exports = router;
