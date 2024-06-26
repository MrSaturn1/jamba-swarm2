# agent_factory.py

from typing import Dict
from swarms import Agent  # Import your Agent class
from .model import model
from .boss_agent_creator import BOSS_CREATOR  # Assuming you have these in a config file

agent_instances: Dict[str, Agent] = {}

def get_or_create_agent(session_id: str) -> Agent:
    if session_id not in agent_instances:
        agent_instances[session_id] = Agent(
            agent_name="Boss Director",
            system_prompt=BOSS_CREATOR,
            agent_description="Generates a spec of agents for the problem at hand.",
            llm=model,
            max_loops=1,
            autosave=True,
            dynamic_temperature_enabled=True,
            dashboard=False,
            verbose=True,
            streaming_on=True,
            saved_state_path=f"agent_state_{session_id}.json"
        )
    return agent_instances[session_id]