import { Request, Response, NextFunction } from "express"
export async function LoggerStart(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    console.log(Date.now(), "started request", req.url, req.headers.authorization);
    next();
  }

  export async function LoggerEnd(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    console.log(Date.now(), "ended request", req.url, req.headers.authorization);
    next();
  }