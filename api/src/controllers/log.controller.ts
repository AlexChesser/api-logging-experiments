import { Router,  Request, Response, NextFunction  } from "express"
import { LoggerStart, LoggerEnd } from "../middleware/logging.middleware";

const router = Router()

async function stub(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log("stub", req.url)
    res.status(200).json({ message: "ok" });
    next();
    return;
}

router.get("/log", LoggerStart, stub, LoggerEnd);
router.post("/log", LoggerStart, stub, LoggerEnd);

export default router;