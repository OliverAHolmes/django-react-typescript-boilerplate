activate:
	poetry shell

install:
	poetry install --no-root

generate-requirements:
	poetry export -f requirements.txt --output requirements.txt

run:
	python3 ./api/manage.py runserver

use-local-for-virtualenv:
	poetry config virtualenvs.in-project true

create_superuser:
	export DJANGO_SUPERUSER_USERNAME=test && \
    export DJANGO_SUPERUSER_EMAIL=test@example.com && \
    export DJANGO_SUPERUSER_PASSWORD=password && \
    python3 manage.py createsuperuser --noinput

make-migrations:
	python3 manage.py makemigrations

migrate:
	python3 manage.py migrate

test:
	cd api && python3 manage.py test

test-coverage:
	cd api && coverage run --source='.' ./manage.py test && coverage html && coverage report

format:
	ruff format .

lint:
	ruff check .

lint_fix:
	ruff check --fix .

format-and-lint:
	ruff format . && ruff check .