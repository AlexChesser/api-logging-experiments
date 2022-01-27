/**
 * @packageDocumentation A basic API for the purposes of testing a logging function
 */

 import express, {Application, Request, Response } from 'express';
 const PORT = 8000;
 const app: Application = express()
 
app.get('/', (req: Request,res: Response) => {
    console.log(req.url);
    res.send('Express + TypeScript Server')

});

app.use("/api/v1/", require("./controllers/invoice.controller").default)
app.use("/api/v1/", require("./controllers/payment.controller").default)
app.use("/api/v1/", require("./controllers/log.controller").default)
 
 app.listen(PORT, ()=>{
     console.log('server runnning')
 })
