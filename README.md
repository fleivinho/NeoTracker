# NeoTracker | Process Tracker

[Read the original Portuguese version](README_original.md)

NeoTracker is a small full-stack application for submitting a list of numbers and following the processing until the final result.

Requests are stored in memory. Processing runs in the background, so the user can follow the status, progress, logs, and result.

## Features

- Create a request with a list of numbers.
- Follow request progress in real time.
- View processing logs and the sum result.
- Cancel a request while it is pending or processing.
- See the three most recent requests on the Home page.
- See all requests on the requests page.

## Technologies

- Next.js with React, TypeScript, and Tailwind CSS
- Python with FastAPI
- In-memory storage

## Project structure

```text
frontend/
  src/app/
    components/
    requests/
    page.tsx
backend/
  main.py
PLANNING.md
README.md
```

## Running locally

### Backend

From the project root:

```bash
cd backend
python -m venv venv
```

On Windows, activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the dependencies and start the API:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Check if the API is available |
| `POST` | `/requests` | Create a new request |
| `GET` | `/requests` | List all requests |
| `GET` | `/requests/{id}` | Get request progress and details |
| `POST` | `/requests/{id}/cancel` | Cancel an active request |

Example request:

```json
{
  "numbers": [10, 20, 30]
}
```

The process goes through `pending` and `processing`, ending with `completed`, `error`, or `cancelled`.

## API examples

### POST /requests

<p align="center">
  <img src="images/request_post.png" alt="POST request example" width="700">
</p>

### GET /requests

<p align="center">
  <img src="images/request_get.png" alt="GET request example" width="700">
</p>

## Process flow

<p align="center">
  <img src="images/fluxograma.jpg" alt="Process Tracker flowchart" width="300">
</p>
