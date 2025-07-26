import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import RenderTaskList from './RenderTaskList';

const todoApi = "http://localhost:4000/api/todos"; // No trailing slash

export default function Todo() {
  const [ tasks, setTasks ] = useState( [] );

  // Fetch tasks from DB on mount
  useEffect( () => {
    axios.get( todoApi )
      .then( res => setTasks( res.data ) )
      .catch( e => console.error( "Fetch failed:", e ) );
  }, [] );

  // Add a new task
  const addTask = async ( taskText ) => {
    try {
      const res = await axios.post( todoApi, { task: taskText } );
      setTasks( prev => [ ...prev, res.data ] );
    } catch ( e ) {
      console.error( "Add task failed:", e );
    }
  };

  // Delete a task
  const onDelete = async ( _id ) => {
    try {
      await axios.delete( `${ todoApi }/${ _id }` );
      setTasks( prev => prev.filter( t => t._id !== _id ) );
    } catch ( e ) {
      console.error( "Delete failed:", e );
    }
  };

  // Toggle completion
  const onToggle = async ( _id ) => {
    const task = tasks.find( t => t._id === _id );
    try {
      const res = await axios.put( `${ todoApi }/${ _id }`, {
        task: task.task,
        done: !task.done,
      } );
      setTasks( prev => prev.map( t => t._id === _id ? res.data : t ) );
    } catch ( e ) {
      console.error( "Toggle failed:", e );
    }
  };

  // Start editing
  const startEditing = ( _id ) => {
    setTasks( prev =>
      prev.map( t => t._id === _id ? { ...t, isEditing: true } : t )
    );
  };

  // Save edited task
  const onSave = async ( _id, inputText ) => {
    const old = tasks.find( t => t._id === _id );
    try {
      const res = await axios.put( `${ todoApi }/${ _id }`, {
        task: inputText,
        done: old.done,
      } );
      setTasks( prev =>
        prev.map( t => t._id === _id ? { ...res.data, isEditing: false } : t )
      );
    } catch ( e ) {
      console.error( "Save failed:", e );
    }
  };

  // Cancel editing
  const onCancel = ( _id ) => {
    setTasks( prev =>
      prev.map( t => t._id === _id ? { ...t, isEditing: false } : t )
    );
  };

  return (
    <div className="container">
      <h1 className="app-title text-2xl font-semibold my-4">Todo App</h1>
      <AddTask onAdd={addTask} />
      <RenderTaskList
        taskList={tasks}
        onDelete={onDelete}
        onToggle={onToggle}
        startEditing={startEditing}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  );
}