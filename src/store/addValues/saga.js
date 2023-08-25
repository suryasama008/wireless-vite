import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_ADD_VALUES, UPDATE_ADD_VALUES } from './actionTypes';

import {
    getAddValuesSuccess,
    getAddValuesFailure,
    updateAddValuesSuccess,
    updateAddValuesFailure,
} from './actions';

import {
    getAddValues,
    updateAddValues,
} from '../../helpers/DataContext'

function* fetchAddValues() {
    try {
        const response = yield call(getAddValues);
        yield put(getAddValuesSuccess(response));
    } catch (error) {
        yield put(getAddValuesFailure(error));
    }
}

function* onUpdateAddValues({ payload: data }) {
    try {
        const response = yield call(updateAddValues, data);
        yield put(updateAddValuesSuccess(response));
    } catch (error) {
        yield put(updateAddValuesFailure(error));
    }
}

function* addValuesSaga() {
    yield takeEvery(GET_ADD_VALUES, fetchAddValues);
    yield takeEvery(UPDATE_ADD_VALUES, onUpdateAddValues);
}

export default addValuesSaga;

