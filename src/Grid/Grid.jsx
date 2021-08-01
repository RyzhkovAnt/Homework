import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeSortingSetting, sortData } from '../reducer/actions'
import "./style.css"
/** Grid props
    @prop {string} items Список отображаемых элементов таблицы
    @prop {[string]} ColumnsName Массив названий столбцов таблицы(в порядке отображения)
    @prop {(id)=>void} RowItemCallback Возращает id элемента по которому кликнули  
    @prop {(field:string)=>void} SortCallback Поле по которому производится сортировка
 */
export const Grid = (props) => {
    const { children, columnName, sortDirection,
        SortCallback, RowItemCallback, selectedItem } = props

    const dispatch = useDispatch()

    const sortSetting = useSelector(state => state.tableReducer.sortSetting)

    return <table>
        <thead>
            <tr>
                {columnName.map((column, index) => {
                    const isSort = sortSetting && sortSetting.field === column;
                    return <th key={index}
                        className={`${isSort ? "sort" : "unsort"} ${isSort && sortSetting.descendingOrder ? "descending" : ""}`}
                        onClick={() => {
                            dispatch(changeSortingSetting(column));
                            dispatch(sortData())
                        }}>
                        {column}
                    </th>
                })}
            </tr>
        </thead>
        <tbody >
            {React.Children.map(children, child => {
                return React.cloneElement(child, {
                    columnName: columnName,
                    onClickHandler: RowItemCallback,
                    selected: selectedItem
                })
            })}
        </tbody>
    </table>
}