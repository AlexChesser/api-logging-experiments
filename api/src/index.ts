/**
 * @packageDocumentation A basic API for the purposes of testing a logging function
 */

 import express, {Application, Request, Response } from 'express';
 import  InvoiceController from './controllers/invoice.controller';
 import  PaymentController from './controllers/payment.controller';
 import  LogController from './controllers/log.controller'; 
 const PORT = 8000;
 const app: Application = express()
 
app.get('/', (req: Request,res: Response) => {
    console.log(req.url);
    res.send('Express + TypeScript Server')

});

app.use("/api/v1/", InvoiceController.router)
app.use("/api/v1/", LogController.router)
app.use("/api/v1/", PaymentController.router)
 
 app.listen(PORT, ()=>{
     console.log('server runnning')
 })
