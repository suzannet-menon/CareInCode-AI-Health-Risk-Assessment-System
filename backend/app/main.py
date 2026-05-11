from fastapi import FastAPI

from app.api.routes import health
from app.api.routes import analysis
from app.api.routes import upload
from app.api.routes import export
from app.api.routes import auth
from app.api.routes import history
from app.api.routes import vitals

from app.core.config import settings


# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME
)


# Register routers
app.include_router(health.router)
app.include_router(analysis.router)
app.include_router(upload.router)
app.include_router(export.router)
app.include_router(auth.router)
app.include_router(history.router)
app.include_router(vitals.router)


# Root endpoint
@app.get("/")
def root():

    return {
        "message": "CareInCode+ backend running",
        "status": "ok"
    }