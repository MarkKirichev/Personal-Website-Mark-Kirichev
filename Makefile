.PHONY: start-backend-fastapi start-backend-akka start-frontend migrate-database

start-all: start-backend-fastapi start-backend-akka start-frontend

start-backend-fastapi:
	cd backend_fastapi && uvicorn main:app --host 0.0.0.0 --port 8000 --reload

start-backend-akka:
	cd backend_akka && sbt run

start-frontend:
	cd frontend && npm start

migrate-database:
	cd backend_fastapi && alembic upgrade head
