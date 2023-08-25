import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_USER,
} from './actionTypes'
import {  getUserSuccess, getUserFail } from "./actions"
import { getCurrentUser } from '../../helpers/AuthContext'
import {getUserData} from '../../helpers/DataContext'

function* fetchUser(action) {
    try {
        const user = yield call(getUserData, action.payload);
        yield put(getUserSuccess(user));
    } catch (error) {
        yield put(getUserFail(error))
    }
}

function* usersSaga() {
    yield takeEvery(GET_USER, fetchUser);
}

export default usersSaga;