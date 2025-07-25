import React, { useState } from "react";

export default function AddTask({ onAdd }) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    onAdd(inputValue); //pass input value to parent
    setInputValue(""); // clear input
  }

  return (
    <>
      <input
        type="text"
        placeholder="Write task here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Add task</button>
    </>
  );
}
