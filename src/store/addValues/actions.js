import {
    GET_ADD_VALUES,
    GET_ADD_VALUES_SUCCESS,
    GET_ADD_VALUES_FAILURE,
    UPDATE_ADD_VALUES,
    UPDATE_ADD_VALUES_SUCCESS,
    UPDATE_ADD_VALUES_FAILURE,
} from './actionTypes';

export const getAddValues = () => ({
    type: GET_ADD_VALUES,
});

export const getAddValuesSuccess = (addValues) => ({
    type: GET_ADD_VALUES_SUCCESS,
    payload: addValues,
});

export const getAddValuesFailure = (error) => ({
    type: GET_ADD_VALUES_FAILURE,
    payload: error,
});

export const updateAddValues = (addValues) => ({
    type: UPDATE_ADD_VALUES,
    payload: addValues,
});

export const updateAddValuesSuccess = (addValues) => ({
    type: UPDATE_ADD_VALUES_SUCCESS,
    payload: addValues,
});

export const updateAddValuesFailure = (error) => ({
    type: UPDATE_ADD_VALUES_FAILURE,
    payload: error,
});

