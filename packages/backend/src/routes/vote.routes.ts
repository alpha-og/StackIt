import { Router } from "express";
import { voteAnswer, removeVote } from "../controllers/vote.controller.ts";
import isAuthenticated from "../middlewares/isAuthenticated.ts";
import { body } from "express-validator";

const router = Router();

router.post(
    "/answers/:id/vote",
    isAuthenticated,
    [body("type").isIn(["upvote", "downvote"])],
    voteAnswer,
);

router.delete("/votes/:id", isAuthenticated, removeVote);

export default router;
