import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// import AppNavigator from './src/navigators/AppNavigator'
// import SwitchNavigator from './src/navigators/SwitchNavigator'
// import StackContainer from './src/navigators/StackNavigator'
// import AppContainer from './src/navigators/AppNavigator'
import SwitchContainer from './src/navigators/SwitchNavigator';

export default class App extends Component {
  render() {
    return (
      <AppContainer />
      // <StackContainer />
      // <SwitchContainer />
    );
  }
}

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: BuyerHome,
    SellerHome: SellerHome,
    BuyerHome: BuyerHome,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button title="Dashboard" onPress={() => navigation.openDrawer()} />
          // <Icon
          //   style={{ paddingLeft: 10 }}
          //   onPress={() => navigation.openDrawer()}
          //   name="md-menu"
          //   size={30}
          // />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {      
      Dashboard: {
        screen: DashboardStackNavigator
      },
      SellerHome,
      BuyerHome,
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  // App: AppStack,
  Auth: Login,
  App: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});