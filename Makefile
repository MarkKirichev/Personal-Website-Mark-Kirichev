.PHONY: start-backend-fastapi start-backend-akka start-frontend migrate-database

start-all: start-backend-fastapi start-backend-akka start-frontend

start-all-and-migrate-db: migrate-database start-backend-fastapi start-backend-akka start-frontend

start-backend-fastapi:
	cd backend-python-fastapi && uvicorn main:app --host 0.0.0.0 --port 8000 --reload

start-backend-akka:
	cd backend-scala-akka && sbt run

start-frontend:
	cd frontend-javascript-reactjs && npm start

migrate-database:
	cd backend-python-fastapi && alembic upgrade head
