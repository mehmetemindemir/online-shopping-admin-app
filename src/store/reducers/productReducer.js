import {updateObject} from "../../shared/utility";
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    productAddResult: null,
    error: null,
    loading: false,
    productList: null
};
const productStart = (state) => {
    return updateObject(state, {loading: true})
};

const productAddSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        productAddResult: action.productAddResult
    });
};
const productListSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        productList: action.productList
    });
};
const productFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error

    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_START:
            return productStart(state);
        case actionTypes.PRODUCT_ADD_SUCCESS:
            return productAddSuccess(state, action);
        case actionTypes.PRODUCT_LIST_SUCCESS:
            return productListSuccess(state, action);
        case actionTypes.PRODUCT_FAIL:
            return productFail(state, action);
        default:
            return state;
    }
}
export default reducer;
