import {
  FETCH_ORDERS_SUCCESS,
  ADD_NEW_ORDERS_SUCCESS,
  UPDATE_ORDERS_SUCCESS,
  DELETE_ORDERS_SUCCESS,
} from './actionTypes'

const initialState = {
  orders: [],
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload, error: null }
    case ADD_NEW_ORDERS_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        error: null,
      }
    case UPDATE_ORDERS_SUCCESS:
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.id ? action.payload : order
      )
      return { ...state, orders: updatedOrders, error: null }
    case DELETE_ORDERS_SUCCESS:
      const filteredOrders = state.orders.filter(
        (order) => order.id !== action.payload
      )
      return { ...state, orders: filteredOrders, error: null }
    default:
      return state
  }
}

export default reducer
