from fastapi import APIRouter

from pydantic import BaseModel

from app.services.user_service import (
    register_user,
    authenticate_user
)

from app.core.security import (
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


class AuthRequest(BaseModel):

    username: str

    password: str


@router.post("/register")
async def register(
    data: AuthRequest
):

    return register_user(
        data.username,
        data.password
    )


@router.post("/login")
async def login(
    data: AuthRequest
):

    user = authenticate_user(
        data.username,
        data.password
    )

    if not user:

        return {

            "success": False,

            "message":
            "Invalid credentials"
        }

    token = create_access_token({

        "sub":
        user["username"]
    })

    return {

        "success": True,

        "access_token":
        token,

        "token_type":
        "bearer"
    }