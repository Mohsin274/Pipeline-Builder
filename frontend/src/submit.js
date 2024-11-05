import React, { useState } from "react";
import { useStore } from "./store";
import { Popup } from "./popup";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [submitResult, setSubmitResult] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setSubmitResult(result);
      setAlertVisible(true);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      setSubmitResult(null);
    }
  };

  const handleClosePopup = () => {
    setAlertVisible(false);
    setSubmitResult(null);
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          backgroundColor: "#c1c7d4",
          border: "1px solid #1C2536",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "20px",
          padding: "16px 32px",
        }}
      >
        Submit
      </button>

      <Popup
        isVisible={alertVisible}
        onClose={handleClosePopup}
        result={submitResult}
      />
    </div>
  );
};
