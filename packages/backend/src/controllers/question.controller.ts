import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Question, Tag, User } from "../models/index.ts";

export const getAllQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await Question.findAll({
            include: [
                { model: User, attributes: ["id", "username"] },
                { model: Tag },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getQuestionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const question = await Question.findByPk(id, {
            include: [
                { model: User, attributes: ["id", "username"] },
                { model: Tag },
            ],
        });

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.json(question);
    } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createQuestion = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tagIds } = req.body;

        const question = await Question.create({
            title,
            description,
            userId: req.user.id, // from auth middleware
        });

        if (tagIds && tagIds.length > 0) {
            await question.setTags(tagIds); // many-to-many association
        }

        res.status(201).json(question);
    } catch (error) {
        console.error("Error creating question:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        if (question.userId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await question.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
