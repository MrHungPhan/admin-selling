import callApi from '../utils/callApi';
import * as types from '../const/index'

export const getProducts = () => {
    return async dispatch => {
        const res = await callApi('products', 'GET');
        console.log(res);
        dispatch({
            type : types.GET_PRODUCTS,
            products : res.data
        })
    }
}

export const uploadImage = (files, typeE) => {
    return async dispatch => {
        const res = await callApi('products/uploadImage', 'POST', files);
        console.log(res);
         dispatch({
            type : types.UPLOAD_IMAGE,
            images : res.data,
            typeE : typeE
        })
    }
}

export const getCatalog = () => {
    return async dispatch => {
        const res = await callApi('catalog', 'GET');
        console.log(res)
  
        dispatch({
            type: types.GET_CATALOG,
            catalog : res.data.catalog
        })
    }
}

export const getStyle = () => {
    return async dispatch=>{
        const res = await callApi('products/style', 'GET');
        if(res.status === 200){
            dispatch({
                type : types.GET_STYLE,
                style : res.data
            })
        }
    }
}

export const addProduct = (data) => {
    return async dispatch => {
        const res = await callApi('products/add', 'POST', data);
        console.log(res);
        dispatch({
            type : types.ADD_PRODUCT,
            mess : res.data
        })
    }
}

export const resetMessAdd = () => {
    return {
        type : types.RESET_MESS_ADD,
    }
}

export const removeProduct = (id) => {
    return async dispatch => {
        const res = await callApi(`products/remove/${id}`, 'DELETE');
        console.log(res);
        dispatch({
            type : types.REMOVE_PRODUCT,
            mess : res.data.message,
            products : res.data.products
        })
    } 
}

export const resetMessRemove = () => {
    return ({
        type : types.RESET_MESS_REMOVE
    })
}

export const resetAllAdd = () => {
    return({
        type : types.RESET_ALL_ADD
    })
}

////////////////////// ACTION POST /////////////////////////////
export const getPosts = () => {
    return async dispatch => {
        const res = await callApi('post', 'GET');
        console.log(res);
        if(res.status === 200)
            dispatch({
                type : types.GET_POST,
                posts : res.data
            })
    }
}
 export const addPost = (data) => {
     return async dispatch => {
         const res = await callApi('post/add', 'POST', data);
         if(res.status === 200){
             dispatch({
                 type: types.ADD_POST,
                 message : res.data
             })
         }
     }
 }

 export const resetMessAddPost = () => {
     return{
         type : types.RESET_MESS_ADD_POST
     }
 }

 export const uploadImagePost = (files) => {
    return async dispatch => {
        const res = await callApi('products/uploadImage', 'POST', files);
        console.log(res);
         dispatch({
            type : types.UPLOAD_IMAGE_POST,
            images : res.data,
        })
    }
 }

 export const removePost = (id) => {
     return async dispatch => {
         const res = await callApi(`post/remove/${id}`, 'DELETE');
         console.log('res - ', res);
         if(res.status === 200)
            dispatch({
                type: types.REMOVE_POST,
                posts : res.data.posts,
                mess : res.data.message
            })
     }
 }

 export const resetMessRemovePost = () => {
     return ({
         type : types.RESET_MESS_REMOVE_POST
     })
 }