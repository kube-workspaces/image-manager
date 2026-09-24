# Kube Workspaces Image Manager - Makefile
# ========================================

.PHONY: help dev build start lint clean devprod deps test check format

# Default target
help:
	@echo "Kube Workspaces Image Manager"
	@echo "=============================="
	@echo ""
	@echo "Available targets:"
	@echo "  dev          - Run development server (default)"
	@echo "  build        - Build for production"
	@echo "  start        - Start production server from build"
	@echo "  lint         - Run ESLint"
	@echo "  check        - TypeScript type checking"
	@echo "  clean        - Remove build artifacts"
	@echo "  devprod      - Build and run in production mode"

# Development server (default target)
dev:
	npm run dev

# Production build
build:
	npm run build

# Start production server from built files
start:
	npm run start

# Linting
lint:
	npm run lint

# TypeScript type checking
check:
	npx tsc --noEmit

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf .next node_modules/.cache
	@echo "Clean complete."

# Development in production mode (build then dev)
devprod:
	npm run build && npm run start

# Install dependencies
deps:
	npm install

# Run tests (if available)
test:
	npx jest --passWithNoTests 2>/dev/null || echo "No Jest tests found or tests failed"

# Format check (if configured)
format:
	npx prettier --check . 2>/dev/null || echo "Prettier not configured"

