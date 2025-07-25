import { activeRequests } from './activeReqs'
import { requestCounter } from './requestCount'
import { httpRequestTime } from './requestTime'
import { Response , NextFunction , Request } from 'express'

export const metricsMiddleware = (req : Request , res : Response , next : NextFunction)=> {
    const startTime = Date.now();
    activeRequests.inc();

    res.on('finish' , function(){
        const endTime = Date.now();
        const duration = endTime - startTime;

        requestCounter.inc({
            method : req.method , 
            route : req.route ? req.route.path : req.path ,
            status_code : res.statusCode.toString()
        })

        httpRequestTime.observe({
            method : req.method , 
            route : req.route ? req.route.path : req.path ,
            status_code : res.statusCode.toString()
        }, duration)

        activeRequests.dec();
    });
    next();
}