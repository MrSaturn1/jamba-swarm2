from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import time
import json

app = FastAPI()

# Set up CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example generator for planning updates
def planning_stream():
    while True:
        time.sleep(1)
        yield f"data: {json.dumps({'text': 'New planning update'})}\n\n"

# Example generator for task updates
def task_stream():
    while True:
        time.sleep(1)
        tasks = [
            {"name": "Agent 1", "task": "Analyze data", "description": "Analyzing data for insights", "progress": 75},
            {"name": "Agent 2", "task": "Optimize algorithms", "description": "Optimizing performance algorithms", "progress": 50},
            {"name": "Agent 3", "task": "Test deployment", "description": "Testing deployment process", "progress": 25},
        ]
        yield f"data: {json.dumps({'tasks': tasks})}\n\n"

@app.get("/planning/stream")
async def planning_updates():
    return StreamingResponse(planning_stream(), media_type="text/event-stream")

@app.get("/tasks/stream")
async def task_updates():
    return StreamingResponse(task_stream(), media_type="text/event-stream")
