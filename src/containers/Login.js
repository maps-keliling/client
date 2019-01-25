import React, { Component } from 'react';
import { View, Text, Button, TextInput, AsyncStorage } from 'react-native';

export default class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  }

  userLogin = async () => {
    alert('login')
    await AsyncStorage.setItem('username', this.state.username);
    await AsyncStorage.setItem('token', this.state.password);
    this.props.navigation.navigate('App');
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    // this.props.navigation.push('Register')
  }

  render() {
    return (
      <View>
        <Text> Login Page </Text>
        <TextInput
          placeholder='Input Username'
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
        />
        <TextInput
          placeholder='Input Password'
          // keyboardType='visible-password'
          secureTextEntry
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
        />
        <Button title='Login' onPress={this.userLogin} />
      </View>
    );
  }
}
