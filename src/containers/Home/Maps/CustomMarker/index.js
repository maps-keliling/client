import React, { Component } from 'react';
import {View , Text, Image, StyleSheet} from 'react-native';
import { Callout} from 'react-native-maps';
class MarkerCustom extends Component{
    state = {
        show : false
    }
    render(){
        return (
            <View style={styles.container}>
                 <Text style={styles.title}>{this.props.brand}</Text>
                 <Image source={require('../../../../assets/street-vendor.png')} 
                                style={{ width : 75, height: 75, zIndex:200}}/>
                <Callout>
                    <Text style={styles.title}>{this.props.brand}</Text>
                </Callout>
            </View>
        )
    }
}  

const styles = StyleSheet.create({
    container : {   
        width : 100,
        height : 100
    },
    title : {
        fontWeight : 'bold'
    }
})
export default MarkerCustom