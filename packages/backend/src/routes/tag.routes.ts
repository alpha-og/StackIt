import { Router } from "express";
import { getTags, createTag } from "../controllers/tag.controller.ts";
import isAuthenticated from "../middlewares/isAuthenticated.ts";
import { body } from "express-validator";

const router = Router();

router.get("/", getTags);

router.post(
    "/",
    isAuthenticated,
    [body("name").isString().notEmpty()],
    createTag,
);

export default router;
