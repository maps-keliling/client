import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from '../containers/Login'
import SellerRegister from '../containers/SellerRegister'

const StackNavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    SellerRegister: {
        screen: SellerRegister
    }
}, {
    initialRouteName: 'Login'
})

const AppContainer = createAppContainer(StackNavigator)
export default AppContainer