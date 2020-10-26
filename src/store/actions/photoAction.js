import * as actions from './actionTypes'
import axios from '../../axios-instance'

export const photoStart = () => {
    return {
        type: actions.PHOTO_START
    }
}
export const photoSuccess = (_photoData) => {
    return {
        type: actions.PHOTO_SUCCESS,
        photoData: _photoData
    }
}
export const photoFail = (_error) => {
    return {
        type: actions.PHOTO_FAIL,
        error: _error
    }
}
export const photoProgress = (_loaded, _total) => {
    return {
        type: actions.PHOTO_PROGRESS,
        photoLoaded: _loaded,
        photoTotal: _total

    }
}
export const addPhoto = (data) => {
    return dispatch => {
        dispatch(photoStart());
        axios.post('admin/photo/insert', data, {
            onUploadProgress: progressEvent => {
                dispatch(photoProgress(progressEvent.loaded, progressEvent.total));
                //console.log("loading :", Math.round(progressEvent.loaded / progressEvent.total * 100));
            }
        })
            .then(res => {
                const list = new Array();
                list.push(res.data.data);
                dispatch(photoSuccess(list));
                dispatch(photoProgress(0, 0))
            })
            .catch(error => {
                dispatch(photoFail(error))
            })
    }
}