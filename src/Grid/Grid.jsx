import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeSortingSetting, sortData } from '../reducer/actions'
import "./style.css"


/** Grid props
    @prop {[string]} ColumnsName Массив названий столбцов таблицы(в порядке отображения)
 */
export const Grid = (props) => {
    const { children, columnName } = props

    const dispatch = useDispatch()

    const sortSetting = useSelector(state => state.tableReducer.sortSetting)

    return (
        <div className="tableFixHead">
            <table>
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
                        })
                    })}
                </tbody>
            </table>
        </div>
    )
}