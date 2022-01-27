/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ILoggingMiddleware } from "../interfaces/ILoggingMiddleware";
import { Request, Response, NextFunction } from "express";
import kafkaUtils from "../utils/kafka.utils";

function getMessage(phase:string, url: string, auth: string):string{
  return JSON.stringify({
    timestamp: Date.now(),
    phase,
    url,
    auth 
  })
}

async function Start(req: Request, _res: Response, next: NextFunction): Promise<void> {
  // TODO: revert to strict types
  const kafka: any = kafkaUtils.getInstance();
  const producer: any = kafka.producer();
  // TODO: generate and store a request guid on the request / session object 
  // so that the END call to the logger can be reliably tied to the beginning call.
  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_LOGGING_TOPIC || "please-configure-env.KAFKA_LOGGING_TOPIC",
    messages: [{
      value: getMessage("START", req.url, req.headers.authorization || "unauthenticated")
    }]
  });
  next();
  await producer.disconnect();
  return;
}

async function End(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const kafka: any = kafkaUtils.getInstance();
  const producer: any = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_LOGGING_TOPIC || "please-configure-env.KAFKA_LOGGING_TOPIC",
    messages: [{
      value: getMessage("END", req.url, req.headers.authorization || "unauthenticated")
    }]
  });
  next();
  await producer.disconnect();
  return;
}

export default { Start, End } as ILoggingMiddleware;
