import { Router,  Response, NextFunction } from "express"
import { LoggerStart, LoggerEnd } from "../middleware/logging.middleware";

const router = Router()

async function stub(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log("stub", req.url)
    res.json({ message: "ok" });
    next();
}

router.get("/invoice", LoggerStart, stub, LoggerEnd);
router.post("/invoice", LoggerStart, stub, LoggerEnd);

export default router;