import {updateObject} from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    photoData: null,
    error: null,
    loading: false,
    photoLoaded: null,
    photoTotal: null,
}

const photoStart = (state, action) => {
    return updateObject(state, {loading: true, error: null});
}
const photoSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        photoData: action.photoData
    });
}
const photoFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}
const photoProgress = (action) => {
    return {
        photoLoaded: action.photoLoaded,
        photoTotal: action.photoTotal
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MENU_START:
            return photoStart(state);
        case actionTypes.MENU_SUCCESS:
            return photoSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return photoFail(state, action);
        case actionTypes.PHOTO_PROGRESS:
            return photoProgress(action)
        default:
            return state;

    }
}
export default reducer;