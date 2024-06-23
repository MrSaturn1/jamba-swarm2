from fastapi import FastAPI, HTTPException, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import time
import json
import asyncio
import logging
from .agent_planner import planning_agent

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

# Define your data models
class AgentSchema(BaseModel):
    name: Optional[str] = None
    system_prompt: Optional[str] = None
    task: Optional[str] = None

class JambaSwarmTask(BaseModel):
    task: Optional[str] = None

class JambaSwarmRequest(BaseModel):
    task: Optional[str] = None
    plan: Optional[str] = None
    agents: Optional[List[AgentSchema]] = None
    timestamp: int = int(time.time())

class JambaSwarmResponse(BaseModel):
    task: Optional[str] = None
    plan: Optional[str] = None
    agents: Optional[List[AgentSchema]] = None
    timestamp: int = int(time.time())
    response: Optional[str] = None

# Example generator for planning updates
async def planning_stream(task: str):
    out = planning_agent.run(task)  # Use the provided task
    print('here')
    await asyncio.sleep(1)  # Use asyncio.sleep for asynchronous context
    memory = planning_agent.short_memory.return_history_as_string()
    yield f"data: {json.dumps({'memory': memory})}\n\n"

# Example generator for task updates
async def task_stream():
    await asyncio.sleep(1)
    tasks = [
        {"name": "Agent 1", "task": "Analyze data", "description": "Analyzing data for insights", "progress": 75},
        {"name": "Agent 2", "task": "Optimize algorithms", "description": "Optimizing performance algorithms", "progress": 50},
        {"name": "Agent 3", "task": "Test deployment", "description": "Testing deployment process", "progress": 25},
    ]
    yield f"data: {json.dumps({'tasks': tasks})}\n\n"

@app.get("/planning/stream")
async def planning_updates(task: str = Query(...)):
    return StreamingResponse(planning_stream(task), media_type="text/event-stream")

@app.get("/tasks/stream")
async def task_updates():
    return StreamingResponse(task_stream(), media_type="text/event-stream")

@app.post("/api/agents")
async def create_agent(request: JambaSwarmTask):
    task = request.task
    if not task:
        raise HTTPException(status_code=400, detail="Task cannot be None or empty.")
    # Process the task as needed
    # This is just a placeholder implementation
    agents = [
        {"name": "Agent 1", "task": "Analyze data", "description": "Analyzing data for insights", "progress": 75},
        {"name": "Agent 2", "task": "Optimize algorithms", "description": "Optimizing performance algorithms", "progress": 50},
        {"name": "Agent 3", "task": "Test deployment", "description": "Testing deployment process", "progress": 25},
    ]
    return {"tasks": agents}
