import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Home from '../containers/Home/index';
import ChatList from '../containers/ChatList'
import ChatRoom from '../containers/ChatRoom'
import SellerDetail from '../containers/SellerDetail'
import ShopDetail from '../containers/ShopDetail'
import AddItem from '../containers/AddItem'
import Route from '../containers/RouteArah/index';
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
    }, 
    AddItem: {
        screen: AddItem
    }
}, {
    initialRouteName: 'AddItem'
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer