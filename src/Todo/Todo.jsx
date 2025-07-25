import React, { useState } from 'react'
import AddTask from './AddTask';
import RenderTaskList from './RenderTaskList';
import { isEditable } from '@testing-library/user-event/dist/utils';

const tasksArray = [
  { id: 1, task: "Write an email", done: false, isEditing: false },
  { id: 2, task: "Study for 2 hours", done: false, isEditing: false },
  { id: 3, task: "Take Medicine", done: false, isEditing: false },
]

export default function Todo() {
  const [ tasks, setTasks ] = useState( tasksArray );

  const addTask = ( taskText ) => {
    const newtask = {
      id: Date.now(),
      task: taskText,
      done: false
    }
    setTasks( [ ...tasks, newtask ] )
  }

  const onDelete = ( id ) => {
    setTasks( tasks.filter( ( t ) => t.id !== id ) ); // make seprate array of task apart from given id
  }

  const onToggle = ( id ) => {
    setTasks( tasks.map( ( t ) => t.id === id ? { ...t, done: !t.done } : t ) );
  }

  const startEditing = ( id ) => {
    setTasks( tasks.map( ( t ) => t.id === id ? { ...t, isEditing: true } : t ) );
  }

  const onSave = ( id, inputText ) => {
    setTasks( tasks.map( ( t ) => t.id === id ? { ...t, task: inputText, isEditing: false } : t ) );
  }

  const onCancel = ( id ) => {
    setTasks( tasks.map( ( t ) => t.id === id ? { ...t, isEditing: false } : t ) );
  }

  return (
    <>
      <h1>Todo App</h1>
      <AddTask onAdd={addTask} />
      <RenderTaskList taskList={tasks} onDelete={onDelete} onToggle={onToggle} startEditing={startEditing} onSave={onSave} onCancel={onCancel} />
    </>
  )
}
