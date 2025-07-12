import { Router } from "express";
import {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    deleteQuestion,
} from "../controllers/question.controller.ts";
import { body } from "express-validator";
import isAuthenticated from "../middlewares/isAuthenticated.ts";

const router = Router();

router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
router.post(
    "/",
    isAuthenticated,
    [
        body("title").isLength({ min: 5 }).withMessage("Title too short"),
        body("description").notEmpty().withMessage("Description is required"),
        body("tagIds").isArray().optional(),
    ],
    createQuestion,
);
router.delete("/:id", isAuthenticated, deleteQuestion);

export default router;
