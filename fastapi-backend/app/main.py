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

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

session_agents = {}

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

async def planning_stream(task: str, session_id: str):
    logger.info(f"Starting planning stream for task: {task} in session: {session_id}")
    agent = session_agents[session_id]
    out = agent.run(task)
    logger.info(f"Planning agent run completed. Output: {out}")
    
    full_memory = agent.short_memory.return_history_as_string()
    logger.info(f"Full memory for session {session_id}: {full_memory}")
    
    memory_chunks = full_memory.split('\n')
    
    for chunk in memory_chunks:
        if chunk.strip():
            logger.info(f"Yielding chunk for session {session_id}: {chunk}")
            yield f"data: {json.dumps({'memory': chunk})}\n\n"
            await asyncio.sleep(0.1)
    
    yield f"data: {json.dumps({'memory': 'END_OF_STREAM'})}\n\n"

    # Save the session state after processing
    session_states[session_id] = json.dumps(session_agents[session_id].save_state())
    
    logger.info(f"Planning stream completed for session {session_id}")

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
async def planning_updates(task: str = Query(...), session_id: str = Query(...)):
    if session_id not in session_agents:
        session_agents[session_id] = PlanningAgent()
        if session_id in session_states:
            session_agents[session_id].load_state(json.loads(session_states[session_id]))
    
    return StreamingResponse(planning_stream(task, session_id), media_type="text/event-stream")

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
