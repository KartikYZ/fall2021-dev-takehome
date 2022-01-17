import React from "react";
import { TagItem } from "./TagItem";

export type TodoItem = {
    title: string,
    dueDate: Date,
    tagList: string[],
    completed: boolean,
}

export function TodoListItem(props: TodoItem) {

    return (
        <div style={{border: "1px solid black"}}>
            <h3>{props.title}</h3>
            <h4>{props.dueDate.toISOString()}</h4>
            <h4>{props.tagList.map((tag, idx) => <span>{tag}</span>)}</h4>
            <h4>{props.completed}</h4>
        </div>
    );
}