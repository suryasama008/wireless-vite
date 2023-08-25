import {
    GET_MODELS,
    GET_MODELS_SUCCESS,
    GET_MODELS_FAILURE,
    UPDATE_MODELS,
    UPDATE_MODELS_SUCCESS,
    UPDATE_MODELS_FAILURE,
} from './actionTypes';

export const getModels = () => ({
    type: GET_MODELS,
});

export const getModelsSuccess = (models) => ({
    type: GET_MODELS_SUCCESS,
    payload: models,
});

export const getModelsFailure = (error) => ({
    type: GET_MODELS_FAILURE,
    payload: error,
});

export const updateModels = (models) => ({
    type: UPDATE_MODELS,
    payload: models,
});

export const updateModelsSuccess = (models) => ({
    type: UPDATE_MODELS_SUCCESS,
    payload: models,
});

export const updateModelsFailure = (error) => ({
    type: UPDATE_MODELS_FAILURE,
    payload: error,
});

