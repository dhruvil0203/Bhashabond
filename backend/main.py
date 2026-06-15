"""
BhashaBond FastAPI Backend
Handles language data, phrasebook, and translation history sync.
Deployed on Railway with Supabase PostgreSQL.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
