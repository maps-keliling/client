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

// import AppStack from './AppNavigator';
// import DrawerNativeBase from './DrawerNativeBase'

import AppDrawerNavigator from './DrawerNavigator'

const AppSwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    // App: AppStack,
    Auth: AuthStack,
    App: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;

// export default createAppContainer(createSwitchNavigator(
//   {
//     AuthLoading: AuthLoadingScreen,
//     App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'Auth',
//   }
// ));
