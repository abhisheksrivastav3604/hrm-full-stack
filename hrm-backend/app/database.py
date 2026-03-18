from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# PostgreSQL connection URL
# Format: postgresql://user:password@host:port/dbname

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://hrmdatabase_t0o1_user:u0IDXRKvL3keXU9btLlgXt9TYnxg06AC@dpg-d6sq1k7fte5s73fdssbg-a.singapore-postgres.render.com:5432/hrmdatabase_t0o1?sslmode=require"
)

# For Render/Railway the URL may start with "postgres://" – SQLAlchemy requires "postgresql://"
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,       # verify connections before use
    pool_size=10,             # max persistent connections
    max_overflow=20,          # extra connections under load
    pool_recycle=300,         # recycle connections every 5 min
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
