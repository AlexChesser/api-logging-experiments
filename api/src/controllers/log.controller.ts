/* eslint-disable @typescript-eslint/unbound-method */
import { Router,  Request, Response, NextFunction  } from "express"
import { IAPIController } from "../interfaces/IAPIController";
import Console from "../middleware/console.logging.middleware";
import KafkaLogging from "../middleware/kafka.logging.middleware";
const router = Router()

function stub(req: Request, res: Response, next: NextFunction): void {
    console.log("stub", req.url)
    res.status(200).json({ message: "ok" });
    next();
    return;
}

router.get("/log", KafkaLogging.Start, Console.Start, stub, Console.End, KafkaLogging.End);
router.post("/log", KafkaLogging.Start, Console.Start, stub, Console.End, KafkaLogging.End);

export default { router } as IAPIController;