import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../containers/Login';
import Register from '../containers/Register'

const AppNavigator = createStackNavigator(
  {
    Login,
    Register
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);