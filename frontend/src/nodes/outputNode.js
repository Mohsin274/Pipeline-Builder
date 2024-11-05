import createNodeComponent from "../nodeFactory";

export const OutputNode = createNodeComponent({
  nodeName: "Output",
  initialInputs: [{ id: "value" }],
  initialState: {
    "output name": "",
    "output type": ["Text", "Image"],
  },
});

export default OutputNode;
