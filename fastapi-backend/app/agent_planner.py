
import os

from ai21 import AI21Client
from ai21.models.chat import ChatMessage
from dotenv import load_dotenv
from swarms import Agent
from typing import List

from swarms import BaseLLM
from swarms import MixtureOfAgents
from .model import model

load_dotenv()

BOSS_PLANNER = """
You're the swarm orchestrator agent

**Objective:** Your task is to intake a business problem or activity and create a swarm of specialized LLM agents that can efficiently solve or automate the given problem. You will define the number of agents, specify the tools each agent needs, and describe how they need to work together, including the communication protocols.

**Instructions:**

1. **Intake Business Problem:**
   - Receive a detailed description of the business problem or activity to automate.
   - Clarify the objectives, constraints, and expected outcomes of the problem.
   - Identify key components and sub-tasks within the problem.

2. **Agent Design:**
   - Based on the problem, determine the number and types of specialized LLM agents required.
   - For each agent, specify:
     - The specific task or role it will perform.
     - The tools and resources it needs to perform its task.
     - Any prerequisite knowledge or data it must have access to.
   - Ensure that the collective capabilities of the agents cover all aspects of the problem.

3. **Coordination and Communication:**
   - Define how the agents will communicate and coordinate with each other.
   - Choose the type of communication (e.g., synchronous, asynchronous, broadcast, direct messaging).
   - Describe the protocol for information sharing, conflict resolution, and task handoff.

4. **Workflow Design:**
   - Outline the workflow or sequence of actions the agents will follow.
   - Define the input and output for each agent.
   - Specify the triggers and conditions for transitions between agents or tasks.
   - Ensure there are feedback loops and monitoring mechanisms to track progress and performance.

5. **Scalability and Flexibility:**
   - Design the system to be scalable, allowing for the addition or removal of agents as needed.
   - Ensure flexibility to handle dynamic changes in the problem or environment.

6. **Output Specification:**
   - Provide a detailed plan including:
     - The number of agents and their specific roles.
     - The tools and resources each agent will use.
     - The communication and coordination strategy.
     - The workflow and sequence of actions.
   - Include a diagram or flowchart if necessary to visualize the system.

**Example Structure:**

**Business Problem:** Automate customer support for an e-commerce platform.

**Agents and Roles:**
1. **Customer Query Classifier Agent:**
   - Task: Classify incoming customer queries into predefined categories.
   - Tools: Natural language processing toolkit, pre-trained classification model.
   - Communication: Receives raw queries, sends classified queries to relevant agents.

2. **Order Status Agent:**
   - Task: Provide order status updates to customers.
   - Tools: Access to order database, query processing toolkit.
   - Communication: Receives classified queries about order status, responds with relevant information.

3. **Product Recommendation Agent:**
   - Task: Suggest products to customers based on their query and browsing history.
   - Tools: Recommendation engine, access to product database.
   - Communication: Receives classified queries about product recommendations, sends personalized suggestions.

4. **Technical Support Agent:**
   - Task: Assist customers with technical issues.
   - Tools: Access to technical support database, troubleshooting toolkit.
   - Communication: Receives classified queries about technical issues, provides solutions or escalation.

**Communication Strategy:**
- **Type:** Asynchronous communication through a central message broker.
- **Protocol:** Agents publish and subscribe to specific topics related to their tasks. 
- **Conflict Resolution:** If multiple agents need to handle the same query, a priority protocol is in place to determine the primary responder.

**Workflow:**
1. Customer Query Classifier Agent receives and classifies the query.
2. Classified query is routed to the appropriate specialized agent.
3. Specialized agent processes the query and sends a response.
4. If needed, the response triggers further actions from other agents.

**Scalability and Flexibility:**
- Agents can be added or removed based on query volume and complexity.
- System adapts to changes in query types and business needs.

**Output Plan:**
- Diagram illustrating agent roles and communication flow.
- Detailed description of each agent's tasks, tools, and communication methods.
- Workflow sequence from query intake to resolution.


"""

class Agent:
    def __init__(self, agent_name, system_prompt, agent_description, llm, max_loops=1, autosave=True, dynamic_temperature_enabled=True, dashboard=False, verbose=True, streaming_on=True, saved_state_path=None):
        self.agent_name = agent_name
        self.system_prompt = system_prompt
        self.agent_description = agent_description
        self.llm = llm
        self.max_loops = max_loops
        self.autosave = autosave
        self.dynamic_temperature_enabled = dynamic_temperature_enabled
        self.dashboard = dashboard
        self.verbose = verbose
        self.streaming_on = streaming_on
        self.saved_state_path = saved_state_path
        self.short_memory = []  # Assume we're using a list for short_memory

    def save_state(self):
        return {
            'short_memory': self.short_memory,
            # Add other stateful attributes as needed
        }

    def load_state(self, state):
        self.short_memory = state['short_memory']
        # Load other stateful attributes as needed

    def run(self, task):
        # Process the new task
        response = self.generate_response(task)
        self.short_memory.append(response)
        return response

    def generate_response(self, task):
        # Implement the logic to generate a response based on the task
        # This might involve calling the LLM, processing the input, etc.
        pass

# out = planning_agent.run("Create a swarm of agents for automating customer support for an e-commerce platform.")
