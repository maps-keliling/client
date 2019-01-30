import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> This is map page </Text>
        <Button title="Dashboard" onPress={() => this.props.navigation.openDrawer()} />
      </View>
    );
  }
}
