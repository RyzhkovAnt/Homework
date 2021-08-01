import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import ducks from "../reducer";
import {tableReducer} from "../reducer/tableReducer"

const rootReducer = combineReducers({
    ducks,tableReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))