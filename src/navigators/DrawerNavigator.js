import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import Login from '../containers/Login';
import SellerRegister from '../containers/SellerRegister';
import BuyerRegister from '../containers/BuyerRegister';
import SellerHome from '../containers/SellerHome';
import BuyerHome from '../containers/BuyerHome';

const DrawerNavigator = createDrawerNavigator(
    {
        SellerRegister: SellerRegister,
        BuyerRegister: BuyerRegister,        
        SellerHome: SellerHome,
        BuyerHome: BuyerHome,
    }, 
    {
        initialRouteName: 'BuyerHome'
    }
);

const AppContainer = createAppContainer(DrawerNavigator)
export default AppContainer