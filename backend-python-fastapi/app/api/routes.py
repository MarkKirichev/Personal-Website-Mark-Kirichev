from fastapi import APIRouter
from .routes import flight_routes, user_routes

router = APIRouter()

router.include_router(flight_routes.router, prefix="/flights", tags=["flights"])
router.include_router(user_routes.router, prefix="/users", tags=["users"])
