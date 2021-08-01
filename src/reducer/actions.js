import axios from "axios";
import { FilterElements, getSomeItems, sortElement } from "../utils/Utils";
import { CHANGED_DATA, DATA, HIDE_LOADER, PAGE, RENDER_DATA, SELECT_ELEMENT, SETTING_SORT, SHOW_LOADER } from "./actionsType";

export function showLoader() {
    return { type: SHOW_LOADER }
}

export function hideLoader() {
    return { type: HIDE_LOADER }
}

export function renderData(data) {
    return {
        type: RENDER_DATA,
        payload: data
    }
}

export function changeData(data) {
    return {
        type: CHANGED_DATA,
        payload: data
    }
}

export function changePage(page) {
    return {
        type: PAGE,
        payload: page
    }
}
export function changeSelectedElement(element) {
    return {
        type: SELECT_ELEMENT,
        payload: element
    }
}
export function changeSortingSetting(field) {
    return (dispatch, getState) => {
        const oldSettings = getState().tableReducer.sortSetting;
        const settings = {
            field,
            descendingOrder: oldSettings.field === field ? !oldSettings.descendingOrder : false
        }
        dispatch({ type: SETTING_SORT, payload: settings })
    }
}

export function sortData() {
    return (dispatch, getState) => {
        dispatch(showLoader())
        const data = getState().tableReducer.changedData;
        const setting = getState().tableReducer.sortSetting;
        const sorted = sortElement(data, setting.field, setting.descendingOrder)
        const renderElement = getSomeItems(sorted, 0)

        dispatch(changePage(0))
        dispatch(changeData(sorted))
        dispatch(renderData(renderElement))
        dispatch(hideLoader())
    }
}

export function searchElements(searchString) {
    return (dispatch, getState) => {
        dispatch(showLoader())
        const data = getState().tableReducer.data;
        const findData = FilterElements(data, searchString)
        const sorted = sortElement(findData, "none", false)
        const renderElement = getSomeItems(sorted, 0)

        dispatch(changePage(0))
        dispatch(changeSortingSetting({ field: "none", descendingOrder: false }))
        dispatch(changeData(sorted))
        dispatch(renderData(renderElement))
        dispatch(hideLoader())
    }
}

export function addUser(user) {
    return (dispatch, getState) => {
        const newData = [user, ...getState().tableReducer.data]
        const renderElements = getSomeItems(newData)

        dispatch(changePage(0))
        dispatch({ type: DATA, payload: newData })
        dispatch(changeData(newData))
        dispatch(renderData(renderElements))
        dispatch(changeSortingSetting({ field: "none", descendingOrder: false }))
    }
}

export function deleteElement() {
    return (dispatch, getState) => {
        const el = getState().tableReducer.selectedElement;
        const newDefData = getState().tableReducer.data.filter(item => item !== el)
        const newSortData = getState().tableReducer.changedData.filter(item => item !== el)
        const renderElements = getSomeItems(newSortData, getState().tableReducer.page * 50)


        dispatch({ type: DATA, payload: newDefData })
        dispatch(changeData(newSortData))
        dispatch(renderData(renderElements))
        dispatch(changeSelectedElement(null))
    }
}

export function getData(source) {
    return dispatch => {
        dispatch(showLoader())
        let data = [];
        axios.get(source)
            .then((response) => {
                data = response.data;
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => {
                dispatch({ type: DATA, payload: data })
                dispatch(changeData(data))
                dispatch(renderData(getSomeItems(data)))
                dispatch(hideLoader())
            }
            )
    }
}

