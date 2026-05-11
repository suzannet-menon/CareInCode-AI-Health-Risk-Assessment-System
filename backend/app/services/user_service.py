from app.core.security import (
    hash_password,
    verify_password
)

users_db = {}


def register_user(
    username: str,
    password: str
):

    if username in users_db:

        return {
            "success": False,
            "message":
            "User already exists"
        }

    users_db[username] = {

        "username":
        username,

        "password":
        hash_password(password)
    }

    return {
        "success": True
    }


def authenticate_user(
    username: str,
    password: str
):

    user = users_db.get(username)

    if not user:

        return None

    if not verify_password(
        password,
        user["password"]
    ):

        return None

    return user