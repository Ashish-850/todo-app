import React, { useState } from "react";
import "../App.css";

export default function RenderTaskList( {
  taskList,
  onDelete,
  onToggle,
  startEditing,
  onSave,
  onCancel,
} ) {
  const [ inputText, setInputText ] = useState( "" );
  const anything = taskList.some( ( t ) => t.isEditing );
  return (
    <>
      <h3>List of Tasks...</h3>
      <ul>
        {taskList.map( ( t ) => (
          <li key={t.id} className={t.done ? "strikeThrough" : "normalText"}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle( t.id )}
            />
            {t.isEditing ? (
              <>
                <input
                  type="text"
                  value={inputText}
                  onChange={( e ) => setInputText( e.target.value )}
                />
                <button onClick={() => onSave( t.id, inputText )}>Save</button>
                <button onClick={() => onCancel( t.id )}>Cancel</button>
              </>
            ) : (
              <>
                {t.task}
                <button disabled={anything}
                  onClick={() => {
                    setInputText( t.task );
                    startEditing( t.id );
                  }}
                >
                  Edit
                </button>
                <button disabled={anything} onClick={() => onDelete( t.id )}>Delete</button>
              </>
            )}
          </li>
        ) )}
      </ul>
    </>
  );
}
