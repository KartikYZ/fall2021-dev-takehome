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
import { TodoListItem } from './TodoListItem';
import { TodoItem } from './Form';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { MultiSelectFilter } from './MultiSelectFilter';

import { taskCompletedComparator, taskDateComparator, getUniqueFromArray } from '../util';
import { Option } from 'react-multi-select-component/dist/types/lib/interfaces';

export type TodoListProps = {
  tasks: TodoItem[];
}

export default function TodoList(props: TodoListProps) {

  const [tasks, setTasks] = useState<TodoItem[]>(props.tasks);
  const [globalTags, setGlobalTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [selections, setSelections] = React.useState<string[]>([]);

  const handleSelections = (event: React.MouseEvent<HTMLElement>, newSelections: string[]) => {
    setSelections(newSelections);
    if (newSelections.length === 2) {
      // sort first by completedness, and then by date
      setTasks(tasks.sort((a, b) => {
        if (taskCompletedComparator(a, b) === 0) {
          return taskDateComparator(a, b);
        }
        return taskCompletedComparator(a, b);
      }));
    } else if (newSelections.length === 1) {
      if (newSelections[0] === 'date') {
        // sort by date, item due earlier should appear first
        setTasks(tasks.sort((a, b) => taskDateComparator(a, b)));
      } else {
        // sort by completed, incomplete item appears first
        setTasks(tasks.sort((a, b) => taskCompletedComparator(a, b)));
      }
    }
  };

  function addTask(task: TodoItem) {
    setGlobalTags(getUniqueFromArray([...globalTags, ...task.tagList]));
    setTasks([...tasks, task]);
  }

  function toggleTaskCompleted(id: string) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }  

  const filteredTasks = tasks.filter(task => {
    console.log(selectedTags);
    console.log(task.tagList);
    for (let tag of task.tagList) {
      if (selectedTags.filter(sTag => tag === sTag.value).length === 0) {
        return false;
      }
    }
    return true;
  });

  const renderTasks = filteredTasks.map((task, idx) => (
    <TodoListItem 
      title={task.title}
      dueDate={task.dueDate}
      tagList={task.tagList}
      completed={task.completed}
      id={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      key={idx}
    />
  ));

  const filterOptions: Option[] = globalTags.map(tag => {
    return {
      label: tag,
      value: tag
    };
  });
  
  return (
    <div>
      <h1>Todo List!</h1>
      {/* Form */}
      <Form tags={[]} addTask={addTask}/>
      {/* Sort Buttons, these need to be toggle buttons */}  
      <div>
        <h3>Sort By</h3>
        <ToggleButtonGroup
          value={selections}
          onChange={handleSelections}
          aria-label="text formatting"
        >
          <ToggleButton value="date" aria-label="date">
            <h4>Date</h4>
          </ToggleButton>
          <ToggleButton value="completed" aria-label="completed">
            <h4>Completed</h4>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      
      {/* Filter Buttons */}
      <div>
        {/* Dropdown filter */}
        <MultiSelectFilter
          options={filterOptions}
          selected={selectedTags}
          onChange={setSelectedTags}
        />
      </div>
      {/* List */}
      <ul>
        {/* {renderTasks} */}
        {renderTasks}
      </ul>
    </div>
  )
}
