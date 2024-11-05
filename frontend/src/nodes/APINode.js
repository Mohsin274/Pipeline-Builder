import createNodeComponent from "../nodeFactory";

export const APINode = createNodeComponent({
  nodeName: "API Call",
  initialInputs: [{ id: "params" }],
  outputs: [{ id: "response" }, { id: "error" }],
  initialState: {
    method: ["GET", "POST", "PUT", "DELETE"],
    "response type": ["JSON", "XML", "Text"],
  },
});
