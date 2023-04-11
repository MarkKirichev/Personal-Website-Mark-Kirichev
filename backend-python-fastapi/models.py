from sqlalchemy import Column, Integer, String
from database import Base


class Person(Base):
    __tablename__ = "persons"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    date_of_birth = Column(String, index=True)
    nationality = Column(String, index=True)
