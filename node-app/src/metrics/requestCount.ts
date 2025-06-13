import client from 'prom-client'

export const requestCounter = new client.Counter({
    name : "http_request_total" ,
    help : "total number of http requests" ,
    labelNames : ['method' , 'route' , 'status_code']
});