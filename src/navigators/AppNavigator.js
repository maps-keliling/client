import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from '../containers/Login'
import BuyerRegister from '../containers/BuyerRegister'
import SellerRegister from '../containers/SellerRegister'
import Home from '../containers/Home/index';
const AppNavigator = createBottomTabNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    BuyerRegister: {
        screen: BuyerRegister
    },
    Home : {
        screen : Home
    }
}, {
    initialRouteName: 'Login'
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer