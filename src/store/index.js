import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import ducks from "../reducer";

const rootReducer = combineReducers({
    ducks
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))