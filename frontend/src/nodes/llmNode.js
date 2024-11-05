// llmNode.js

import createNodeComponent from "../nodeFactory";

export const LLMNode = createNodeComponent({
  nodeName: "LLM",
  initialInputs: [{ id: "system" }, { id: "prompt" }],
  outputs: [{ id: "response" }],
  renderContent: () => (
    <div style={{ padding: "10px" }}>
      <span>This is a LLM.</span>
    </div>
  ),
});

export default LLMNode;
