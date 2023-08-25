
import {
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from './actionTypes'

const INIT_STATE = {
  users: {},
  user: [],
  employees: [],
  error: {},
}

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }
    case GET_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }  
    default:
      return state
  }
}

export default users
