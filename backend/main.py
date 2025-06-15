
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  
from schemas import RegisterUser , LoginUser 
from database import user_collection
from utils import hash_password, verify_password, get_utc_now
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
def register(user: RegisterUser):
    if user_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username sudah digunakan")
    if user_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email sudah digunakan")
    
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hash_password(user.password),
        "created_at": get_utc_now(),
        "last_login": None
    }
    user_collection.insert_one(new_user)
    return {"message": "Register berhasil"}

@app.post("/login")
def login(user: LoginUser):
    db_user = user_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=404, detail="Email tidak ditemukan")
    
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Password salah")
    
    user_collection.update_one(
        {"email": user.email},
        {"$set": {"last_login": get_utc_now()}}
    )
    return {"message": "Login berhasil"}
