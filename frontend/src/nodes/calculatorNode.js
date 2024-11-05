import createNodeComponent from "../nodeFactory";

export const CalculatorNode = createNodeComponent({
  nodeName: "Calculator",
  initialInputs: [{ id: "num 1" }, { id: "num 2" }],
  outputs: [{ id: "result" }],
  initialState: {
    operation: ["Add", "Subtract", "Multiply", "Divide"],
    precision: ["0", "2", "4"],
  },
});
