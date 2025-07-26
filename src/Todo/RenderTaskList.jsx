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
          <li key={t._id} className={`task-item ${ t.done ? "done" : "" }`}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle( t._id )}
              className="checkbox"
            />

            {t.isEditing ? (
              <div className="edit-section">
                <input
                  type="text"
                  value={inputText}
                  onChange={( e ) => setInputText( e.target.value )}
                  className="task-input"
                />
                <button
                  onClick={() => onSave( t._id, inputText )}
                  className="btn btn-primary"
                >
                  Save
                </button>
                <button
                  onClick={() => onCancel( t._id )}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className="task-text">{t.task}</span>
                <div className="button-group">
                  <button
                    disabled={anyEditing}
                    onClick={() => {
                      setInputText( t.task );
                      startEditing( t._id );
                    }}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    disabled={anyEditing}
                    onClick={() => onDelete( t._id )}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ) )}
      </ul>
    </div>
  );
}