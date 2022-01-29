import { Request, Response, NextFunction } from "express"

export interface ILoggingMiddleware {
    Start(req: Request, res: Response, next: NextFunction) : void;
    End(req: Request, res: Response, next: NextFunction) : void;
}