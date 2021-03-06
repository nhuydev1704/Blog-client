import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import category from './categoryReducer';
import homeBlogs from './homeBlogsReducer';
import blogByCategory from './blogByCategoryReducer';
import otherInfo from './otherInfoReducer';
import blogByUser from './blogByUserReducer';
import comments from './commentReducer';
import socket from './socketReducer';
import callback from './callBackReducer';

export default combineReducers({
    callback,
    auth,
    alert,
    category,
    homeBlogs,
    blogByCategory,
    blogByUser,
    otherInfo,
    comments,
    socket,
});
