import React from "react";

export const Popup = ({ isVisible, onClose, result }) => {
  if (!isVisible || !result) return null;

  return (
    <div
      style={{
        backgroundColor: "#c1c7d4",
        border: "1px solid #1C2536",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        padding: "14px",
        position: "absolute",
        top: "-400px",
        zIndex: 10,
      }}
    >
      <h3 style={{ marginBottom: "10px", marginTop: "0", fontWeight: "bold" }}>
        Pipeline Analysis
      </h3>
      <p>Number of Nodes: {result.num_nodes}</p>
      <p>Number of Edges: {result.num_edges}</p>
      <p>
        DAG Status:
        <span
          style={{
            fontWeight: "bold",
            color: result.is_dag ? "green" : "red",
            marginLeft: "5px",
          }}
        >
          {result.is_dag ? "Valid" : "Contains Cycle"}
        </span>
      </p>
      <button
        onClick={onClose}
        style={{
          backgroundColor: "#8e95a5",
          border: "1px solid #1C2536",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
          padding: "8px 16px",
        }}
      >
        Close
      </button>
    </div>
  );
};
