import React, { useState } from "react";
import { TagItem } from "./TagItem";
import { nanoid } from "nanoid";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './styles.css';

export type FormProps = {
    tags: TagItemType[]
    addTask: (item: TodoItem) => void
}

export type TagItemType = {
    id: string,
    name: string
}

export type TodoItem = {
    title: string,
    dueDate: Date,
    tagList: string[],
    completed: boolean,
    id: string
}

export function Form(props: FormProps) {
    const [title, setTitle] = useState<string>('');
    const [tags, setTags] = useState<TagItemType[]>(props.tags);
    const [tagInput, setTagInput] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (title === "" || date === null) { return; }
        
        const newTask: TodoItem = {
            title: title, 
            dueDate: date,
            tagList: tags.map(tag => tag.name),
            completed: false,
            id: "todo-" + nanoid()
        } 
        props.addTask(newTask);

        setTitle('');
        setTagInput('');
        setDate(null);
        setTags([]);
    }

    function handleTagSubmitOnClick() {
        addTags(tagInput);
        setTagInput('');
    }

    function addTags(tagInput: string | null) {
        if (tagInput === null || tagInput === "") { return; }
        const newTagStrings = tagInput.split(',').map(tag => tag.trim());
        const newTags: TagItemType[] = newTagStrings.map(tagString => {
            return {
                id: "tag-" + nanoid(),
                name: tagString
            };
        });
        setTags([...tags, ...newTags]);
    }

    function removeTag(id: string) {
        const remainingTags = tags.filter(task => task.id !== id);
        setTags(remainingTags);
    }

    function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function onTagInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTagInput(e.target.value);
    }

    const tagsList = tags.map((tag) => (
        <TagItem 
            id={tag.id} 
            name={tag.name} 
            handleClick={removeTag}
            key={tag.id}
        />
    ));

    return (
        <div>
            <h3>Create Task:</h3>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <div>
                    <span><label htmlFor="title-input">Title</label></span>
                    <span>
                        <input id="title-input" type="text" onChange={(e) => onTitleChange(e)} value={title}/>
                    </span>
                </div>
                <div>
                    <span><label htmlFor="tag-input">Tags</label></span>
                    <span>
                        <input id="tag-input" type="text" onChange={(e) => onTagInputChange(e)} value={tagInput}/>
                        <button type="button" onClick={handleTagSubmitOnClick}>
                            Create New Tag
                        </button>
                    </span>
                </div>
                <div>
                    {tagsList}
                </div>
                <div>
                    <span>Due Date</span>
                        <DatePicker 
                            selected={date} 
                            onChange={(date) => {
                                const newDate = date === null ? new Date() : date;
                                setDate(newDate);
                            }}
                            placeholderText="mm/dd/yyyy" 
                        />
                </div>
                <div>
                    <button type="submit">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}