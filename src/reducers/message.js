import * as types from '../const/index';

var init = {
    statusAddProduct : null,
    messAddProduct :  '',
    messRemoveProduct : '',

    statusAddPost : null,
    messAddPost : '',
    messRemovePost : ''
}


const myReducer = (state = init, action) => {
    switch (action.type) {
        case types.ADD_PRODUCT:
            return { ...state, statusAddProduct : action.mess.status, messAddProduct: action.mess.message}
        case types.RESET_MESS_ADD:
            return{ ...state, statusAddProduct: null, messAddProduct : ''}
        case types.REMOVE_PRODUCT:
            return{...state, messRemoveProduct: action.mess}
        case types.RESET_MESS_REMOVE:
            return{...state, messRemoveProduct: ''}

        case types.ADD_POST:
            return {...state, statusAddPost: action.message.status, messAddPost : action.message.message}
        case types.RESET_MESS_ADD_POST:
            return {...state, statusAddPost: null, messAddPost : ''}
        case types.REMOVE_POST:
            return { ...state, messRemovePost: action.mess , statusAddPost: null, messAddPost : ''}
        case types.RESET_MESS_REMOVE_POST:
            return {...state, messRemovePost: ''}
        default:  
            return {...state};
    }
}

export default myReducer