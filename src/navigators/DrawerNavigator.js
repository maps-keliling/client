import { createDrawerNavigator, createAppContainer, DrawerItems, withNavigation, createStackNavigator } from 'react-navigation';
import MapScreen from '../containers/Map';
import ChatScreen from '../containers/ChatScreen';
import ChatList from '../containers/ChatList'
import ChatDetail from '../containers/ChatDetail'
import React from 'react'
import { View, Text, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import Home from '../containers/Home'
import SellerDetail from '../containers/SellerDetail';
import RoutetoSeller from '../containers/RouteArah/index';
import SideBar from '../components/Sidebar';
import ShopDetail from '../containers/ShopDetail';

const DrawerNavigator = createDrawerNavigator(
    {      
        Map: {
            screen: Home,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require("../assets/home.png")}
                        style={{ width: 50, height: 50, tintColor: tintColor }}
                    />
                )
            }
        },
        Chat: {
            screen: ChatList,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require("../assets/chat.png")}
                        style={{ width: 50, height: 50, tintColor: tintColor }}
                    />
                )
            }
        },
        'My Shop': {
            screen: ShopDetail,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require("../assets/street-vendor.png")}
                        style={{ width: 50, height: 50, tintColor: tintColor }}
                    />
                )
            }
        },
        // ChatScreen,
        // SellerDetail : SellerDetail,
        // RouteToSeller : RoutetoSeller,
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