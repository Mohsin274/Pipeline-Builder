import createNodeComponent from "../nodeFactory";
import React, { useRef, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

const TextNodeContent = ({ text, setText, id }) => {
  const textareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });
  const [inputs, setInputs] = useState([]);

  // textarea resizing
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const scrollWidth = textareaRef.current.scrollWidth;

      const newWidth = Math.max(200, Math.min(scrollWidth + 40, 600));
      const newHeight = Math.max(80, Math.min(scrollHeight + 40, 400));

      setDimensions({ width: newWidth, height: newHeight });
    }
  }, [text]);

  // extract variables and update handles
  useEffect(() => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\}\}/g;
    const matches = [...text.matchAll(variableRegex)];
    const variables = matches.map((match) => match[1]);

    const newInputs = variables.map((varName) => ({
      id: varName,
      label: varName,
    }));

    setInputs(newInputs);
  }, [text]);

  return (
    <>
      {inputs.map((input, index) => (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: `${((index + 1) / (inputs.length + 1)) * 100}%`,
          }}
        />
      ))}

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          resize: "none",
          border: "none",
          outline: "none",
          padding: "10px",
          boxSizing: "border-box",
          fontFamily: "inherit",
          fontSize: "inherit",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: "50%",
        }}
      />
    </>
  );
};

export const TextNode = createNodeComponent({
  nodeName: "Text",
  hideDefaultInputs: true,
  initialState: {
    text: "{{input}}",
  },
  renderContent: (stateFields) => {
    return (
      <TextNodeContent
        text={stateFields.text}
        setText={stateFields.setText}
        id={stateFields.id}
      />
    );
  },
});

export default TextNode;
