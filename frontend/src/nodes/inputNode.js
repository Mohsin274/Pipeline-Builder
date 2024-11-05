import createNodeComponent from "../nodeFactory";

export const InputNode = createNodeComponent({
  nodeName: "Input",
  initialInputs: [{ id: "value" }],
  initialState: {
    Name: "",
    "Input type": ["Text", "File"],
  },
});

export default InputNode;
