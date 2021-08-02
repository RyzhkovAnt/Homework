import axios from 'axios';
import { call, put, takeEvery,all } from 'redux-saga/effects'
import { hideLoader, showLoader, changeData, renderData } from "../reducer/actions";
import { getSomeItems } from '../utils/Utils'
import {DATA} from "../reducer/actionsType"


function* watchFetchData() {
    yield takeEvery('FETCH_DATA', fetchDataWorker)
}

function* fetchDataWorker(action) {
    try {
        yield put(showLoader());
        const data = yield call(() => {
            return axios.get(action.payload).then(responce => responce.data)
        })
        yield put({ type: DATA, payload: data })
        yield put(changeData(data))
        yield put(renderData(getSomeItems(data)))
        yield put(hideLoader())
    } catch {
        yield put(hideLoader())
    }
}

export function* rootSaga(){
    yield all([watchFetchData(),])
}