import client, { Gauge } from 'prom-client'

export const activeRequests = new client.Gauge({
    name : 'active_requests',
    help : 'number of active requests'
});