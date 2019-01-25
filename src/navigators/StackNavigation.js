import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
//CONTAINERS
import Login from '../containers/Login'
import Register from '../containers/Register'

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    }, 
    Register
 }, {
   initialRouteName: 'Login'
 }
);

// const AppContainer = createAppContainer(AppNavigator);

// export default class Navigation extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }

export default createAppContainer(AppNavigator);