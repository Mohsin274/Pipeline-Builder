import createNodeComponent from "../nodeFactory";

export const LoggingNode = createNodeComponent({
  nodeName: "Logger",
  initialInputs: [{ id: "data" }],
  outputs: [{ id: "passthrough" }],
  initialState: {
    "log level": ["INFO", "WARN", "ERROR", "DEBUG"],
    "timestamp format": ["ISO", "Unix", "Custom"],
  },
  renderContent: () => (
    <div>
      <p>Additional content</p>
    </div>
  ),
});
