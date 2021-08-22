import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { addUser, changeElementPosition, changePage, renderData, searchElements } from '../../reducer/actions';
import { getSomeItems } from "../../utils/Utils"
import { AddUser } from "../AddUser"
import { AdditionalInfo } from "../AdditionalInfo"
import { Grid, Row } from "../Grid"
import "./style.css"

const Table = (props) => {

    const columnName = ["id", "firstName", "lastName", "email", "phone"]
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [searchString, setSearchString] = useState("");

    const dispatch = useDispatch()

    const page = useSelector(state => state.tableReducer.page);
    const dataForRender = useSelector(state => state.tableReducer.renderData);
    const selectedElement = useSelector(state => state.tableReducer.selectedElement);
    const data = useSelector(state => state.tableReducer.changedData);

    const onPageClick = (e) => {
        dispatch(changePage(e.selected))
        dispatch(renderData(getSomeItems(data, e.selected * 50)))
    }

    const onSearchHandler = () => {
        dispatch(searchElements(searchString))
    }

    const onAddUserHandeler = (user) => {
        dispatch(addUser(user))
        setSearchString("")
        setShowAddUserForm(false)
    }

    const SortableItem = SortableElement(({ value, columns }) => <Row item={value} columnName={columns} />)
    const SortableList = SortableContainer(({ items, columns }) => {
        return (
            <Grid columnName={columns} >
                {items.map((item, index) => (
                    <SortableItem key={index} index={index} value={item} columns={columns} />
                ))}
            </Grid>
        )
    })
    return (
        <div className="dataTable">
            <div className="addUser">
                {!showAddUserForm && <button onClick={() => { setShowAddUserForm(true) }}>Добавить запись</button>}
                {showAddUserForm && <AddUser onSubmit={onAddUserHandeler} />}
            </div>
            <div className="filter">
                <input value={searchString} onChange={(e) => { setSearchString(e.target.value) }} />
                <button onClick={onSearchHandler}>Найти</button>
            </div>
            <div className="dataGrid">
                <SortableList
                    items={dataForRender}
                    columns={columnName}
                    lockAxis="y" pressDelay={125}
                    onSortEnd={({ newIndex, oldIndex }) =>
                        dispatch(changeElementPosition(oldIndex, newIndex))} />
            </div>

            {Math.ceil(data.length / 50) > 1 &&
                <ReactPaginate
                    pageCount={Math.ceil(data.length / 50)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    activeClassName="active"
                    containerClassName="pagination"
                    breakLabel="..."
                    previousLabel="<"
                    nextLabel=">"
                    initialPage={0}
                    forcePage={page}
                    disabledClassName="disabled"
                    onPageChange={onPageClick}
                    breakClassName={'break-me'}
                />}
            {selectedElement &&
                <div className="additionalInfo">
                    <AdditionalInfo />
                </div>
            }
        </div>
    )

}
export default Table