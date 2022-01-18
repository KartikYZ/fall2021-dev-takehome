import React from "react";

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
            <input id={props.id} type="checkbox" checked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}/>
            <h3>{props.title}</h3>
            <h4>{props.dueDate.toISOString()}</h4>
            <h4>{props.tagList.map((tag, idx) => <span key={idx}>{tag}</span>)}</h4>
            <h4>{props.completed}</h4>
        </div>
    );
}