import {
    GET_ADD_VALUES_SUCCESS,
    GET_ADD_VALUES_FAILURE,
    UPDATE_ADD_VALUES_SUCCESS,
    UPDATE_ADD_VALUES_FAILURE,
} from './actionTypes';

const INIT_STATE = {
    addValues: [],
    error: null,
};

const AddValuesReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ADD_VALUES_SUCCESS:
            return {
                ...state,
                addValues: action.payload,
            };
        case GET_ADD_VALUES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case UPDATE_ADD_VALUES_SUCCESS:
            return {
                ...state,
                addValues: action.payload,
            };
        case UPDATE_ADD_VALUES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        
        default:
            return state;
            
    }
}

export default AddValuesReducer