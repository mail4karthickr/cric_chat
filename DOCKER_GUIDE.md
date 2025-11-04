# Docker Deployment Guide

This guide explains how to build and run the Cricket Chat MCP server using Docker.

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (usually comes with Docker Desktop)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Build and start the container:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker CLI

1. **Build the image:**
   ```bash
   docker build -t cric-chat:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name cric-chat-server \
     -p 8000:8000 \
     --env-file .env \
     cric-chat:latest
   ```

3. **View logs:**
   ```bash
   docker logs -f cric-chat-server
   ```

4. **Stop and remove the container:**
   ```bash
   docker stop cric-chat-server
   docker rm cric-chat-server
   ```

## Configuration

### Environment Variables

The `.env` file should already exist in the project root. Verify it contains:

```env
# RapidAPI Configuration (REQUIRED)
RAPIDAPI_KEY=your_actual_rapidapi_key_here
RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
CRICBUZZ_BASE_URL=https://cricbuzz-cricket.p.rapidapi.com

# Server Configuration (Optional)
SERVER_HOST=0.0.0.0
SERVER_PORT=8000
LOG_LEVEL=INFO
```

**Important:** Replace `your_actual_rapidapi_key_here` with your actual RapidAPI key from https://rapidapi.com/cricketapi/api/cricbuzz-cricket

If the `.env` file doesn't exist, create it from the example:
```bash
cp .env.example .env
```

### Port Mapping

By default, the application runs on port 8000. To use a different port:

**Docker Compose:**
Edit `docker-compose.yml` and change the ports mapping:
```yaml
ports:
  - "3000:8000"  # Maps host port 3000 to container port 8000
```

**Docker CLI:**
```bash
docker run -d -p 3000:8000 cric-chat:latest
```

## Health Check

The container includes a health check that monitors the `/health` endpoint:

```bash
# Check container health status
docker inspect --format='{{.State.Health.Status}}' cric-chat-server
```

## Development

### Rebuild after code changes:

**Docker Compose:**
```bash
docker-compose up -d --build
```

**Docker CLI:**
```bash
docker build -t cric-chat:latest .
docker stop cric-chat-server
docker rm cric-chat-server
docker run -d --name cric-chat-server -p 8000:8000 cric-chat:latest
```

### Interactive shell access:

```bash
docker exec -it cric-chat-server /bin/bash
```

## Testing

### Test the server is running:

```bash
# Health check
curl http://localhost:8000/health

# Server info
curl http://localhost:8000/info

# Available widgets
curl http://localhost:8000/widgets
```

## Production Deployment

### Best Practices:

1. **Use specific version tags:**
   ```bash
   docker build -t cric-chat:1.0.0 .
   ```

2. **Set resource limits:**
   ```bash
   docker run -d \
     --name cric-chat-server \
     -p 8000:8000 \
     --memory="512m" \
     --cpus="1.0" \
     cric-chat:latest
   ```

3. **Use Docker secrets for sensitive data** instead of environment variables

4. **Enable automatic restarts:**
   ```bash
   docker run -d --restart=unless-stopped cric-chat:latest
   ```

## Troubleshooting

### Container won't start:
```bash
# View container logs
docker logs cric-chat-server

# Check container status
docker ps -a
```

### Port already in use:
```bash
# Find what's using the port
lsof -i :8000

# Use a different port
docker run -d -p 8001:8000 cric-chat:latest
```

### Permission issues:
The container runs as a non-root user (uid 1000) for security. If you encounter permission issues with mounted volumes, ensure the files are readable by this user.

## Cleanup

### Remove container and image:
```bash
docker-compose down
docker rmi cric-chat:latest
```

### Remove all unused Docker resources:
```bash
docker system prune -a
```

## Multi-stage Build (Optional)

For smaller production images, consider using a multi-stage build. Edit the Dockerfile to add build and runtime stages.

## Container Registry

### Push to Docker Hub:
```bash
docker tag cric-chat:latest yourusername/cric-chat:latest
docker push yourusername/cric-chat:latest
```

### Pull from registry:
```bash
docker pull yourusername/cric-chat:latest
docker run -d -p 8000:8000 yourusername/cric-chat:latest
```
