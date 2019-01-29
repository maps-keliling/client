import { createDrawerNavigator, createAppContainer, DrawerItems, withNavigation, createStackNavigator } from 'react-navigation';
import MapScreen from '../containers/Map';
import ChatScreen from '../containers/ChatScreen';
import ChatList from '../containers/ChatList'
import ChatDetail from '../containers/ChatDetail'
import React from 'react'
import { View, Text, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import Home from '../containers/Home'
import SellerDetail from '../containers/SellerDetail';
import SideBar from '../components/Sidebar'
const DrawerNavigator = createDrawerNavigator(
    {      
        MapScreen: Home,
        SellerDetail,
        ChatDetail,
        ChatScreen : createStackNavigator({
            ChatScreen: ChatScreen,
            ChatDetail: ChatDetail
        }, {
            initialRouteName: 'ChatScreen'
        }),
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