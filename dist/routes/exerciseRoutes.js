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
const index_1 = require("../index");
const Exercise_1 = require("../entity/Exercise");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exerciseRepository = index_1.dataSource.getRepository(Exercise_1.Exercise);
    const exercises = yield exerciseRepository.find();
    return res.send(exercises);
}));
///Create a POST for exercis where we update progress_percentage, thumbs_up, thumbs_down, date_exercise_completed, rating, difficulty
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exerciseRepository = index_1.dataSource.getRepository(Exercise_1.Exercise);
    const exercise = exerciseRepository.create(req.body);
    yield exerciseRepository.save(exercise);
    return res.send(exercise);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exerciseRepository = index_1.dataSource.getRepository(Exercise_1.Exercise);
    yield exerciseRepository.delete(req.params.id);
    return res.send({ message: "Exercise deleted" });
}));
module.exports = router;
