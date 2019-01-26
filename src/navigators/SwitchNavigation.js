import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../containers/HomeScreen';
import AuthLoadingScreen from '../containers/AuthLoading';
import BuyerHome from '../containers/BuyerHome';
import SellerHome from '../containers/SellerHome';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator(
  { 
    BuyerHome,
    SellerHome 
  }
);
import AuthStack from './StackNavigation';

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));