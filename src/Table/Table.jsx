import React, { useState } from 'react'
import { Row } from '../Grid/Row';
import { Grid } from "../Grid/Grid"
import { AdditionalInfo } from "../AdditionalInfo/AdditionalInfo"
import { AddUser } from "../AddUser/AddUser"
import { sortElement, getSomeItems, FilterElements } from "../utils/Utils"
import ReactPaginate from 'react-paginate';
import { Preloader } from '../PreLoader/Preloader'
import "./style.css"
import { connect, useSelector,useDispatch } from 'react-redux';
import { addUser, deleteElement, getDataForRender, search, selectElement, sorting } from '../reducer';
import { changePage, searchElements } from '../reducer/actions';


const Table = (props) => {
    const { items,
        renderElement,
        changeRenderedData,
        sortSetting,
        filterElement,
        sortElement,
        changeSelectedElement,
        deleteElement,
        addUser } = props;

    const columnName = ["id", "firstName", "lastName", "email", "phone"]
    const [sortedItems, setSortedItems] = useState(items)
    // const [page, setPage] = useState(0);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [searchString, setSearchString] = useState("");

    const dispatch = useDispatch()

    const  page=useSelector(state=>state.tableReducer.page)
    const renderData=useSelector(state=>state.tableReducer.renderData)
    const selectedElement=useSelector(state=>state.tableReducer.selectedElement)


    const SortElements = (field) => {
        const descendingOrder = sortSetting && sortSetting.field === field ? !sortSetting.descendingOrder : false;
        sortElement(field,descendingOrder)
    }

    const onPageClick = (e) => {
        dispatch(changePage(e.selected))
    }

    const onSearchHandler = () => {
        dispatch(searchElements(searchString))
        // filterElement(searchString)
    }

    const onAddUserHandeler = (user) => {
        addUser(user)
        setSearchString("")
        setShowAddUserForm(false)
    }


    const closeHandler = () => {
        changeSelectedElement(null)
    }

    return <div className="dataTable">
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
                RowItemCallback={changeSelectedElement}>
                {renderData && renderData.map((item, index) => {
                    return (
                        <Row key={index} item={item} />
                    )
                })}
            </Grid>
        </div>

        {Math.ceil(sortedItems.length / 50) > 1 &&
            <ReactPaginate
                pageCount={Math.ceil(sortedItems.length / 50)}
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
}

const mapStateToProps = (state) => {
    return {
        renderElement: state.ducks.renderData,
        sortSetting: state.ducks.sortSetting,
        page:state.ducks.page,
        selectedElement:state.ducks.selectedElement
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeRenderedData: (page) => dispatch(getDataForRender(page)),
        sortElement: (field, descendingOrder) => dispatch(sorting(field, descendingOrder)),
        filterElement:(str)=>dispatch(search(str)),
        changeSelectedElement:(el)=>dispatch(selectElement(el)),
        deleteElement:()=>dispatch(deleteElement()),
        addUser:(el)=>dispatch(addUser(el)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);