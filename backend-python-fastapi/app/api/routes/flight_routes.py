from fastapi import HTTPException, FastAPI
from typing import List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.models.flight import Flight
from app.api.db.connection import SessionLocal

router = APIRouter()

# Flight models

flights = []


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



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
