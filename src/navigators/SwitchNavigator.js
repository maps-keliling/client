import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import Login from '../containers/Login'
import AuthLoadingScreen from '../components/Loading';
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
