import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from './src/containers/Login'
import Register from './src/containers/Register'
import Home from './src/containers/Home/index';
import ChatList from './src/containers/ChatList'
import ChatRoom from './src/containers/ChatRoom'
import SellerDetail from './src/containers/SellerDetail'
import ShopDetail from './src/containers/ShopDetail'
import AddItem from './src/containers/AddItem'
import Route from './src/containers/RouteArah/index';

const AppNavigator = createBottomTabNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Home : {
        screen : Home
    },
    ChatList : {
        screen : ChatList
    },
    // ChatRoom : {
    //     screen : ChatRoom
    // },
    SellerDetail: {
        screen: SellerDetail
    },
    ShopDetail: {
        screen: ShopDetail
    }
}, {
    initialRouteName: 'ShopDetail'
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer