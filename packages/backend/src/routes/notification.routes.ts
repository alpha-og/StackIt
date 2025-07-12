import { Router } from "express";
import {
    getNotifications,
    markNotificationRead,
} from "../controllers/notification.controller.ts";
import isAuthenticated from "../middlewares/isAuthenticated.ts";

const router = Router();

router.get("/", isAuthenticated, getNotifications);
router.put("/:id/read", isAuthenticated, markNotificationRead);

export default router;
