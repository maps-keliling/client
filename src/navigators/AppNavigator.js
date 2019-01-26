import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from '../containers/Login'
import Register from '../containers/Register'
import BuyerHome from '../containers/BuyerHome'
import SellerHome from '../containers/SellerHome'
import SellerDetail from '../containers/SellerDetail'

const AppNavigator = createBottomTabNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    BuyerHome: {
        screen: BuyerHome
    },
    SellerHome: {
        screen: SellerHome
    }, 
    SellerDetail: {
        screen: SellerDetail
    }
}, {
    initialRouteName: 'SellerDetail'
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer