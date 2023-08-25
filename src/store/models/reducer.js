import {
    GET_MODELS_SUCCESS,
    GET_MODELS_FAILURE,
    UPDATE_MODELS_SUCCESS,
    UPDATE_MODELS_FAILURE,

} from './actionTypes';

const INIT_STATE = {
    models: [],
    error: null,
};

const ModelsReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MODELS_SUCCESS:
            return {
                ...state,
                models: action.payload,
            };
        case GET_MODELS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case UPDATE_MODELS_SUCCESS:
            return {
                ...state,
                models: action.payload,
            };
        case UPDATE_MODELS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        
        default:
            return state;
            
    }
};

export default ModelsReducer
