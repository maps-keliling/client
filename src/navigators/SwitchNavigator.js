import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import Login from '../containers/Login'
import AuthLoadingScreen from '../components/Loading';
import BuyerRegister from '../containers/BuyerRegister';
import SellerRegister from '../containers/SellerRegister';
import Register from '../containers/Register';

import AppDrawerNavigator from './DrawerNavigator'

const AppSwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    // App: AppStack,
    Auth: Login,
    Register: Register,

    App: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;
