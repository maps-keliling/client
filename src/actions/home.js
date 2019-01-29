import { SET_CURRENT_POSITION_USER, READ_COORDINATE_SELLER } from '../actions_types/index';
import firebase from 'react-native-firebase';

export const setCurrentPositionUser = (payload ) => {
    return dispatch => {
        dispatch({
            type : SET_CURRENT_POSITION_USER,
            value : payload
        })
    }
}

export const ReadData = () => {
    return dispatch => {
        firebase.database().ref('/seller').on('value', snapshot => {
            const ArrayOfdata = Object.entries(snapshot.val()).map(item => ({...item[1], id: item[0]}));
          dispatch({
              type : READ_COORDINATE_SELLER,
              value : ArrayOfdata  
          })
        })
    }
}
