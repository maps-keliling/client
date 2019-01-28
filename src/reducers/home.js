const initialState = {
    allUsers : [],
    userPosition : {
        latitude: -6.265299,
        longitude: 106.782836
    }
}

import { SET_CURRENT_POSITION_USER, READ_COORDINATE_SELLER } from '../actions_types/index';
export default (state=initialState, action) => {
    switch(action.type) {
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
                allUsers : action.value
            }
        default : 
            return {
                ...state
            }
    }
}