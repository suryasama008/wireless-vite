// // action types
// export const FETCH_ORDERS = 'FETCH_ORDERS'
// export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
// export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE'

// export const ADD_NEW_ORDERS = 'ADD_NEW_ORDERS'
// export const ADD_NEW_ORDERS_SUCCESS = 'ADD_NEW_ORDERS_SUCCESS'
// export const ADD_NEW_ORDERS_FAILURE = 'ADD_NEW_ORDERS_FAILURE'

// export const UPDATE_ORDERS = 'UPDATE_ORDERS'
// export const UPDATE_ORDERS_SUCCESS = 'UPDATE_ORDERS_SUCCESS'
// export const UPDATE_ORDERS_FAILURE = 'UPDATE_ORDERS_FAILURE'

// export const DELETE_ORDERS = 'DELETE_ORDERS'
// export const DELETE_ORDERS_SUCCESS = 'DELETE_ORDERS_SUCCESS'
// export const DELETE_ORDERS_FAILURE = 'DELETE_ORDERS_FAILURE'
import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  ADD_NEW_ORDERS,
  ADD_NEW_ORDERS_SUCCESS,
  ADD_NEW_ORDERS_FAILURE,
  UPDATE_ORDERS,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_ORDERS_FAILURE,
  DELETE_ORDERS,
  DELETE_ORDERS_SUCCESS,
  DELETE_ORDERS_FAILURE,
} from './actionTypes'

// action creators
export const fetchOrders = (date) => {
  return {
    type: FETCH_ORDERS,
    payload: date
  }
}
export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
})
export const fetchOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error,
})

export const addNewOrders = (order) => {
  return {
    type: ADD_NEW_ORDERS,
    payload: order,
  }
}

export const addNewOrdersSuccess = (order) => ({
  type: ADD_NEW_ORDERS_SUCCESS,
  payload: order,
})
export const addNewOrdersFailure = (error) => ({
  type: ADD_NEW_ORDERS_FAILURE,
  payload: error,
})

export const updateOrders = (order) => {
  return { type: UPDATE_ORDERS, payload: order }
}
export const updateOrdersSuccess = (order) => ({
  type: UPDATE_ORDERS_SUCCESS,
  payload: order,
})
export const updateOrdersFailure = (error) => ({
  type: UPDATE_ORDERS_FAILURE,
  payload: error,
})

export const deleteOrders = (id) => ({ type: DELETE_ORDERS, payload: id })
export const deleteOrdersSuccess = () => ({ type: DELETE_ORDERS_SUCCESS })
export const deleteOrdersFailure = (error) => ({
  type: DELETE_ORDERS_FAILURE,
  payload: error,
})
