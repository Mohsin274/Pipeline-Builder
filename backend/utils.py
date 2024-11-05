from typing import List
from models import Node, Edge

def is_directed_acyclic_graph(nodes: List[Node], edges: List[Edge]) -> bool:
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        graph[edge.source].append(edge.target)
    
    def has_cycle(node, path, visited):
        visited.add(node)
        path.add(node)
        
        for neighbor in graph.get(node, []):
            if neighbor in path:
                return True
            if neighbor not in visited and has_cycle(neighbor, path, visited):
                    return True
        
        path.remove(node)
        return False

    visited = set()
    for node in graph:
        if node not in visited and has_cycle(node, set(), visited):
                return False
    
    return True