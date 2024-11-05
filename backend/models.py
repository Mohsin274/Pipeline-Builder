from typing import List, Dict, Any
from pydantic import BaseModel

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    source: str
    target: str
    sourceHandle: str
    targetHandle: str

class PipelinePayload(BaseModel):
    nodes: List[Node]
    edges: List[Edge]