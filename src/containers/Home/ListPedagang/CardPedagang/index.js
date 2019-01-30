import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

class Pedagang extends Component {
    state = {
        jarak : 0
    }

    calculate = ( ) => {
        let distance = Number(this.props.distance).toFixed(2)
        if( distance >= 1000){
             satuan = 'Km'
             let km = Math.floor(distance / 1000)
             let sisa = distance % 1000
             this.setState({jarak : String(km+','+String(sisa).substring(0,2)+ ' Km')})
           }else{
             this.setState({jarak : String(distance + ' Meter')})
        }
    }
    componentDidMount(){
       this.calculate()
    }

    componentDidUpdate(prevProps){
        if (prevProps.distance !== this.props.distance){
            this.calculate()
        }
    }

    render(){
        return (
            <TouchableOpacity style={styles.container} 
                onPress={()=> this.props.navigation.navigate('SellerDetail', {
                id : this.props.id,
                coordinate : this.props.coordinate
            })} >
                <View style={styles.ImageWrapper}>
                    <Image 
                        source={this.props.profilePic ? {uri : this.props.profilePic} : require("../../../../assets/street-vendor.png")}
                        style={styles.photo}/>
                </View>
                <View style={styles.DataPedagang}>
                    <Text style={{alignItems :'center'}}>{this.props.brand}</Text>
                    <Text style={{alignItems :'center'}}>
                        {this.state.jarak}
                        {/* {this.convertJarak(this.props.distance)}
                        {/* <Image 
                            source={{uri : 'http://icons.iconarchive.com/icons/gpritiranjan/simple-christmas/512/star-icon.png'}}
                            style={styles.star}/>
                        <Image 
                            source={{uri : 'http://icons.iconarchive.com/icons/gpritiranjan/simple-christmas/512/star-icon.png'}}
                            style={styles.star}/> */} 
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 20,
        paddingVertical : 5,
        flexDirection :'row',
        width : '100%',
        height : 60,
        marginBottom : 5,
        borderWidth : 1,
        borderColor: 'lightgrey',
        borderRadius : 25
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
        width : 80,
        height : 80
    },
    DataPedagang : {
        paddingLeft : 30,
        width : '70%',
        height : '100%',
        alignItems : 'flex-start',
        justifyContent : 'center'
    }
})

export default Pedagang;