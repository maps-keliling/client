import React,  { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native';

class Transportation extends Component {
    state = {
     man : React.createRef(),
     mobil : React.createRef(),
     sepeda : React.createRef()
    }

    handleChange = (name) => {
        let button = ['man', 'mobil', 'sepeda']
        button.forEach(button => {
            if(button !== name){
                this[button].setNativeProps({...styles.box})
            }else{
                this.props.changeTransport(name)
                this[name].setNativeProps({...styles.active})
            }
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.active} onPress={()=>this.handleChange('mobil')} ref={mobil => {this.mobil = mobil}}>
                   <Image style={styles.image} source={require('../../../assets/mobil.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>this.handleChange('man')} ref={man => {this.man = man}}>
                    <Image style={styles.image} source={require('../../../assets/man.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={()=>this.handleChange('sepeda')} ref={sepeda => {this.sepeda = sepeda}}>
                   <Image style={styles.image} source={require('../../../assets/sepeda.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        position : 'absolute',
        height : 50,
        top : 20,
        flexDirection : 'row',
        justifyContent : 'space-around',
        padding : 10,
        width : '80%',
        alignItems : 'center'
    },
    active : {
        padding : 5,
        borderWidth :1,
        borderColor : 'lightgray',
        borderRadius : 50,
        backgroundColor : 'green'
    },
    box : {
        padding : 5,
        borderWidth :1,
        borderColor : 'lightgray',
        borderRadius : 50,
        backgroundColor : 'white'
    },
    image : {
        width : 40, 
        height : 40
    }
})

export default Transportation;
