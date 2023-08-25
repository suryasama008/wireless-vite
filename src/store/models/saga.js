import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_MODELS, UPDATE_MODELS } from './actionTypes';

import {
    getModelsSuccess,
    getModelsFailure,
    updateModelsSuccess,
    updateModelsFailure,
} from './actions';

import {
  getItems,
  addNewItem,
  updateItem,
  deleteItem,
} from '../../helpers/fakebackend_helper'

import {
    getModels,
    updateModels,
} from '../../helpers/DataContext'

function* fetchModels() {
    try {
        const response = yield call(getModels);
        yield put(getModelsSuccess(response));
    } catch (error) {
        yield put(getModelsFailure(error));
    }
}

function* onUpdateModels({ payload: data }) {
    try {
        const response = yield call(updateModels, data);
        yield put(updateModelsSuccess(response));
    } catch (error) {
        yield put(updateModelsFailure(error));
    }
}


function* modelsSaga() {
    yield takeEvery(GET_MODELS, fetchModels);
    yield takeEvery(UPDATE_MODELS, onUpdateModels);
}

export default modelsSaga;