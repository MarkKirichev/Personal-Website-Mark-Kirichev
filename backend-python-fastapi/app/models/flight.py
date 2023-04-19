from pydantic import BaseModel
from typing import Optional


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
