import { Router } from "express";

import questionRoutes from "./question.routes.ts";
import answerRoutes from "./answer.routes.ts";
import voteRoutes from "./vote.routes.ts";
import tagRoutes from "./tag.routes.ts";
import notificationRoutes from "./notification.routes.ts";
import authRoutes from "./authRoutes.ts";

const router = Router();

router.use("/questions", questionRoutes);
router.use("/answers", answerRoutes);
router.use("/votes", voteRoutes);
router.use("/tags", tagRoutes);
router.use("/notifications", notificationRoutes);
router.use("/auth", authRoutes);

export default router;
