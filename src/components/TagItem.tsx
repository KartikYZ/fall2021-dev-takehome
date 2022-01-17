import React from "react";

export type Tag = {
    id: string,
    name: string
    handleClick: (id: string) => void
}

export function TagItem(props: Tag) {

    return (
        <span style={{border: "1px solid black"}} onClick={() => props.handleClick(props.id)}>
            x {props.name}
        </span>
    );
}