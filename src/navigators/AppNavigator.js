import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from '../containers/Login'
import BuyerRegister from '../containers/BuyerRegister'
import SellerRegister from '../containers/SellerRegister'

const AppNavigator = createBottomTabNavigator({
    Login: {
        screen: Login
    },
    SellerRegister: {
        screen: SellerRegister
    },
    BuyerRegister: {
        screen: BuyerRegister
    }
}, {
    initialRouteName: 'SellerRegister'
})

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer