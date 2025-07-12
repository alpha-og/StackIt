import type { Request, Response } from "express";
import { Notification } from "../models/index.ts";

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.findAll({
            where: { userId: req.user.id },
            order: [["createdAt", "DESC"]],
        });

        res.json(notifications);
    } catch (error) {
        console.error("Error getting notifications:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const markNotificationRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findOne({
            where: {
                id,
                userId: req.user.id,
            },
        });

        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Error updating notification:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
