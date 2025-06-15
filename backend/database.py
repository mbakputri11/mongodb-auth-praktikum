from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["auth_db"]
user_collection = db["users"]

