activate:
	poetry shell

run:
	python3 ./api/manage.py runserver

format-and-lint:
	ruff format . && ruff check .

use-local-for-virtualenv:
	poetry config virtualenvs.in-project true