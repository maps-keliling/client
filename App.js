import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SwitchNavigator from './src/navigators/SwitchNavigator';
import TestNavigator from './src/navigators/TestNavigator'

export default class App extends Component {
  render() {
    return (
      // <TestNavigator />
      // <StackContainer />
      <SwitchNavigator />
    );
  }
}
