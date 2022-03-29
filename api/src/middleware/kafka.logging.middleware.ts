/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ILoggingMiddleware } from "../interfaces/ILoggingMiddleware";
import { Request, Response, NextFunction } from "express";
//import { v4 as uuidv4 } from 'uuid';
import kafkaUtils from "../utils/kafka.utils";

function getMessage(uuid: string, phase:string, endpoint: string, auth: string, runStart: number, status: number):any[]{
  const inner: string = JSON.stringify({
    runtime: Date.now() - runStart,
    phase,
    endpoint,
    status,
    auth 
  })
  return [{
    key: uuid,
    value: inner
  }];
}

const LOGGING_TOPIC = process.env.KAFKA_LOGGING_TOPIC || "please-configure-env.KAFKA_LOGGING_TOPIC";

function readAuth(req: Request): string{
  return req.headers.authorization || "unauthenticated";
}

async function Start(req: Request, res: Response, next: NextFunction): Promise<void> {
  res.locals.uuid = Date.now().toString();//uuidv4();
  res.locals.start = Date.now();
  res.statusCode
  const messages: any[] = getMessage(res.locals.uuid as string, "START", req.url, readAuth(req), res.locals.start as number, res.statusCode);
  await kafkaUtils.write(LOGGING_TOPIC, messages);
  next();
  return;
}

async function End(req: Request, res: Response, next: NextFunction): Promise<void> {

  const messages: any[] = getMessage(res.locals.uuid as string, "END", req.url, readAuth(req), res.locals.start as number, res.statusCode);
  await kafkaUtils.write(LOGGING_TOPIC, messages);
  next();
  return;
}

export default { Start, End } as ILoggingMiddleware;
