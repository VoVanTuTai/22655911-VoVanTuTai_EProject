<div align="center">

# E-commerce Microservices System

**A Dockerized e-commerce backend with Auth, Product, and Order services behind an API Gateway.**

[![Node.js](https://img.shields.io/badge/Node.js-Express.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Pub%2FSub-FF6600?logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Mocha](https://img.shields.io/badge/Tests-Mocha-8D6748?logo=mocha&logoColor=white)](https://mochajs.org/)

</div>

## Overview

E-commerce Microservices System is a small backend system that demonstrates microservice boundaries, API Gateway routing, database-per-service ownership, asynchronous messaging with RabbitMQ, Docker Compose infrastructure, and service-level tests.

The system demonstrates:

- Authentication and JWT-based access control.
- Product creation, product listing, and product lookup.
- Order creation through an asynchronous Product -> Order workflow.
- Separate MongoDB databases for Auth, Product, and Order services.
- Docker Compose orchestration for services, databases, RabbitMQ, and the API Gateway.
- GitHub Actions workflow for service tests, Docker image builds, and deployment-shaped checks.

> **Project status:** this repository is suitable for learning and demonstrating core microservice concepts. It is intentionally compact and should be hardened further before production use.

## Architecture

```text
Client / Postman
      |
      v
API Gateway :3003
      |
      +--> Auth Service :3000 ----> auth-db
      |
      +--> Product Service :3001 -> product-db
      |          |
      |          +-- publishes order request --> RabbitMQ
      |                                      |
      +--> Order Service :3002 <------------+
                 |
                 +--------------------------> order-db
```

## Services

| Service | Port | Database / dependency | Responsibility |
| --- | ---: | --- | --- |
| `api-gateway` | 3003 | Auth, Product, Order services | Routes `/auth`, `/products`, and `/orders` traffic |
| `auth` | 3000 | MongoDB `auth_db` | Registration, login, JWT issuance, protected dashboard route |
| `product` | 3001 | MongoDB `product_db`, RabbitMQ | Product CRUD-style endpoints and order request publishing |
| `order` | 3002 | MongoDB `order_db`, RabbitMQ | Consumes order messages and persists order documents |
| `rabbitmq` | 5672 / 15672 | RabbitMQ management UI | Message broker for asynchronous workflow |
| `auth-db` | 27018 | MongoDB | Auth service database |
| `product-db` | 27019 | MongoDB | Product service database |
| `order-db` | 27020 | MongoDB | Order service database |

## Main Workflow

```text
User registers or logs in
-> receives JWT token
-> creates or views products
-> submits a buy request through Product Service
-> Product Service publishes an order message to RabbitMQ
-> Order Service consumes the message
-> Order Service stores the order in its own MongoDB database
```

## API Gateway Routes

| Gateway path | Target service |
| --- | --- |
| `/auth/*` | `auth:3000` |
| `/products/*` | `product:3001` |
| `/orders/*` | `order:3002` |

## Repository Structure

```text
.
|-- api-gateway/           # Express gateway using http-proxy
|-- auth/                  # Auth service, JWT logic, user model, tests
|-- product/               # Product service, product model, RabbitMQ publisher/consumer logic
|-- order/                 # Order service and RabbitMQ consumer
|-- utils/                 # Shared authentication helper
|-- .github/workflows/     # Microservices CI/CD workflow
|-- docker-compose.yml     # Local microservice stack
|-- package.json           # Root test command
`-- README.md
```

## Local Development

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- npm

### Start with Docker Compose

```bash
docker compose up --build
```

Main endpoints:

```text
API Gateway: http://localhost:3003
Auth:        http://localhost:3000
Product:     http://localhost:3001
Order:       http://localhost:3002
RabbitMQ UI: http://localhost:15672
```

### Run tests

From the root:

```bash
npm test
```

Or run service-level tests:

```bash
cd auth && npm test
cd ../product && npm test
```

## Example API Flow

Register:

```http
POST /auth/register
```

Login:

```http
POST /auth/login
```

Create product:

```http
POST /products/api/products
Authorization: Bearer <token>
```

Buy products:

```http
POST /products/api/products/buy
Authorization: Bearer <token>
```

## Evidence

The original project includes Postman, MongoDB Compass, Docker, and GitHub Actions screenshots that demonstrate registration, login, product creation, order creation, database persistence, and CI/CD workflow execution.

| Scenario | Screenshot |
| --- | --- |
| Dockerized MongoDB data mapping | <img width="360" alt="MongoDB data mapping" src="https://github.com/user-attachments/assets/4910f24a-830b-4f60-b032-466dad471bb7" /> |
| Successful registration | <img width="360" alt="Successful registration" src="https://github.com/user-attachments/assets/77e226ad-c1cd-4d59-ade7-0c70ef1a705e" /> |
| Product list after creation | <img width="360" alt="Product list after creation" src="https://github.com/user-attachments/assets/806026ee-54a4-41fe-b31b-7aa07bc21f8f" /> |
| Order creation | <img width="360" alt="Order creation" src="https://github.com/user-attachments/assets/76c61097-9c66-449e-ac34-086833ef59bf" /> |
| GitHub Actions workflow | <img width="360" alt="GitHub Actions workflow" src="https://github.com/user-attachments/assets/78b8cdbe-5c26-420d-9cfc-fe3141a59974" /> |

## Current Limitations

- This is a learning-oriented microservices project and is intentionally smaller than production systems.
- Some service scripts are minimal; build and deployment behavior is mostly demonstrated through Docker and GitHub Actions.
- Authentication, authorization, validation, observability, and error handling should be expanded before production use.
- The asynchronous order workflow demonstrates RabbitMQ messaging, but production-grade retries, idempotency, and dead-letter handling are not yet fully implemented.
