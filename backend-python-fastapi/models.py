from sqlalchemy import Column, Integer, String
from database import Base
from pydantic import BaseModel
from typing import Optional


class Person(Base):
    __tablename__ = "persons"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    date_of_birth = Column(String, index=True)
    nationality = Column(String, index=True)



class Flight(BaseModel):
    id: Optional[int]
    iata_departure_code: str
    iata_arrival_code: str
    date_of_departure: str
    date_of_arrival: str
    time_of_departure: str
    time_of_arrival: str
    flight_time: str
    city_of_departure: str
    city_of_arrival: str
    airport_of_departure: str
    airport_of_arrival: str
    flight_number: str
    airline: str
    plane_type: str
    seating_place: str
    fare_class: str
    rating: float

    class Config:
        orm_mode = True

