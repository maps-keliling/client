import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapsView from './Maps/index';
import ListPedagang from './ListPedagang/index';
class Home extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.maps}>
                    <MapsView/>
                </View>
                <View style={styles.listPedagang}>
                   <ListPedagang/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container : {
        height : '100%',
        width : '100%'    
    },
    maps : {
        flex : 1,
        backgroundColor : 'blue'
    },
    listPedagang : {
        height : 200,
        width : '100%'
    },
    headerButton : {

    }
})
export default Home;