import React, { useCallback } from 'react';
import "./style.css";
import { Draggable } from 'react-beautiful-dnd';

export const Row = (props) => {
    const { item, onClickHandler, columnName,selected } = props;

    return <tr
        onClick={() => { onClickHandler && onClickHandler(item) }}
        className={`tableRow ${selected===item?"select":""}`}>
        {columnName.map((column, index) => {
            return <td key={index} >{item[column]}</td>
        })}
    </tr>
}