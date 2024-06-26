import os
from typing import List, Dict
from swarms import Agent, MixtureOfAgents
from .model import model

BOSS_CREATOR = """
You are a swarm orchestrator with expertise in agentic design. Your task is to solve a business problem by creating and coordinating specialized LLM agents. 

For the given task, create a plan that includes:
1. A list of specialized agents needed to solve the problem.
2. For each agent, provide:
   - A name
   - A system prompt that defines its role and responsibilities
   - A brief description of its task

Output the plan in the following format:

Agent: [Agent Name 1]
System Prompt: [Detailed system prompt for Agent 1]
Task: [Brief description of Agent 1's task]

Agent: [Agent Name 2]
System Prompt: [Detailed system prompt for Agent 2]
Task: [Brief description of Agent 2's task]

... (continue for all necessary agents)

Ensure that the system of agents you design can effectively solve or automate the given business problem through clear roles, efficient communication, and a well-defined workflow. The system should be scalable and flexible to adapt to changes.
"""

def create_swarm_plan(task: str) -> str:
    """
    Creates a swarm plan for the given task using the boss agent.
    
    Args:
        task (str): The description of the task for the swarm.
    
    Returns:
        str: The swarm plan as a structured string.
    """
    boss_agent = Agent(
        agent_name="Boss Agent",
        system_prompt=BOSS_CREATOR,
        agent_description="Creates a plan for a swarm of agents",
        llm=model,
        max_loops=1,
        verbose=True
    )
    
    return boss_agent.run(task)

def parse_swarm_plan(plan: str) -> List[Dict[str, str]]:
    """
    Parses the swarm plan into a list of agent specifications.
    
    Args:
        plan (str): The swarm plan as a structured string.
    
    Returns:
        List[Dict[str, str]]: A list of dictionaries, each containing an agent's specifications.
    """
    agents = []
    current_agent = {}
    
    for line in plan.split('\n'):
        if line.startswith("Agent:"):
            if current_agent:
                agents.append(current_agent)
            current_agent = {"name": line.split("Agent:")[1].strip()}
        elif line.startswith("System Prompt:"):
            current_agent["system_prompt"] = line.split("System Prompt:")[1].strip()
        elif line.startswith("Task:"):
            current_agent["task"] = line.split("Task:")[1].strip()
    
    if current_agent:
        agents.append(current_agent)
    
    return agents

def create_and_execute_swarm(task: str, *args, **kwargs) -> str:
    """
    Creates and executes a swarm of agents for the given task.
    
    Args:
        task (str): The description of the task for the swarm.
        *args: Variable length argument list.
        **kwargs: Arbitrary keyword arguments.
    
    Returns:
        str: The result of the swarm execution.
    """
    swarm_plan = create_swarm_plan(task)
    agent_specs = parse_swarm_plan(swarm_plan)
    
    agents = []
    for spec in agent_specs:
        agent = Agent(
            agent_name=spec["name"],
            system_prompt=spec["system_prompt"],
            agent_description=spec["task"],
            llm=model,
            max_loops=1,
            autosave=True,
            dynamic_temperature_enabled=True,
            dashboard=False,
            verbose=True,
            streaming_on=True,
            saved_state_path=f"{spec['name']}_agent.json",
        )
        agents.append(agent)
    
    moa = MixtureOfAgents(agents=agents, description=task, final_agent=agents[0].agent_name)
    
    return moa.run(task, *args, **kwargs)