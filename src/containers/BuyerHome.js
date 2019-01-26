import React, { Component } from 'react'
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native'

class BuyerHome extends Component {
    logout = async () => {
        await AsyncStorage.removeItem('token')
        this.props.navigation.navigate('Auth')
    }

    componentDidMount() {
        this.checkLogin()
    }

    checkLogin = async () => {
        let token = await AsyncStorage.getItem('token')
        let role = await AsyncStorage.getItem('role')
        console.log(token, role);
    }

    render() {
        return (
            <View>
                <Text>hello. ini buyer home</Text>
                <Button title='Log Out' onPress={this.logout} />
            </View>
        )
    }
}

export default BuyerHome