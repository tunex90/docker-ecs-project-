# CloudPulse API

A personal Node.js REST API containerised with Docker and deployed to AWS ECS Fargate.

## Tech Stack

- Node.js + Express
- Docker (multi-stage build)
- AWS ECR (container registry)
- AWS ECS Fargate (container orchestration)

## Project Structure

```
├── src/
│   └── index.js          # Express app
├── Dockerfile            # Multi-stage Docker build
├── package.json
└── task-definition.json  # ECS task definition
```

## API Endpoints

| Method | Endpoint  | Description              |
|--------|-----------|--------------------------|
| GET    | `/`       | Welcome page             |
| GET    | `/health` | Health check + version   |

## Running Locally

```bash
# Build the image
docker build -t academy-api:1.0 .

# Run the container
docker run -p 3000:3000 academy-api:1.0
```

App will be available at `http://localhost:3000`

## Deploying to AWS ECS

### 1. Authenticate Docker with ECR
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
```

### 2. Build and push image to ECR
```bash
docker build -t academy-api:1.0 .
docker tag academy-api:1.0 <account-id>.dkr.ecr.us-east-1.amazonaws.com/academy-api:1.0
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/academy-api:1.0
```

### 3. Register task definition
```bash
aws ecs register-task-definition \
    --cli-input-json file://task-definition.json \
    --region us-east-1
```

### 4. Create ECS service
```bash
aws ecs create-service \
    --cluster academy-cluster \
    --service-name academy-api-service \
    --task-definition academy-api:1 \
    --desired-count 2 \
    --launch-type FARGATE \
    --region us-east-1
```
