# Node.js Monitoring with Prometheus & Grafana

This project demonstrates a **production-style monitoring setup** using **Prometheus** and **Grafana** for a **Node.js application deployed on EC2 instances**. It includes:

- A **Node.js HTTP app** instrumented with custom Prometheus metrics.
- **Prometheus** running on a separate EC2 instance, scraping metrics from Node.js servers.
- **Grafana** configured with dashboards to visualize performance data.
- Monitoring of:
  - HTTP requests
  - Request latency
  - Active connections
  - System metrics via `node-exporter`

---

## Key Features

### Node.js App
- Built using Express.js
- Exposes metrics at `/metrics`
- Custom Prometheus metrics implemented:
  - `http_requests_total`
  - `http_request_duration_seconds`
  - `active_requests`
  - `response_count`

### Prometheus
- Scrapes:
  - Node.js app metrics (`/metrics`)
  - `node-exporter` metrics from both EC2s
- Configured using `prometheus.yml`
- Runs inside Docker

### Grafana
- Pre-installed dashboards:
  - Node.js metrics dashboard
  - EC2 system metrics via `node-exporter`
- Login:
  - Default: `admin / admin` (should be changed)

---

## EC2 Architecture
| Component      | Instance | Port | Purpose                          |
|----------------|----------|------|----------------------------------|
| Node.js App    | EC2 #1   | 3000 | Application exposing metrics     |
| Node Exporter  | EC2 #1   | 9100 | System-level metrics exporter    |
| Prometheus     | EC2 #2   | 9090 | Scrapes targets and stores data |
| Grafana        | EC2 #2   | 3001 | Visualizes metrics               |
| Node Exporter  | EC2 #2   | 9100 | System-level metrics exporter    |

---

## CI/CD Highlights
- GitHub Actions workflow to:
  - Build Docker images
  - Push to Docker Hub
  - Deploy to EC2 via SCP + SSH
- Separate workflows for:
  - Backend app deployment
  - Prometheus + Grafana deployment

---

## Future Enhancements
- Add alerting via Alertmanager
- Implement centralized logging using tools like Loki + Grafana, ELK stack, or Fluent Bit
- Integrate Slack/email notifications
- Use dynamic service discovery (e.g., EC2 tags or ECS)
- Add frontend UI to display EC2 health in-browser