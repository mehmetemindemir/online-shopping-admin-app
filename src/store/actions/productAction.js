import * as actions from './actionTypes'
import axios from './../../axios-instance'

export const productStart = () => {
    return {
        type: actions.PRODUCT_START
    }
}
export const productAddSuccess = (_productData) => {
    return {
        type: actions.PRODUCT_ADD_SUCCESS,
        productAddResult: _productData
    }
}
export const productListSuccess = (_productDataList) => {
    return {
        type: actions.PRODUCT_LIST_SUCCESS,
        productList: _productDataList
    }
}
export const productFail = (_error) => {
    return {
        type: actions.PRODUCT_FAIL,
        error: _error
    }
}

export const addProduct = (data, poductCritea) => {
    return dispatch => {
        dispatch(productStart());
        axios.post("admin/addProduct", data)
            .then(res => {
                console.log("Add Product", res.data.statusCode)
                if (res.data.statusCode === 'OK') {
                    dispatch(getProductMain(poductCritea));
                } else {
                    dispatch(productFail(res.data.statusMessage));
                }
            })
            .catch(error => {
                dispatch(productFail(error))
            })

    }
}
export const changedPrdStatus = (data, productCritea) => {
    return dispatch => {
        dispatch(productStart())
        axios.post("admin/changeProductStatus", data)
            .then(res => {
                if (res.data.statusCode === 'OK') {
                    dispatch(getProductMain(productCritea));
                } else {
                    dispatch(productFail(res.data.statusMessage))
                }
            })
            .catch(err => {
                dispatch(productFail(err));
            })

    }
}

const getProductMain = (data) => {
    return dispatch => {
        axios.post("admin/productList", data)
            .then(res => {
                if (res.data.statusCode === 'OK') {
                    dispatch(productListSuccess(res.data.data));
                } else if (res.data.statusCode === 'NOT_FOUND') {
                    dispatch(productListSuccess([]))
                } else {
                    dispatch(productFail(res.data.statusMessage));
                }
            })
            .catch(err => {
                dispatch(productFail(err));
            });
    }
}
export const getProduct = (data) => {
    return dispatch => {
        dispatch(productStart());
        dispatch(getProductMain(data));
    }

}