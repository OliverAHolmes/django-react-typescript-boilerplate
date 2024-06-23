.PHONY: start-backend start-frontend run-cypress dev

start-backend:
	@echo "Starting Django backend server..."
	@cd backend && . .venv/bin/activate && python3 api/manage.py runserver

start-frontend:
	@echo "Starting React frontend server..."
	@cd frontend && bun run dev

run-cypress:
	@echo "Running Cypress tests..."
	@cd frontend && bun cypress run

run-full-e2e-tests:
	@echo "Starting development environment..."
	@make start-backend &
	@make start-frontend &
	@sleep 10  # Wait for backend and frontend to start
	@make run-cypress
