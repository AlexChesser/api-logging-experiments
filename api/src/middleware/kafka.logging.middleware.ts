/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ILoggingMiddleware } from "../interfaces/ILoggingMiddleware";
import { Request, Response, NextFunction } from "express";
import kafkaUtils from "../utils/kafka.utils";

function getMessage(phase:string, url: string, auth: string):any[]{
  const inner: string = JSON.stringify({
    timestamp: Date.now(),
    phase,
    url,
    auth 
  })
  return [{
    value: inner
  }];
}

const LOGGING_TOPIC = process.env.KAFKA_LOGGING_TOPIC || "please-configure-env.KAFKA_LOGGING_TOPIC";

function readAuth(req: Request): string{
  return req.headers.authorization || "unauthenticated";
}

async function Start(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const messages: any[] = getMessage("END", req.url, readAuth(req));
  await kafkaUtils.write(LOGGING_TOPIC, messages);
  next();
  return;
}

async function End(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const messages: any[] = getMessage("END", req.url, readAuth(req));
  await kafkaUtils.write(LOGGING_TOPIC, messages);
  next();
  return;
}

export default { Start, End } as ILoggingMiddleware;
