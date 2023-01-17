import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_ITEMS, ADD_NEW_ITEM, UPDATE_ITEM, DELETE_ITEM } from './actionTypes';

import {
    getItemsSuccess,
    getItemsFailure,
    addNewItemSuccess,
    addNewItemFailure,
    updateItemSuccess,
    updateItemFailure,
    deleteItemSuccess,
    deleteItemFailure,
} from './actions';

import {
  getItems,
  addNewItem,
  updateItem,
  deleteItem,
} from '../../helpers/fakebackend_helper'

function* fetchItems() {
    try {
        const response = yield call(getItems);
        yield put(getItemsSuccess(response));
    } catch (error) {
        yield put(getItemsFailure(error));
    }
}

function* onAddNewItem({ payload: data }) {
    try {
        const response = yield call(addNewItem, data);
        yield put(addNewItemSuccess(response));
    } catch (error) {
        yield put(addNewItemFailure(error));
    }
}

function* onUpdateItem({ payload: data }) {
    try {
        const response = yield call(updateItem, data);
        yield put(updateItemSuccess(response));
    } catch (error) {
        yield put(updateItemFailure(error));
    }
}

function* onDeleteItem({ payload: data }) {
    try {
        const response = yield call(deleteItem, data);
        yield put(deleteItemSuccess(response));
    } catch (error) {
        yield put(deleteItemFailure(error));
    }
}

function* itemsSaga() {
    yield takeEvery(GET_ITEMS, fetchItems);
    yield takeEvery(ADD_NEW_ITEM, onAddNewItem);
    yield takeEvery(UPDATE_ITEM, onUpdateItem);
    yield takeEvery(DELETE_ITEM, onDeleteItem);
}

export default itemsSaga;