import {
    GET_ITEMS_FAILURE,
    GET_ITEMS_SUCCESS,
    ADD_NEW_ITEM_FAILURE,
    ADD_NEW_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    UPDATE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
    DELETE_ITEM_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
    items: [],
    error: null,
};

const ItemReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload,
            };
        case GET_ITEMS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case ADD_NEW_ITEM_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case ADD_NEW_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.map(
                    item => item.id === action.payload.id ? { item, ...action.payload } : item
                ),
            };
        case UPDATE_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                 items: state.items.filter(
                    item => item.id.toString() !== action.payload.id.toString()
                ),
            };
        case DELETE_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ItemReducer
