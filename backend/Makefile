activate:
	poetry shell

install:
	poetry install --no-root

generate-requirements:
	poetry export -f requirements.txt --output requirements.txt

run:
	python3 ./api/manage.py runserver

format-and-lint:
	ruff format . && ruff check .

use-local-for-virtualenv:
	poetry config virtualenvs.in-project true