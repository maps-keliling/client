import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

class Pedagang extends Component {
    render(){
        return (
            <TouchableOpacity style={styles.container} >
                <View style={styles.ImageWrapper}>
                    <Image 
                        source={{uri : 'http://simpleicon.com/wp-content/uploads/camera.png'}}
                        style={styles.photo}/>
                </View>
                <View style={styles.DataPedagang}>
                    <Text style={{alignItems :'center'}}>Gerobak Ipul</Text>
                    <Text style={{alignItems :'center'}}>
                        <Image 
                            source={{uri : 'http://icons.iconarchive.com/icons/gpritiranjan/simple-christmas/512/star-icon.png'}}
                            style={styles.star}/>
                        <Image 
                            source={{uri : 'http://icons.iconarchive.com/icons/gpritiranjan/simple-christmas/512/star-icon.png'}}
                            style={styles.star}/>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        padding : 15,
        flexDirection :'row',
        width : '100%',
        height : 60,
        marginBottom : 5,
        borderWidth : 1,
        borderRadius : 10 
    },
    ImageWrapper : {
        width : 50,
        height : '100%',
        alignItems : 'center'
    },
    star : {
        width : 15,
        height : 15
    },
    photo : {
        flex : 1,
        width : 40,
        height : 40
    },
    DataPedagang : {
        paddingLeft : 30,
        width : '70%',
        height : '100%',
        alignItems : 'flex-start',
        justifyContent : 'flex-start'
    }
})

export default Pedagang;'30%'