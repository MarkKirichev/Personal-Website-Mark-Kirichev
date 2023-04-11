from typing import Dict
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

users_db: Dict[str, User] = {
    "admin": User(username="admin", password="$2b$12$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
}

