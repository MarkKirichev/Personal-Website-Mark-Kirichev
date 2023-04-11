from fastapi import FastAPI, Depends, HTTPEXception, status
from fastapi.security import OAuth2PasswordRequestForm

from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import Person, Flight
from typing import List
from database import SessionLocal, engine

import auth

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
async def get_flights():
    return flights


@app.post("/flights", response_model=Flight)
async def create_flight(flight: Flight):
    flights.append(flight)
    return flight


@app.put("/flights/{flight_id}", reponse_model=Flight)
async def update_flight(flight_id: int, flight: Flight):
    flight[flight_id] = flight
    return flight


@app.delete("/flights/{flight_id}")
async def delete_flight(flight_id: int):
    flight.pop(flight_id)
    return {
        "detail": "Flight Deleted"
    }

