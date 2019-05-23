import * as types from '../const/index';

var init = {
    posts : [],
    images : []
}


const myReducer = (state = init, action) => {
    switch (action.type) {
        case types.GET_POST:
            return { ...state, posts : action.posts}
        case types.UPLOAD_IMAGE_POST:
            return { ...state, images : action.images}
        case types.REMOVE_POST:
            return {...state, posts : action.posts}
        default:
            return {...state};
    }
}

export default myReducer