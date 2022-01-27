import { ILoggingMiddleware } from "../interfaces/ILoggingMiddleware";
import { Request, Response, NextFunction } from "express"
 function Start(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    console.log(Date.now(), "started request", req.url, req.headers.authorization);
    next();
    return;
  }

  function End(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    console.log(Date.now(), "ended request", req.url, req.headers.authorization);
    next();
    return;
  }
  
  export default { Start, End } as ILoggingMiddleware
