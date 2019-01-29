import React, { Component } from 'react';
import { View , Image, TouchableOpacity, StyleSheet } from 'react-native';

class Navigation extends Component{
    render(){
        return (
           <TouchableOpacity style={styles.container}>
                <Image 
                    source={require('../../../assets/navigation.png')}
                    style={{width : 75, height: 75}}/>
           </TouchableOpacity>  
        )
    }
}

const styles = StyleSheet.create({
    container : {
        position : 'absolute',
        width : 75,
        height : 75,
        borderWidth : 1,
        borderRadius : 50,
        bottom : 75,
        right :75
    }
})

export default Navigation;