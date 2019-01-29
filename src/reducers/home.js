const initialState = {
    allUsers : [],
    keyword : '',
    userPosition : {
        latitude: -6.265299,
        longitude: 106.782836
    },
    loading : false
}

import { SET_CURRENT_POSITION_USER,
         READ_COORDINATE_SELLER,
         SEARCH,
         LOADING_READ_USER } from '../actions_types/index';
export default (state=initialState, action) => {
    switch(action.type) {
        case LOADING_READ_USER :
            return {
                ...state,
                loading : true
            }
        case SET_CURRENT_POSITION_USER : 
            return {
                ...state,
                userPosition : {
                    ...action.value
                }
            }
        case READ_COORDINATE_SELLER : 
            return {
                ...state,
                allUsers : action.value,
                loading :false
            }
        case SEARCH : 
            return {
                ...state,
                keyword : action.value
            }
        default : 
            return {
                ...state
            }
    }
}