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
  const anyEditing = taskList.some( ( t ) => t.isEditing );

  return (
    <div className="task-wrapper">
      <h3 className="task-title">Your Tasks</h3>
      <ul className="task-list">
        {taskList.map( ( t ) => (
          <li key={t.id} className={`task-item ${ t.done ? "done" : "" }`}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle( t.id )}
              className="checkbox"
            />

            {t.isEditing ? (
              <>
                <input
                  type="text"
                  value={inputText}
                  onChange={( e ) => setInputText( e.target.value )}
                  className="task-input"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => onSave( t.id, inputText )}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => onCancel( t.id )}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="task-text">{t.task}</span>
                <button
                  className="btn btn-primary"
                  disabled={anyEditing}
                  onClick={() => {
                    setInputText( t.task );
                    startEditing( t.id );
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  disabled={anyEditing}
                  onClick={() => onDelete( t.id )}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ) )}
      </ul>
    </div>
  );
}