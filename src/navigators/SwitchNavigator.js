import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Login from '../containers/Login';
import AuthLoadingScreen from '../components/Loading';
import Register from '../containers/Register';

import AppDrawerNavigator from './DrawerNavigator';
import SellerDrawerNavigator from './SellerDrawerNavigator';

const AppSwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: Login,
    Register: Register,
    App: { screen: AppDrawerNavigator },
    AppSeller: { screen: SellerDrawerNavigator} ,
});

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;
