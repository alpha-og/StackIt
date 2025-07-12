import type { Request, Response } from "express";
import { Vote, Answer } from "../models/index.ts";

export const voteAnswer = async (req: Request, res: Response) => {
    try {
        const { id: answerId } = req.params;
        const { type } = req.body;

        if (!["upvote", "downvote"].includes(type)) {
            return res.status(400).json({ error: "Invalid vote type" });
        }

        const answer = await Answer.findByPk(answerId);
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        const [vote, created] = await Vote.findOrCreate({
            where: {
                userId: req.user.id,
                answerId,
            },
            defaults: {
                userId: req.user.id,
                answerId,
                type,
            },
        });

        if (!created) {
            return res.status(400).json({ error: "Already voted" });
        }

        res.status(201).json(vote);
    } catch (error) {
        console.error("Vote error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const removeVote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const vote = await Vote.findByPk(id);

        if (!vote || vote.userId !== req.user.id) {
            return res
                .status(404)
                .json({ error: "Vote not found or unauthorized" });
        }

        await vote.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Remove vote error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
