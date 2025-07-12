import type { Request, Response } from "express";
import { Tag } from "../models/tag.ts";

export const getTags = async (_: Request, res: Response) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (error) {
        console.error("Get tags error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createTag = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const existing = await Tag.findOne({ where: { name } });
        if (existing) {
            return res.status(400).json({ error: "Tag already exists" });
        }

        const tag = await Tag.create({ name });
        res.status(201).json(tag);
    } catch (error) {
        console.error("Create tag error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
