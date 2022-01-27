/**
 * @packageDocumentation A basic API for the purposes of testing a logging function
 */

import express, { Application, Request, Response } from "express";
import InvoiceController from "./controllers/invoice.controller";
import PaymentController from "./controllers/payment.controller";
import LogController from "./controllers/log.controller";
import KafkaUtils from "./utils/kafka.utils";

const PORT = 8000;
const app: Application = express();

async function initialize(){
    await KafkaUtils.initialize();
    console.log("kafka initialzation complete");
    app.get("/", (req: Request, res: Response) => {
        console.log(req.url);
        res.send("Express + TypeScript Server");
      });
      
      app.use("/api/v1/", InvoiceController.router);
      app.use("/api/v1/", LogController.router);
      app.use("/api/v1/", PaymentController.router);
      
      app.listen(PORT, () => {
        console.log("server runnning");
      });
}
initialize()
.catch((er) => {
    console.log(er)
});

process.on("uncaughtException", (er) => {
  console.error(er.message, er.stack);
  throw er;
});

export default app;
