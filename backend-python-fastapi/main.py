from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import Person
from database import SessionLocal, engine

app = FastAPI()


class CreatePerson(BaseModel):
    full_name: str
    date_of_birth: str
    nationality: str


@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/hello")
def create_person(person: CreatePerson):
    db = SessionLocal()
    db_person = Person(full_name=person.full_name, date_of_birth=person.date_of_birth, nationality=person.nationality)
    db.add(db_person)
    db.commit()
    db.refresh(db_person)
    db.close()
    return {"id": db_person.id}
