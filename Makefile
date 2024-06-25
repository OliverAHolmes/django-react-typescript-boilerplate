VENV_ACTIVATE = . .venv/bin/activate

set-backend-venv:
	@echo "Setting up backend virtual environment..."
	@cd backend && make install 
	@cd backend && make generate-requirements

clear-backend:
	@echo "Clearing backend..."
	@rm -rf backend/api/db.sqlite3
	@cd backend && $(VENV_ACTIVATE) && python3 api/manage.py migrate

make-superuser:
	@echo "Creating superuser..."
	@cd backend && $(VENV_ACTIVATE) && python3 api/manage.py shell -c "from users.models import CustomUser; user=CustomUser.objects.create_user('test@example.com', password='RpQ@i2#uF5ph8BuV'); user.is_superuser=True; user.is_staff=True; user.save()"

start-backend:
	@echo "Starting Django backend server..."
	@cd backend && $(VENV_ACTIVATE) && python3 api/manage.py runserver

reinstall-frontend:
	@echo "Reinstalling frontend..."
	@cd frontend && rm -rf node_modules && bun install

start-frontend:
	@echo "Starting React frontend server..."
	@cd frontend && bun run dev

run-cypress:
	@echo "Running Cypress tests..."
	@cd frontend && bun cypress run

open-cypress:
	@echo "Running Cypress tests..."
	@cd frontend && bun cypress open

run-full-e2e-tests:
	@echo "Starting development environment..."
	@make set-backend-venv
	@make clear-backend
	@make make-superuser
	@make start-backend &
	@make reinstall-frontend
	@make start-frontend &
	@sleep 10  # Wait for backend and frontend to start
	@make run-cypress

open-full-e2e-tests:
	@echo "Starting development environment..."
	@make set-backend-venv
	@make clear-backend
	@make make-superuser
	@make start-backend &
	@make reinstall-frontend
	@make start-frontend &
	@sleep 10  # Wait for backend and frontend to start
	@make open-cypress
