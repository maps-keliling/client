import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import Login from '../containers/Login';
import SellerRegister from '../containers/SellerRegister';
import BuyerRegister from '../containers/BuyerRegister';
import SellerHome from '../containers/SellerHome';
import BuyerHome from '../containers/BuyerHome';
import DashboardStackNavigator from './StackNavigator';
import MapScreen from '../containers/Map';
import ChatScreen from '../containers/ChatScreen';
import React from 'react'

// const DrawerNavigator = createDrawerNavigator(
//     {
//         SellerRegister: SellerRegister,
//         BuyerRegister: BuyerRegister,        
//         SellerHome: SellerHome,
//         BuyerHome: BuyerHome,
//     }, 
//     {
//         initialRouteName: 'BuyerHome'
//     }
// );   
const DrawerNavigator = createDrawerNavigator(
    {      
        // Dashboard: {
        //   screen: DashboardStackNavigator
        // },
        MapScreen,
        ChatScreen,
        // SellerHome,
        // BuyerHome
    },
    {
        backBehavior: "none"
    }
  );

const AppContainer = createAppContainer(DrawerNavigator)
export default AppContainer