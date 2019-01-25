import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import Login from '../containers/Login'
import AuthLoadingScreen from '../containers/Loading'
import BuyerHome from '../containers/BuyerHome'
import SellerHome from '../containers/SellerHome'


const DrawerNavigator = createDrawerNavigator({
    BuyerHome,
    SellerHome
})

const DrawerContainer = createAppContainer(DrawerNavigator)

const SwitchStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: DrawerContainer,
        Auth: Login,
    },
    {
        initialRouteName: 'Auth'
    }
)

export default createAppContainer(SwitchStack);
