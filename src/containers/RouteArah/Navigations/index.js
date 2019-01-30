import React, { Component } from 'react';
import { PermissionsAndroid,Image, BackHandler, DeviceEventEmitter, Linking } from 'react-native';
import { View , TouchableOpacity, StyleSheet,  } from 'react-native';

class Navigation extends Component{

    startNavigation = () => {
        console.log('Start Navigation calling!')
        var url = `https://www.google.com/maps/dir/?api=1&origin=${this.props.latitude},${this.props.longitude}&travelmode=${this.props.mode}&dir_action=navigate&destination=${this.props.destinationLatitude},${this.props.destinationLongitude}`;
        Linking.canOpenURL(url).then(supported => {
          if (!supported) {
              console.log('Can\'t handle url: ' + url);
          } else {
              return Linking.openURL(url);
          }
      }).catch(err => console.error('An error occurred', err)); 
    }
    
    render(){
        return (
           <TouchableOpacity style={styles.container} onPress={() => this.startNavigation()}>
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