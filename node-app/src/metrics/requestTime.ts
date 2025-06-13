import client from 'prom-client'

export const httpRequestTime = new client.Histogram({
    name : 'http_request_time',
    help : 'duration of HTTP requests in ms',
    labelNames : ['method' , 'route' , 'status_code'],
    buckets :[0.1 , 5, 15 , 50 , 100 , 300 , 500 , 1000 , 3000 , 5000]
});