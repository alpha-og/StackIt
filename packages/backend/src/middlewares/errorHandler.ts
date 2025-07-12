import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    console.error("❌ Internal Error:", err);

    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
};
