import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from '../containers/Login'
import BuyerRegister from '../containers/BuyerRegister'
import SellerRegister from '../containers/SellerRegister'
import BuyerHome from '../containers/BuyerHome'

const AppNavigator = createBottomTabNavigator({
    Login: {
        screen: Login
    },
    SellerRegister: {
        screen: SellerRegister
    },
    BuyerRegister: {
        screen: BuyerRegister
    },
    BuyerHome: {
        screen: BuyerHome
    }
}, {
    initialRouteName: 'Login'
})

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer