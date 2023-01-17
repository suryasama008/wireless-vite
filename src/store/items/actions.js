import {
    GET_ITEMS,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    ADD_NEW_ITEM,
    ADD_NEW_ITEM_SUCCESS,
    ADD_NEW_ITEM_FAILURE,
    UPDATE_ITEM,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    DELETE_ITEM,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE
} from './actionTypes';

export const getItems = () => ({
    type: GET_ITEMS, 
});

export const getItemsSuccess = (items) => ({
    type: GET_ITEMS_SUCCESS,
    payload: items,
});

export const getItemsFailure = (error) => ({
    type: GET_ITEMS_FAILURE,
    payload: error,
});

export const addNewItem = (item) => ({
    type: ADD_NEW_ITEM,
    payload: item,
});

export const addNewItemSuccess = (item) => ({
    type: ADD_NEW_ITEM_SUCCESS,
    payload: item,
});

export const addNewItemFailure = (error) => ({
    type: ADD_NEW_ITEM_FAILURE,
    payload: error,
});

export const updateItem = (item) => ({
    type: UPDATE_ITEM,
    payload: item,
});

export const updateItemSuccess = (item) => ({
    type: UPDATE_ITEM_SUCCESS,
    payload: item,
});

export const updateItemFailure = (error) => ({
    type: UPDATE_ITEM_FAILURE,
    payload: error,
});

export const deleteItem = (item) => ({
    type: DELETE_ITEM,
    payload: item,
});

export const deleteItemSuccess = (item) => ({
    type: DELETE_ITEM_SUCCESS,
    payload: item,
});

export const deleteItemFailure = (error) => ({
    type: DELETE_ITEM_FAILURE,
    payload: error,
});

