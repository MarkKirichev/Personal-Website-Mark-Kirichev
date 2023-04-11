from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


DATABASE_URL = "postgresql://admin:M@rk0242101001@localhost/personal-website-db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class Flight(Base):
    __tablename__ = "flights"

    id = Column(Integer, primary_key=True, index=True)
    iata_departure_code = Column(String, index=True)
    iata_arrival_code = Column(String, index=True)
    date_of_departure = Column(String)
    date_of_arrival = Column(String)
    time_of_departure = Column(String)
    time_of_arrival = Column(String)
    flight_time = Column(String)
    city_of_departure = Column(String)
    city_of_arrival = Column(String)
    airport_of_departure = Column(String)
    airport_of_arrival = Column(String)
    flight_number = Column(String)
    airline = Column(String)
    plane_type = Column(String)
    seating_place = Column(String)
    fare_class = Column(String)
    rating = Column(Float)
