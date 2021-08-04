import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectedElement } from '../reducer/actions';
import "./style.css";

export const Row = (props) => {
    const { item, columnName } = props;
    const dispatch = useDispatch();
    const selected = useSelector(state => state.tableReducer.selectedElement);
    return (
        <tr
            onClick={() => dispatch(changeSelectedElement(item))}
            className={`tableRow ${selected === item ? "select" : ""}`}>
            {columnName.map((column, index) => {
                return <td key={index} >{item[column]}</td>
            })}
        </tr>
    )
}