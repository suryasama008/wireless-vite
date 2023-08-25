import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from './actionTypes'

export const getUsersData = (id) => ({
  type: GET_USER,
  payload: id,
})

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
})

export const getUserFail = (error) => ({
  type: GET_USER_FAIL,
  payload: error,
})

