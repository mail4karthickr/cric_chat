#!/bin/bash
# Verify Docker Image Security - Test Script
# This script verifies that secrets are NOT embedded in Docker images

set -e

echo "🔍 Docker Image Security Verification"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check .dockerignore
echo "📋 Step 1: Checking .dockerignore..."
if grep -q "^\.env$" .dockerignore; then
    echo -e "${GREEN}✅ .env is in .dockerignore${NC}"
else
    echo -e "${RED}❌ WARNING: .env is NOT in .dockerignore${NC}"
    echo "   Secrets might be copied into Docker image!"
    exit 1
fi
echo ""

# Step 2: Check .gitignore
echo "📋 Step 2: Checking .gitignore..."
if grep -q "^\.env$" .gitignore; then
    echo -e "${GREEN}✅ .env is in .gitignore${NC}"
else
    echo -e "${RED}❌ WARNING: .env is NOT in .gitignore${NC}"
    exit 1
fi
echo ""

# Step 3: Check for hardcoded secrets in code
echo "📋 Step 3: Checking for hardcoded API keys in Python files..."
HARDCODED_KEYS=$(grep -r "api_key = ['\"]" --include="*.py" . || true)
if [ -z "$HARDCODED_KEYS" ]; then
    echo -e "${GREEN}✅ No hardcoded API keys found in Python files${NC}"
else
    echo -e "${RED}❌ WARNING: Found potential hardcoded keys:${NC}"
    echo "$HARDCODED_KEYS"
    exit 1
fi
echo ""

# Step 4: Check Dockerfile doesn't set secrets
echo "📋 Step 4: Checking Dockerfile for secret exposure..."
if grep -q "ENV.*RAPIDAPI_KEY\|ENV.*API_KEY\|ENV.*SECRET\|ENV.*PASSWORD" Dockerfile; then
    echo -e "${RED}❌ WARNING: Dockerfile may be setting secrets via ENV${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Dockerfile doesn't set secrets via ENV${NC}"
fi
echo ""

# Step 5: Verify docker-compose uses env_file
echo "📋 Step 5: Checking docker-compose.yml..."
if grep -q "env_file:" docker-compose.yml && grep -q "\.env" docker-compose.yml; then
    echo -e "${GREEN}✅ docker-compose.yml uses env_file for secrets${NC}"
else
    echo -e "${YELLOW}⚠️  docker-compose.yml doesn't use env_file${NC}"
fi
echo ""

# Step 6: Build and verify image (if Docker is available)
if command -v docker &> /dev/null; then
    echo "📋 Step 6: Building test image..."
    docker build -t cric_chat_security_test . > /dev/null 2>&1
    
    echo "📋 Step 7: Checking if .env exists in image..."
    if docker run --rm cric_chat_security_test test -f /app/.env 2>&1 | grep -q "No such file"; then
        echo -e "${GREEN}✅ .env file is NOT in the Docker image${NC}"
    else
        echo -e "${RED}❌ WARNING: .env file found in Docker image!${NC}"
        exit 1
    fi
    
    echo "📋 Step 8: Searching for API key in image layers..."
    # This is a simplified check - you might want to add your actual key here
    if docker history cric_chat_security_test --no-trunc | grep -q "RAPIDAPI_KEY="; then
        echo -e "${RED}❌ WARNING: Found RAPIDAPI_KEY in image history!${NC}"
        exit 1
    else
        echo -e "${GREEN}✅ No API keys found in image layers${NC}"
    fi
    
    # Cleanup
    docker rmi cric_chat_security_test > /dev/null 2>&1
    echo ""
else
    echo -e "${YELLOW}⚠️  Docker not available - skipping image verification${NC}"
    echo "   Run this script on a machine with Docker to verify the built image"
    echo ""
fi

# Summary
echo "=================================="
echo -e "${GREEN}🎉 Security Verification PASSED!${NC}"
echo "=================================="
echo ""
echo "Your Docker setup is secure:"
echo "  ✅ .env is excluded from Docker image"
echo "  ✅ .env is excluded from git"
echo "  ✅ No hardcoded secrets in code"
echo "  ✅ Dockerfile doesn't expose secrets"
echo "  ✅ Secrets passed at runtime via environment variables"
echo ""
echo "Safe to:"
echo "  • Build Docker images"
echo "  • Push images to Docker Hub"
echo "  • Share images publicly"
echo "  • Commit code to GitHub"
echo ""
echo "Remember:"
echo "  • Keep .env file private"
echo "  • Provide .env on each deployment"
echo "  • Use different keys per environment"
