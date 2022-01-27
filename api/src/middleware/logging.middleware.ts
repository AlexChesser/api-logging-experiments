import { Request, Response, NextFunction } from "express"
export function LoggerStart(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    console.log(Date.now(), "started request", req.url, req.headers.authorization);
    next();
    return;
  }

  export function LoggerEnd(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    console.log(Date.now(), "ended request", req.url, req.headers.authorization);
    next();
    return;
  }