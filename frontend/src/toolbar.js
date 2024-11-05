// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          backgroundColor: "#c1c7d4",
          borderRadius: "18px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
          padding: "10px",
          width: "fit-content",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="calculator" label="Calculator" />
        <DraggableNode type="api" label="API" />
        <DraggableNode type="logging" label="Logging" />
      </div>
    </div>
  );
};
