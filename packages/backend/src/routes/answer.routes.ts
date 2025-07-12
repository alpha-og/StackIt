import { Router } from "express";
import {
    postAnswer,
    acceptAnswer,
    deleteAnswer,
} from "../controllers/answer.controller.ts";
import { body } from "express-validator";
import isAuthenticated from "../middlewares/isAuthenticated.ts";

const router = Router();

router.post(
    "/questions/:id/answers",
    isAuthenticated,
    [body("content").isLength({ min: 5 }).withMessage("Content too short")],
    postAnswer,
);

router.put("/answers/:id/accept", isAuthenticated, acceptAnswer);

router.delete("/answers/:id", isAuthenticated, deleteAnswer);

export default router;
