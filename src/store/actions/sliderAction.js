import * as actions from './actionTypes'
import axios from '../../axios-instance'

export const sliderStart = () => {
    return {
        type: actions.Slider_Start
    }
}
export const sliderSuccess = (_sliderList) => {
    return {
        type: actions.Slider_success,
        sliderList: _sliderList
    }
}
export const sliderFail = (_error) => {
    return {
        type: actions.Slider_Fail,
        error: _error
    }
}
export const changedSliderStatus = (data) => {
    return dispatch => {
        dispatch(sliderStart())
        axios.post('admin/changeHomeSliderStatus', data)
            .then(res => {
                if (res.data.statusCode === 'OK') {
                    dispatch(listSliderMain());
                } else {
                    dispatch(sliderFail(res.data.statusMessage))
                }
            })
    }
}
export const addSlider = (addData) => {
    return dispatch => {
        dispatch(sliderStart())
        axios.post("admin/addHomeSlider", addData)
            .then(res => {
                if (res.data.statusCode === 'OK') {
                    dispatch(listSliderMain());
                } else {
                    dispatch(sliderFail(res.data.statusMessage));
                }
            })
            .catch(err => {
                dispatch(sliderFail(err));
            })
    }

}
export const listSlider = () => {
    return dispatch => {
        dispatch(sliderStart());
        dispatch(listSliderMain());
    }
}
export const listSliderMain = () => {
    return dispatch => {
        const data = {

            lang: "TR"
        }

        axios.post('admin/homeSliderList', data)
            .then(res => {
                if (res.data.statusCode === 'OK') {
                    dispatch(sliderSuccess(res.data.data));
                } else if (res.data.statusCode === "NOT_FOUND") {
                    dispatch(sliderSuccess(null));
                } else {
                    sliderFail(res.data.statusMessage)
                }
            })
            .catch(err => {
                dispatch(sliderFail(err));
            })
    }
}
