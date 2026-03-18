from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from .database import engine, Base
from .routers import employees, attendance, dashboard

load_dotenv()

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Human Resource Management System API",
    description="Human Resource Management System",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(employees.router)
app.include_router(attendance.router)
app.include_router(dashboard.router)


@app.get("/", tags=["Root"])
def root():
    return {
        "message": "HRMS ",
        "version": "1.0",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", tags=["Root"])
def health_check():
    return {"status": "healthy", "version": "2.0.0"}
