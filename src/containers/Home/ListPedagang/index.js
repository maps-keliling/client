import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CardPedagang from './CardPedagang';

class ListPedagang extends Component {
    render(){
        return (
            <View style={styles.container}>
                 <CardPedagang/>
                 <CardPedagang/>
                 <CardPedagang/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        paddingLeft : 20,
        paddingRight : 20,
        paddingTop : 5,
        paddingBottom : 5,
        // backgroundColor : '#e1391bl'  
    }
})

export default ListPedagang;