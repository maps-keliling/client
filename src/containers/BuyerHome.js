import React, { Component } from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'

class BuyerHome extends Component {
    componentDidMount() {
        this.checkLogin()
    }

    state = {
        currentUser: ""
    }

    checkLogin = async () => {
        const currentUser = await AsyncStorage.getItem('user')
        this.setState({
            currentUser: currentUser
        })
    }

    render() {
        return (
            <View>
                <Text>hello. ini buyer home</Text>
                <Text>Hello {this.state.currentUser}</Text>
            </View>
        )
    }
}

export default BuyerHome