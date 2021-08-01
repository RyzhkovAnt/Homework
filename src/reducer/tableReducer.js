import { hideLoader } from "./actions"
import { CHANGED_DATA, DATA, HIDE_LOADER, PAGE, RENDER_DATA, SELECT_ELEMENT, SETTING_SORT, SHOW_LOADER, SORTING } from "./actionsType"

const initialState = {

    data: [],
    changedData: [],
    renderData: [],
    page: 0,
    sortSetting: { field: null, descendingOrder: false },
    loading: false,
    selectedElement:null,
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE:
            return { ...state, page: action.payload }
        case RENDER_DATA:
            return { ...state, renderData: action.payload }
        case HIDE_LOADER:
            return { ...state, loading: false }
        case SHOW_LOADER:
            return { ...state, loading: true }
        case CHANGED_DATA:
            return { ...state, changedData: action.payload }
        case DATA:
            return { ...state, data: action.payload }
        case SETTING_SORT:
            return { ...state, sortSetting: action.payload }
        case SELECT_ELEMENT:
            return {...state,selectedElement:action.payload}

        default: return state
    }
}