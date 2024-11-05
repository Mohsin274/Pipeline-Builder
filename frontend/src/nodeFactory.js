import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const createNodeComponent = ({
  nodeName,
  defaultWidth = "auto",
  defaultHeight = "auto",
  hideDefaultInputs = false,
  initialInputs = [],
  outputs = [],
  renderContent = () => null,
  initialState = {},
}) => {
  return ({ id, data }) => {
    const [inputs, setInputs] = useState(initialInputs);

    const stateFields = Object.keys(initialState).reduce((acc, key) => {
      const [state, setState] = useState(data?.[key] || initialState[key]);
      return {
        ...acc,
        [key]: state,
        [`set${key.charAt(0).toUpperCase() + key.slice(1)}`]: setState,
      };
    }, {});

    // combines state fields and input state to pass down to renderContent
    const enhancedStateFields = {
      ...stateFields,
      setInputs,
      inputs,
    };

    // updates the state for the specified key
    const createChangeHandler = (key) => (e) => {
      stateFields[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](
        e.target.value
      );
    };

    return (
      <div
        style={{
          backdropFilter: "blur(10px)",
          border: "1px solid black",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          height: defaultHeight,
          width: defaultWidth,
        }}
      >
        <div
          style={{
            backgroundColor: "#697182",
            borderRadius: "8px 8px 0 0",
            color: "white",
            padding: "5px",
            textAlign: "center",
          }}
        >
          <span>{nodeName}</span>
        </div>

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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "10px",
          }}
        >
          {!hideDefaultInputs &&
            Object.keys(initialState).map((key) => (
              <label key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
                {Array.isArray(initialState[key]) ? (
                  <select
                    value={stateFields[key]}
                    onChange={createChangeHandler(key)}
                    style={{
                      backgroundColor: "#c1c7d4",
                      border: "1px solid #1C2536",
                      borderRadius: "4px",
                      marginLeft: "5px",
                      padding: "2px",
                    }}
                  >
                    {initialState[key].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={
                      stateFields[key] || `${nodeName}_${id.replace(/\D/g, "")}`
                    }
                    onChange={createChangeHandler(key)}
                    style={{
                      border: "1px solid #1C2536",
                      borderRadius: "4px",
                      marginLeft: "5px",
                      padding: "2px",
                    }}
                  />
                )}
              </label>
            ))}

          {renderContent(enhancedStateFields)}
        </div>

        {outputs.map((output, index) => (
          <Handle
            key={`output-${output.id}`}
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            style={{
              top: `${((index + 1) / (outputs.length + 1)) * 100}%`,
            }}
          />
        ))}
      </div>
    );
  };
};

export default createNodeComponent;
