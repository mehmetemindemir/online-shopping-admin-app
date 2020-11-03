import {updateObject} from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";
import {sliderFail} from "../actions/sliderAction";

const initialState = {
    sliderList: null,
    error: null,
    loading: false,
}
const sliderStart = (state) => {
    return updateObject(state, {loading: true});
}
const sliderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        sliderList: action.sliderList
    });
}
const sliderError = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Slider_Start:
            return sliderStart(state);
        case actionTypes.Slider_success:
            return sliderSuccess(state, action);
        case actionTypes.Slider_Fail:
            return sliderFail(state, action);
        default:
            return state;
    }
}
export default reducer;