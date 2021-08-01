import axios from "axios";
import { FilterElements, getSomeItems, sortElement } from "../utils/Utils";
const LOADING = "LOADING";
const DATA = "DATA";
const RENDER_DATA = "RENDER_DATA";
const SORTING = "SORTING";
const SEARCH_ELEMENT = "SEARCH_ELEMENT";
const SELECT_ELEMENT = "SELECT_ELEMENT";
const DELETE_ELEMENT = "DELETE_ELEMENT";
const ADD_USER = "ADD_USER";
const defaultState = {
    count: 0,
    loading: false,
    data: [],
    defData: [],
    renderData: [],
}

export default function ducks(state = defaultState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.loading }
        case DATA:
            const renderData = getSomeItems(action.data,);
            return {
                ...state, defData: action.data,
                data: action.data,
                loading: false,
                renderData: renderData
            }
        case RENDER_DATA:
            return { ...state, renderData: action.renderData, page: action.page }
        case SORTING:
            return {
                ...state,
                sortSetting: action.sortSetting,
                data: action.data,
                renderData: action.renderData,
                page: action.page
            }
        case SEARCH_ELEMENT:
            return {
                ...state,
                sortSetting: action.sortSetting,
                data: action.filteredEl,
                renderData: action.renderData,
                page: action.page
            }
        case SELECT_ELEMENT:
            return { ...state, selectedElement: action.selectedElement }
        case DELETE_ELEMENT:
            return {
                ...state,
                defData: action.defData,
                renderData: action.renderData,
                selectedElement: null,
                data: action.data
            }
        case ADD_USER:
            return {
                ...state,
                defData: action.data,
                data: action.data,
                renderData: action.renderData,
                sortSetting: action.sortSetting
            }

        default: return state
    }
}

export function loading(isLoading) {
    return dispatch => {
        return dispatch({ type: LOADING, loading: isLoading })
    }
}

export function getDataForTable(source) {
    return dispatch => {
        let data = [];
        axios.get(source)
            .then((response) => {
                data = response.data;
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => {
                dispatch({ type: DATA, data: data, })
            }
            )
    }
}

export function getDataForRender(page) {
    return (dispatch, getState) => {
        const data = getState().ducks.data;
        let renderEl = getSomeItems(data, page * 50)
        dispatch({ type: RENDER_DATA, renderData: renderEl, page: page })
    }
}

export function sorting(field, descendingOrder) {
    return (dispatch, getState) => {
        const sortingElem = sortElement(getState().ducks.data, field, descendingOrder)
        const renderEl = getSomeItems(sortingElem)
        dispatch({
            type: SORTING,
            sortSetting: { field: field, descendingOrder: descendingOrder },
            data: sortingElem,
            renderData: renderEl,
            page: 0
        })
    }
}

export function search(searchString) {
    return (dispatch, getState) => {
        const filteredEl = FilterElements(getState().ducks.defData, searchString)
        const renderEl = getSomeItems(filteredEl)
        const sortSetting = { field: "none", descendingOrder: false }
        const page = 0;

        dispatch({
            type: SEARCH_ELEMENT,
            filteredEl: filteredEl,
            page: 0,
            sortSetting: sortSetting,
            renderData: renderEl,
        })
    }
}
export function selectElement(el) {
    return dispatch =>
        dispatch({ type: SELECT_ELEMENT, selectedElement: el })
}
export function deleteElement() {
    return (dispatch, getState) => {
        const el = getState().ducks.selectedElement;
        const newDefData = getState().ducks.defData.filter(item => item !== el)
        const newSortData = getState().ducks.data.filter(item => item !== el)
        const renderData = getSomeItems(newSortData, getState().ducks.page * 50)
        dispatch({ type: DELETE_ELEMENT, defData: newDefData, data: newSortData, renderData: renderData })
    }
}

export function addUser(el) {
    return (dispatch, getState) => {
        const newData = [el, ...getState().ducks.defData];
        const renderEl = getSomeItems(newData)
        const sortSettings = { field: "none", descendingOrder: false }
        dispatch({
            type: ADD_USER,
            data: newData, renderData: renderEl, sortSettings: sortSettings
        })
    }
}