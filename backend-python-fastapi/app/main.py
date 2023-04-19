from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List

from app.config import auth

from .models.user import Person
from .models.flight import Flight
from .db.connection import SessionLocal

app = FastAPI()


class CreatePerson(BaseModel):
    full_name: str
    date_of_birth: str
    nationality: str


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/hello")
def create_person(person: CreatePerson):
    db = SessionLocal()
    db_person = Person(
        full_name=person.full_name,
        date_of_birth=person.date_of_birth,
        nationality=person.nationality
    )
    db.add(db_person)
    db.commit()
    db.refresh(db_person)
    db.close()
    return {"id": db_person.id}


# Authentication / Authorization
@app.post("/token", response_model=auth.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth.authenticate_user(form_data.username, form_data.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.username})
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@app.get("/users/me")
async def read_users_me(current_user: auth.User = Depends(auth.oauth2_scheme)):
    return current_user


# Flight models

flights = []


@app.get("/flights", response_model=List[Flight])
def get_flights(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    flights = db.query(Flight).offset(skip).limit(limit).all()
    return flights


@app.get("/flights/{flight_id}", response_model=Flight)
def get_flight(flight_id: int, db: Session = Depends(get_db)):
    flight = db.query(Flight).filter(Flight.id == flight_id).first()
    if flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")
    return flight


@app.post("/flights", response_model=Flight)
def create_flight(flight: Flight, db: Session = Depends(get_db)):
    db.add(flight)
    db.commit()
    db.refresh(flight)
    return flight


@app.put("/flights/{flight_id}", response_model=Flight)
def update_flight(flight_id: int, flight: Flight, db: Session = Depends(get_db)):
    db_flight = db.query(Flight).filter(Flight.id == flight_id).first()
    if db_flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")

    for key, value in flight.dict().items():
        setattr(db_flight, key, value)

    db.add(db_flight)
    db.commit()
    db.refresh(db_flight)
    return db_flight


@app.delete("/flights/{flight_id}")
def delete_flight(flight_id: int, db: Session = Depends(get_db)):
    flight = db.query(Flight).filter(Flight.id == flight_id).first()
    if flight is None:
        raise HTTPException(status_code=404, detail="Flight not found")

    db.delete(flight)
    db.commit()
    return {
        "detail": "Flight Deleted"
    }
