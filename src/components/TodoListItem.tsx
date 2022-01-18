import React from "react";
import { dateToString } from "../util";

export type TodoListItemProps = {
    title: string,
    dueDate: Date,
    tagList: string[],
    completed: boolean,
    toggleTaskCompleted: (id: string) => void,
    id: string
}

export function TodoListItem(props: TodoListItemProps) {
    
    return (
        <div style={{border: "1px solid black"}}>
            <h3>{props.title}</h3>
            <h4>Due: {dateToString(props.dueDate)}</h4>
            <label htmlFor={props.id}>Completed</label>
            <input id={props.id} type="checkbox" checked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}/>
            <p>{props.tagList.map((tag, idx) => <span style={{border: '1px solid black', padding: '2px', margin: '5px'}}key={idx}>{tag}</span>)}</p>
        </div>
    );
}