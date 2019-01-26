import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import Login from '../containers/Login'
import AuthLoadingScreen from '../containers/Loading'
import BuyerHome from '../containers/BuyerHome'
import SellerHome from '../containers/SellerHome'
import AuthLoadingScreen from '../components/Loading';
import BuyerRegister from '../containers/BuyerRegister';
import SellerRegister from '../containers/SellerRegister';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

// const AuthStack = createStackNavigator(
//   {
//       Login: {
//           screen: Login
//       },
//       SellerRegister: {
//           screen: SellerRegister
//       },
//       BuyerRegister: {
//           screen: BuyerRegister
//       }
//   }, 
//   {
//       initialRouteName: 'Login'
//   }
// );


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
    Auth: Login,
    SellerRegister,
    BuyerRegister,    

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
