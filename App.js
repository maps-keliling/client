import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SwitchNavigator from './src/navigators/SwitchNavigator';
<<<<<<< HEAD
import TestNavigator from './src/navigators/TestNavigator'

export default class App extends Component {
  render() {
    return (
      // <TestNavigator />
      // <StackContainer />
      <SwitchNavigator />
=======
import { Provider } from 'react-redux';
import store from './src/store/index';
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SwitchNavigator />
      </Provider>
>>>>>>> sebelum pull
    );
  }
}
