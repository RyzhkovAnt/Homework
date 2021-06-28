import React from 'react'
import "./style.css"
/** Grid props
    @prop {string} items Список отображаемых элементов таблицы
    @prop {[string]} ColumnsName Массив названий столбцов таблицы(в порядке отображения)
    @prop {(id)=>void} RowItemCallback Возращает id элемента по которому кликнули  
    @prop {(field:string)=>void} SortCallback Поле по которому производится сортировка
 */
export const Grid = (props) => {
    const { children, columnName, sortDirection,
         SortCallback, RowItemCallback,selectedItem } = props

    return <table>
            <thead>
                <tr>
                    {columnName.map((column, index) => {
                        const isSort = sortDirection && sortDirection.field === column;
                        return <th key={index}
                            className={`${isSort ? "sort" : "unsort"} ${isSort && sortDirection.descendingOrder ? "descending" : ""}`}
                            onClick={() => { SortCallback(column) }}>
                            {column}
                        </th>
                    })}
                </tr>
            </thead>
                <tbody >
                    {React.Children.map(children, child => {
                        return React.cloneElement(child, { columnName: columnName,
                             onClickHandler: RowItemCallback,
                             selected:selectedItem })
                    })}
                </tbody>
        </table>
}