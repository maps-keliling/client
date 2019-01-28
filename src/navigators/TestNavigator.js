import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Home from '../containers/Home/index';
import ChatList from '../containers/ChatList'
import ChatRoom from '../containers/ChatRoom'
import SellerDetail from '../containers/SellerDetail'

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
    ChatRoom : {
        screen : ChatRoom
    },
    SellerDetail: {
        screen: SellerDetail
    }
}, {
    initialRouteName: 'Home'
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer