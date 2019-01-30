import { createDrawerNavigator, createAppContainer, DrawerItems, withNavigation, createStackNavigator } from 'react-navigation';
import MapScreen from '../containers/Map';
import ChatScreen from '../containers/ChatScreen';
import ChatList from '../containers/ChatList'
import ChatDetail from '../containers/ChatDetail'
import React from 'react'
import { View, Text, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import Home from '../containers/Home/index';
import SellerDetail from '../containers/SellerDetail';
import RouteToSeller from '../containers/RouteArah/index';
import ShopDetail from '../containers/ShopDetail';
import SideBar from '../components/Sidebar';

const AppStackNavigator = createStackNavigator({
    MapScreen: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            header: null,
        },
    },
    SellerDetail: {
        screen: SellerDetail,
        navigationOptions: {
            title: 'Info Penjual',
        },
    },
    ChatDetail: {
        screen: ChatDetail,
        navigationOptions: {
            title: 'Chat',
        },
    },
    RouteToSeller: {
        screen: RouteToSeller,
        navigationOptions: {
            header: null,
        }
    }
});

const ChatStackNavigator = createStackNavigator({
    ChatList: {
        screen: ChatList,
        navigationOptions: {
            title: 'Home',
            header: null,
        },
    },
    ChatDetail: {
        screen: ChatDetail,
        navigationOptions: {
            title: 'Chat',
        },
    },
});

const DrawerNavigator = createDrawerNavigator(
    {      
        Map: {
            screen: AppStackNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require("../assets/location.png")}
                        style={{ width: 50, height: 50, tintColor: tintColor }}
                    />
                )
            }
        },
        Chat: {
            screen: ChatStackNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require("../assets/chat.png")}
                        style={{ width: 50, height: 50, tintColor: tintColor }}
                    />
                )
            }
        },
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