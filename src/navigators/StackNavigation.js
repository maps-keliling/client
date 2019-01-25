import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
//CONTAINERS
import Login from '../containers/Login';
import Register from '../containers/Register';
import HomeHeader from '../components/CustomHeader';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: ( /* Your custom header */
          <HomeHeader />
        )
      }
    }, 
    Register
 }, {
   initialRouteName: 'Login'
 }
);

export default createAppContainer(AppNavigator);