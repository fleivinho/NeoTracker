import asyncio
from datetime import datetime, timezone
from typing import Any, Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

RequestStatus = Literal[
    "pending",
    "processing",
    "completed",
    "error",
    "cancelled",
]

class CreateRequestPayload(BaseModel):
    numbers: list[int] = Field(min_length=1)


class RequestResponse(BaseModel):
    id: str
    numbers: list[int]
    status: RequestStatus
    progress: int = Field(ge=0, le=100)
    logs: list[str]
    result: int | None


app = FastAPI(title="Process Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


requests: dict[str, dict[str, Any]] = {}
background_tasks: dict[str, asyncio.Task[None]] = {}


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def to_response(request: dict[str, Any]) -> RequestResponse:
    return RequestResponse(
        id=request["id"],
        numbers=request["numbers"],
        status=request["status"],
        progress=request["progress"],
        logs=request["logs"],
        result=request["result"],
    )


def update_request(request: dict[str, Any], **changes: Any) -> None:
    request.update(changes)
    request["updated_at"] = now()


def get_request_or_404(request_id: str) -> dict[str, Any]:
    request = requests.get(request_id)
    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Request not found",
        )
    return request


def was_cancelled(request: dict[str, Any]) -> bool:
    return request["cancel_requested"] is True


async def process_request(request_id: str) -> None:
    request = requests[request_id]

    if was_cancelled(request):
        return

    update_request(
        request,
        status="processing",
        logs=[*request["logs"], "Starting processing..."],
    )

    try:
        await asyncio.sleep(3)
        if was_cancelled(request):
            return

        update_request(
            request,
            progress=30,
            logs=[*request["logs"], "Validating data..."],
        )

        await asyncio.sleep(5)
        if was_cancelled(request):
            return

        result = sum(request["numbers"])
        update_request(
            request,
            progress=70,
            logs=[*request["logs"], "Calculating sum..."],
        )

        update_request(
            request,
            status="completed",
            progress=100,
            result=result,
            logs=[*request["logs"], "Finished successfully."],
        )
    except Exception as error:
        if was_cancelled(request):
            return

        update_request(
            request,
            status="error",
            logs=[*request["logs"], f"Processing failed: {error}"],
        )


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "NeoTracker API", "author": "Flávio Soares"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}

@app.post(
    "/requests",
    response_model=RequestResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_request(payload: CreateRequestPayload) -> RequestResponse:
    request_id = str(uuid4())
    timestamp = now()
    request = {
        "id": request_id,
        "numbers": payload.numbers,
        "status": "pending",
        "progress": 0,
        "logs": ["Request created"],
        "result": None,
        "cancel_requested": False,
        "created_at": timestamp,
        "updated_at": timestamp,
    }
    requests[request_id] = request
    background_tasks[request_id] = asyncio.create_task(process_request(request_id))
    return to_response(request)


@app.get("/requests", response_model=list[RequestResponse])
def list_requests() -> list[RequestResponse]:
    return [to_response(request) for request in requests.values()]


@app.get("/requests/{request_id}", response_model=RequestResponse)
def get_request(request_id: str) -> RequestResponse:
    return to_response(get_request_or_404(request_id))


@app.post("/requests/{request_id}/cancel", response_model=RequestResponse)
def cancel_request(request_id: str) -> RequestResponse:
    request = get_request_or_404(request_id)

    if request["status"] != "cancelled":
        update_request(
            request,
            status="cancelled",
            cancel_requested=True,
            logs=[*request["logs"], "Request cancelled"],
        )

    return to_response(request)
