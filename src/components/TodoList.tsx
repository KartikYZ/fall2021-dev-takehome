import React, { useState } from 'react'
/**
 * Thank you for applying to Bits of Good. You are free to add/delete/modify any 
 * parts of this project. That includes changing the types.ts, creating css files, 
 * modifying import statements, using contexts, etc. We do recommend to keep it simple. 
 * You will not be judged based on complexity. We also recommend using 
 * multiple components instead of coding everything on this file :)
 * 
 * Have fun! Please reach out to hello@bitsofgood.org or wkim330@gatech.edu if you
 * have any questions!
 * 
 * Bits of Good Engineering Team
 * 
 */
// TODO: Start coding from here

// Here's a baseline todo item type. 
// Feel free to extend or create your own interface!

import { Form } from './Form'
import { TodoItem, TodoListItem } from './TodoListItem';

export type TodoListProps = {
  tasks: TodoItem[];
}

export default function TodoList(props: TodoListProps) {

  const [tasks, setTasks] = useState<TodoItem[]>(props.tasks);

  function addTask(task: TodoItem) {
    setTasks([...tasks, task]);
  }

  const renderTasks = tasks.map((task, idx) => (
    <TodoListItem 
      title={task.title}
      dueDate={task.dueDate}
      tagList={task.tagList}
      completed={task.completed}
      key={idx}
    />
  ))

  return (
    <div>
      <h1>Todo List!</h1>

      {/* Form */}
      <Form tags={[]} addTask={addTask}/>
      {/* Sort Buttons, these need to be toggle buttons */}  
      <div>
        <h3>Sort By</h3>
        <div>
          <button>Date</button>
        </div>
        <div>
          <button>Completed</button>
        </div>
      </div>
      
      {/* Filter Buttons */}

      {/* List */}
      <ul>
        {renderTasks}
      </ul>
    </div>

    

  )
}
