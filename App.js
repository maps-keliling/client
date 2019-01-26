import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SwitchContainer from './src/navigators/SwitchNavigator';

export default class App extends Component {
  render() {
    return (
      // <AppContainer />
      // <StackContainer />
      <SwitchNavigator />
    );
  }
}

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