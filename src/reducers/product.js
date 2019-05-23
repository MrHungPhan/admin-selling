import * as types from '../const/index';

var init = {
    products : [],
    product : {},
    images : [],
    typeE : '',
    catalog : [],
    style: []
}


const myReducer = (state = init, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS:
            return { ...state, products : action.products}
        case types.REMOVE_PRODUCT:
            debugger
            return { ...state, products : action.products}
        case types.UPLOAD_IMAGE:
            return {...state, images : action.images, typeE : action.typeE}
        case types.GET_CATALOG:
            return { ...state, catalog : action.catalog}
        case types.GET_STYLE:
            return {...state, style : action.style}
        case types.RESET_ALL_ADD:
            return { ...init, }
        default:
            return {...state};
    }
}

export default myReducer