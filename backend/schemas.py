from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class RegisterUser(BaseModel):
    username: str = Field(..., min_length=3)
    email: EmailStr
    password: str = Field(..., min_length=6)

class LoginUser(BaseModel):
    email: EmailStr
    password: str

class ShowUser(BaseModel):
    username: str
    email: EmailStr
    created_at: datetime
    last_login: Optional[datetime] = None


