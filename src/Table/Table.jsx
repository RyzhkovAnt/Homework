import React, { useState } from 'react'
import { Row } from '../Grid/Row';
import { Grid } from "../Grid/Grid"
import { AdditionalInfo } from "../AdditionalInfo/AdditionalInfo"
import { AddUser } from "../AddUser/AddUser"
import { getSomeItems } from "../utils/Utils"
import ReactPaginate from 'react-paginate';
import "./style.css"
import { connect, useSelector, useDispatch } from 'react-redux';
import { addUser, changePage, changeSelectedElement, renderData, searchElements } from '../reducer/actions';


const Table = (props) => {
    const {
        sortSetting,
        sortElement } = props;

    const columnName = ["id", "firstName", "lastName", "email", "phone"]
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [searchString, setSearchString] = useState("");

    const dispatch = useDispatch()

    const page = useSelector(state => state.tableReducer.page);
    const dataForRender = useSelector(state => state.tableReducer.renderData);
    const selectedElement = useSelector(state => state.tableReducer.selectedElement);
    const data = useSelector(state => state.tableReducer.changedData);

    const SortElements = (field) => {
        const descendingOrder = sortSetting && sortSetting.field === field ? !sortSetting.descendingOrder : false;
        sortElement(field, descendingOrder)
    }

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
                <Grid
                    columnName={columnName}
                    selectedItem={selectedElement}
                    sortDirection={sortSetting}
                    SortCallback={SortElements}
                    RowItemCallback={(el)=>dispatch(changeSelectedElement(el))}>
                    {dataForRender && dataForRender.map((item, index) => {
                        return (
                            <Row key={index} item={item} />
                        )
                    })}
                </Grid>
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