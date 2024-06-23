import os

from ai21 import AI21Client
from ai21.models.chat import ChatMessage
from dotenv import load_dotenv
# from swarms import Agent
from typing import List

from swarms import BaseLLM
from swarms import MixtureOfAgents
from .model import model
BOSS_CREATOR = """

You are a swarm orchestrator with expertise in agentic design. Your task is to solve a business problem by creating and coordinating specialized LLM agents. Follow the schematic schema with function calling to design the solution.

Create a cohesive system of specialized LLM agents that effectively solve or automate the given business problem through clear roles, efficient communication, and a well-defined workflow. Ensure the system is scalable and flexible to adapt to changes.

"""

# Name, system prompt, 
def create_and_execute_swarm(name: List[str] = None, system_prompt: List[str] = None, task: str = None, *args, **kwargs) -> List[Agent]:
    """
    Creates and executes a swarm of agents for the given task.

    Args:
        name (List[str]): A list of names for the agents.
        system_prompt (List[str]): A list of system prompts for the agents.
        task (str): The description of the task for the swarm.
        *args: Variable length argument list.
        **kwargs: Arbitrary keyword arguments.

    Returns:
        List[Agent]: A list of agents in the swarm.

    """
    agents = []
    for name, prompt in zip(name, system_prompt):
        agent = Agent(
            agent_name=name,
            system_prompt=prompt,
            agent_description="Generates a spec of agents for the problem at hand.",
            llm=model,
            max_loops=1,
            autosave=True,
            dynamic_temperature_enabled=True,
            dashboard=False,
            verbose=True,
            streaming_on=True,
            # interactive=True, # Set to False to disable interactive mode
            saved_state_path=f"{name}_agent.json",
            # tools=[calculate_profit, generate_report],
            # docs_folder="docs",
            # pdf_path="docs/accounting_agent.pdf",
            # tools=[browser_automation],
        )
        agents.append(agent)
        
    # MoA
    moa = MixtureOfAgents(agents=agents, description=task, final_agent=name[0])
    
    return moa.run(task, *args, **kwargs)
