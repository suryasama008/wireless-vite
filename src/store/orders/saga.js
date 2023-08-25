import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchOrdersSuccess,
  fetchOrdersFailure,
  addNewOrdersSuccess,
  addNewOrdersFailure,
  updateOrdersSuccess,
  updateOrdersFailure,
  deleteOrdersSuccess,
  deleteOrdersFailure,
} from './actions'
import {
  FETCH_ORDERS,
  ADD_NEW_ORDERS,
  UPDATE_ORDERS,
  DELETE_ORDERS,
} from './actionTypes'
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from '../../helpers/DataContext'
function* getOrdersSaga(action) {
  try {
    console.log('action.payload', action.payload)
    const response = yield call(getOrders, action.payload)
    yield put(fetchOrdersSuccess(response))
  } catch (error) {
    yield put(fetchOrdersFailure(error))
  }
}

function* addNewOrdersSaga(action) {
  try {
    const response = yield call(addOrder, action.payload)
    yield put(addNewOrdersSuccess(response.data))
  } catch (error) {
    yield put(addNewOrdersFailure(error))
  }
}

function* updateOrdersSaga(action) {
  try {
    const response = yield call(updateOrder, action.payload)
    yield put(updateOrdersSuccess(response.data))
  } catch (error) {
    yield put(updateOrdersFailure(error))
  }
}

function* deleteOrdersSaga(action) {
  try {
    yield call(deleteOrder, action.payload)
    yield put(deleteOrdersSuccess())
  } catch (error) {
    yield put(deleteOrdersFailure(error))
  }
}

export default function* ordersSaga() {
  yield takeLatest(FETCH_ORDERS, getOrdersSaga)
  yield takeLatest(ADD_NEW_ORDERS, addNewOrdersSaga)
  yield takeLatest(UPDATE_ORDERS, updateOrdersSaga)
  yield takeLatest(DELETE_ORDERS, deleteOrdersSaga)
}
