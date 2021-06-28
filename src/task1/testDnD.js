import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


export const Element = (props) => {
    const { text } = props;
    const style = {
        border: '1px solid black',
        padding: '20px',
        width: "150px",
        height: "300px",
        background: "#6e8dfd"
    }
    return <div style={style}>
        {text}
    </div>
}

const List = (props) => {
    const { children} = props;
    const style = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: "15px"

    }
    return <Droppable droppableId="itemList">
        {(provided) => {
            console.log(provided);
            <div style={style} {...provided.droppableProps} innerRef={provided.innerRef}>
                {children}
            </div>
        }}

    </Droppable>
}

export const TestDnD = (props) => {
    return <DragDropContext><List>
        <Element text="element 1" />
        <Element text="element 2" />
        <Element text="element 3" />
        <Element text="element 4" />
    </List></DragDropContext>
}