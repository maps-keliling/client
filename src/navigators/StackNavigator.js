import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../containers/Login';
import MapScreen from '../containers/Map';
import ChatScreen from '../containers/ChatScreen'
import React from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Home from '../containers/Home/index';
// const StackNavigator = createStackNavigator(
//     {
//         Login: {
//             screen: Login
//         },
//         SellerRegister: {
//             screen: SellerRegister
//         },
//         BuyerRegister: {
//             screen: BuyerRegister
//         },
//     }, 
//     {
//         initialRouteName: 'Login'
//     }
// );

const DashboardStackNavigator = createStackNavigator(
    {
        DashboardTabNavigator: Home,
        MapScreen : Home,
        ChatScreen,
    //   SellerHome: SellerHome,
    //   BuyerHome: BuyerHome,
    },
    {
    //   defaultNavigationOptions: ({ navigation }) => {
    //     return {
    //       headerLeft: (
    //         <Button title="Dashboard" onPress={() => navigation.openDrawer()} />
    //         // <Icon
    //         //   style={{ paddingLeft: 10 }}
    //         //   onPress={() => navigation.openDrawer()}
    //         //   name="md-menu"
    //         //   size={30}
    //         // />
    //       )
    //     };
    //   }
    }
  );

const AppContainer = createAppContainer(DashboardStackNavigator)
export default AppContainer