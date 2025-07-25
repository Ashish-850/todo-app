import React, { useState } from "react";

export default function AddTask( { onAdd } ) {
  const [ inputValue, setInputValue ] = useState( "" );

  const handleSubmit = () => {
    if ( !inputValue.trim() ) return;
    onAdd( inputValue );
    setInputValue( "" );
  };

  return (
    <div className="add-task">
      <input
        type="text"
        className="add-task-input"
        placeholder="Write your task..."
        value={inputValue}
        onChange={( e ) => setInputValue( e.target.value )}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Add Task
      </button>
    </div>
  );
}