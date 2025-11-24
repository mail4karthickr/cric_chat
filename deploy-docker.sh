#!/bin/bash

# Cricket Chat - Docker Deployment Script
# This script helps you deploy the Cricket Chat MCP server using Docker

set -e  # Exit on error

echo "🏏 Cricket Chat - Docker Deployment"
echo "===================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed"
    echo "Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Error: Docker Compose is not installed"
    echo "Please install Docker Compose"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file"
        echo ""
        echo "⚠️  IMPORTANT: Please edit .env and add your RAPIDAPI_KEY"
        echo "   Get your key from: https://rapidapi.com/cricketapi/api/cricbuzz-cricket"
        echo ""
        read -p "Press Enter after you've updated the .env file..."
    else
        echo "❌ Error: .env.example not found"
        exit 1
    fi
fi

# Check if RAPIDAPI_KEY is set
source .env
if [ -z "$RAPIDAPI_KEY" ] || [ "$RAPIDAPI_KEY" = "your_rapidapi_key_here" ]; then
    echo "❌ Error: RAPIDAPI_KEY is not set in .env file"
    echo "   Please edit .env and add your actual RapidAPI key"
    echo "   Get your key from: https://rapidapi.com/cricketapi/api/cricbuzz-cricket"
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Build and start the container
echo "🔨 Building and starting Docker container..."
echo ""

if docker compose version &> /dev/null; then
    docker compose up -d --build
else
    docker-compose up -d --build
fi

echo ""
echo "✅ Cricket Chat server is running!"
echo ""
echo "📊 Server Information:"
echo "   - URL: http://localhost:8000"
echo "   - Health Check: http://localhost:8000/health"
echo "   - MCP Endpoint: http://localhost:8000/mcp"
echo ""
echo "📝 Useful Commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop server: docker-compose down"
echo "   - Restart server: docker-compose restart"
echo "   - Check health: docker inspect --format='{{.State.Health.Status}}' cric-chat-server"
echo ""
echo "🎉 Setup complete!"
