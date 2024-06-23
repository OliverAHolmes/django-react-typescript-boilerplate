# Django React TypeScript Boilerplate

This is a boilerplate project for building a full stack application with Django on the backend and React with Vite on the frontend. The frontend uses TypeScript, MUI for UI components, Zustand for state management, React Router for routing, and Cypress for end-to-end testing. The backend is built with Django and uses Poetry for dependency management.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)

## Requirements

- [Python 3.12](https://www.python.org/downloads/)
- [Poetry](https://python-poetry.org/docs/)
- [Bun](https://bun.sh/)

## Installation

### Clone the repository:

```sh
git clone git@github.com:OliverAHolmes/django-react-typescript-boilerplate.git
cd django-react-typescript-boilerplate
```

## Backend Setup

### Navigate to the backend directory:

```sh
cd backend
```

### Create and activate a virtual environment using Poetry:

```sh
poetry shell
poetry install --no-root
```

### Generate the requirements.txt file:

```sh
make generate-requirements
```

### Apply database migrations:

```sh
python3 api/manage.py migrate
```

### Create a superuser for the Django admin:

```sh
python manage.py createsuperuser 
```

## Frontend Setup

### Navigate to the frontend directory:

```sh
cd frontend
```

### Install the dependencies:

```sh
bun install
```

## Running the Application

### Backend

#### Start the Django development server:

```sh
cd backend
make run 
```

### Frontend

#### Start the Vite development server:

```sh
bun run dev
```

The backend will be running on http://localhost:8000 and the frontend on http://localhost:5174.

## Running Tests

### Open Cypress for end-to-end testing:

```sh
bun run cypress:open
```

### Run Cypress tests headlessly:

```sh
bun run cypress:run
```

### Run Full automated e2e tests:

```sh
make open-full-e2e-tests
```

### Run Full automated e2e tests headlessly:

```sh
make run-full-e2e-tests
```

## Project Structure

```plaintext
django-react-typescript-boilerplate/
├── backend/
│   ├── Makefile
│   ├── api/
|   │   ├── manage.py
|   │   ├── requirements.txt
|   │   ├── ... (other Django-related files)
|   │
├── frontend/
│   ├── public/
│   ├── src/
│   ├── cypress/
│   ├── tsconfig.json
│   ├── package.json
│   ├── vite.config.ts
│   ├── ... (other React-related files)
└── README.md
```