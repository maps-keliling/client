import { createDrawerNavigator, createAppContainer, DrawerItems, withNavigation } from 'react-navigation';
import MapScreen from '../containers/Map';
import ChatScreen from '../containers/ChatScreen';
import ChatList from '../containers/ChatList'
import React from 'react'
import { View, Text, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import Home from '../containers/Home'
import SellerDetail from '../containers/SellerDetail';
<<<<<<< HEAD
import SideBar from '../components/Sidebar'
const DrawerNavigator = createDrawerNavigator(
    {      
        Map : Home,
        Chats : ChatList,
        // SellerDetail : SellerDetail,
        // ChatList,
=======
import RoutetoSeller from '../containers/RouteArah/index';
const DrawerNavigator = createDrawerNavigator(
    {      
        MapScreen: Home,
        ChatScreen,
        SellerDetail : SellerDetail,
        RouteToSeller : RoutetoSeller,
        ChatList,
>>>>>>> tracking
    },
    {
        backBehavior: "none",
        contentComponent: props => (
            <SideBar {...props} />
        ),
        contentOptions: {
            activeTintColor: '#ab1919'
        }
    }
  );

const AppContainer = createAppContainer(DrawerNavigator)
export default AppContainer