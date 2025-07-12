import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Answer, Question, User } from "../models/index.ts";

export const postAnswer = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id: questionId } = req.params;
        const { content } = req.body;

        const question = await Question.findByPk(questionId);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        const answer = await Answer.create({
            content,
            userId: req.user.id,
            questionId,
        });

        res.status(201).json(answer);
    } catch (error) {
        console.error("Error posting answer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const acceptAnswer = async (req: Request, res: Response) => {
    try {
        const { id: answerId } = req.params;

        const answer = await Answer.findByPk(answerId, {
            include: [Question],
        });

        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        if (answer.userId !== req.user.id) {
            return res
                .status(403)
                .json({ error: "Only question author can accept answers" });
        }

        answer.isAccepted = true;
        await answer.save();

        res.status(200).json({ message: "Answer accepted" });
    } catch (error) {
        console.error("Error accepting answer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteAnswer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const answer = await Answer.findByPk(id);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        if (answer.userId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await answer.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting answer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
