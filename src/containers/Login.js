import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  clicked = () => {
    // alert('clicked nih');
    console.log('clicked')
    this.props.navigation.push('Register')
  }

  render() {
    return (
      <View>
        <Text> Login Page </Text>
        <Button title='Login' onPress={this.clicked} />
      </View>
    );
  }
}
