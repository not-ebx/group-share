import { Request, Response } from "express";
import { SessionData } from "express-session";
import { Redis } from "ioredis";

export type ContextType = {
    req: Request & SessionData;
    redis: Redis;
    res: Response;
}