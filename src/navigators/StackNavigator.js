import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../containers/Login';
import SellerRegister from '../containers/SellerRegister';
import BuyerRegister from '../containers/BuyerRegister';

const StackNavigator = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        SellerRegister: {
            screen: SellerRegister
        },
        BuyerRegister: {
            screen: BuyerRegister
        },
    }, 
    {
        initialRouteName: 'Login'
    }
);

const AppContainer = createAppContainer(StackNavigator)
export default AppContainer