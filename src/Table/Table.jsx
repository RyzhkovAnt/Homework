import React, { useState } from 'react'
import { Row } from '../Grid/Row';
import { Grid } from "../Grid/Grid"
import { AdditionalInfo } from "../AdditionalInfo/AdditionalInfo"
import { AddUser } from "../AddUser/AddUser"
import { sortElement, getSomeItems, FilterElements } from "../utils/Utils"
import ReactPaginate from 'react-paginate';
import { Preloader } from '../PreLoader/Preloader'
import "./style.css"


export const Table = (props) => {
    const { items } = props;

    const columnName = ["id", "firstName", "lastName", "email", "phone"]
    const [allElements, setAllElements] = useState(items)
    const [sortDirection, setSortDirection] = useState({ field: "none", descendingOrder: false })
    const [sortedItems, setSortedItems] = useState(items)
    const [renderItem, setRenderItem] = useState(getSomeItems(sortedItems));
    const [selectedItem, setSelectedItem] = useState(null)
    const [page, setPage] = useState(0);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [searchString, setSearchString] = useState("");

    const SortElements = (field) => {
        const descendingOrder = sortDirection.field === field ? !sortDirection.descendingOrder : false;
        setSortDirection({ field, descendingOrder });
        const sorted = sortElement(sortedItems, field, descendingOrder);
        setSortedItems(sorted);
        setRenderItem(getSomeItems(sorted));
        setPage(0)
        setSelectedItem(null)
    }

    const onPageClick = (e) => {
        setPage(e.selected)
        setRenderItem(getSomeItems(sortedItems, e.selected * 50))
    }

    const onSearchHandler = () => {
        const searchedItem = FilterElements(allElements, searchString);
        setSortedItems(searchedItem)
        setRenderItem(getSomeItems(searchedItem))
        setSortDirection({ field: "none", descendingOrder: false })
    }

    const onAddUserHandeler = (user) => {
        setAllElements([user, ...allElements])
        setSortedItems([user, ...items])
        setRenderItem(getSomeItems([user, ...items]))
        setSortDirection({ field: "none", descendingOrder: false })
        setSearchString("")
        setShowAddUserForm(false)
    }

    const deleteHandler = () => {
        let newItemArray = sortedItems.filter(el => el !== selectedItem)
        setAllElements(allElements.filter(el => el !== selectedItem))
        setSortedItems(newItemArray)
        setRenderItem(getSomeItems(newItemArray, page * 50))
        setSelectedItem(null)
    }

    const closeHandler = () => {
        setSelectedItem(null)
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
                selectedItem={selectedItem}
                sortDirection={sortDirection}
                SortCallback={SortElements}
                RowItemCallback={setSelectedItem}>
                {renderItem && renderItem.map((item, index) => {
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
        {selectedItem &&
            <div className="additionalInfo">
                <AdditionalInfo item={selectedItem} deleteHandler={deleteHandler} closeHandler={closeHandler} />
            </div>
        }


    </div>
}

export default Table;