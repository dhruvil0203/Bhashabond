"""
BhashaBond FastAPI Backend
Handles language data, phrasebook, and translation history sync.
Deployed on Railway with Supabase PostgreSQL.
"""

import os
import time
from collections import defaultdict
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="BhashaBond API",
    description="Backend for the BhashaBond offline-first translation app",
    version="1.0.0",
)

# CORS — allow all origins for mobile app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────── In-memory rate limiter (sliding window, per-IP) ───────────
# Limits: 30 requests/min per IP for translate, 60/min for other endpoints.
RATE_LIMIT_CONFIG = {
    "/api/translate": (30, 60),   # 30 requests per 60 seconds
    "__default__": (60, 60),       # 60 requests per 60 seconds
}

rate_limit_store = {}

# Periodically purge stale IP entries (every 300 requests globally)
RATE_LIMIT_PURGE_INTERVAL = 300
_rate_limit_request_count = 0

def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    # Skip rate limiting for health checks and docs
    if request.url.path in ("/api/health", "/", "/docs", "/openapi.json"):
        return await call_next(request)

    client_ip = get_client_ip(request)
    now = time.time()

    # Determine limit for this path
    limit, window = RATE_LIMIT_CONFIG.get(request.url.path, RATE_LIMIT_CONFIG["__default__"])

    # Initialize or clean up old entries
    if client_ip not in rate_limit_store:
        rate_limit_store[client_ip] = {}
    ip_store = rate_limit_store[client_ip]

    # Prune expired entries
    cutoff = now - window
    ip_store[request.url.path] = [t for t in ip_store.get(request.url.path, []) if t > cutoff]

    # Check limit
    if len(ip_store.get(request.url.path, [])) >= limit:
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests. Please slow down."},
            headers={"Retry-After": str(int(window))},
        )

    # Record this request
    ip_store.setdefault(request.url.path, []).append(now)

    # Periodically purge stale IP entries to prevent unbounded memory growth
    global _rate_limit_request_count
    _rate_limit_request_count += 1
    if _rate_limit_request_count >= RATE_LIMIT_PURGE_INTERVAL:
        _rate_limit_request_count = 0
        cutoff = now - 120  # sweep entries older than 2x the default window
        stale_ips = [
            ip for ip, paths in rate_limit_store.items()
            if all(
                all(t < cutoff for t in timestamps)
                for timestamps in paths.values()
            )
        ]
        for ip in stale_ips:
            del rate_limit_store[ip]

    return await call_next(request)


# Import and include routers
from routers import languages, phrasebook, history, translate

app.include_router(languages.router, prefix="/api", tags=["Languages"])
app.include_router(phrasebook.router, prefix="/api", tags=["Phrasebook"])
app.include_router(history.router, prefix="/api", tags=["History"])
app.include_router(translate.router, prefix="/api", tags=["Translation"])


@app.get("/api/health")
async def health_check():
    """Health check endpoint for Railway monitoring."""
    return {"status": "healthy", "service": "bhashabond-api"}


@app.get("/")
async def root():
    return {"message": "BhashaBond API v1.0.0", "docs": "/docs"}
