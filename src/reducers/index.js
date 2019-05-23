import { combineReducers } from 'redux';

import products from './product'
import message from './message'; 
import posts from './post';

var myReducers = combineReducers({
    products,
    message,
    posts
});

export default myReducers;