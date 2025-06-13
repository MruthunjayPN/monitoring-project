import express from "express";
import client from "prom-client"
import { metricsMiddleware } from "./metrics/indexx";

const app = express()
app.use(express.json())
app.use(metricsMiddleware)

app.get('/cpu' , (req , res)=> {
    for(let i=0 ; i<100000 ; i++){
        Math.random();
    }
    res.json({
        message : "cpu endpoint hit."
    });
})

app.post('/user' , (req , res) => {
    const body = req.body ;
    res.send({
        name : "john doe" ,
        age : "28"
    })
});

app.get('/delay' ,  async(req , res) => {
    const delay = await new Promise((resolve) => setTimeout(resolve , 1000)); 
    res.send({
        message : "delay with 1s"
    })
})

app.get('/metrics' , async(req ,res)=> {
    const metrics = await client.register.metrics();
    res.set('Content-type' , client.register.contentType);
    res.end(metrics);    
})

app.listen(3000);