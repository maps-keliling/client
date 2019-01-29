import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer, DrawerItems, withNavigation } from 'react-navigation';
import { ScrollView, Image, Text, View, StyleSheet, Button, TouchableHighlight, AsyncStorage } from 'react-native';
// import { Button } from 'react-native-elements';
// import styles from './Sidebar.style';
import PropTypes from 'prop-types';

class DrawerContent extends Component {
  state = {
    name: 'Guest',
    role: 'User01',
    profilePic: '',
    username: 'User01'
  }
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token', token);
    const role = await AsyncStorage.getItem('role', role);
    const name = await AsyncStorage.getItem('name', name);
    const profilePic = await AsyncStorage.getItem('profilePic', profilePic);
    const username = await AsyncStorage.getItem('username', username);

    this.setState({
      name: name || this.state.name,
      role: role || this.state.role,
      profilePic: profilePic || this.state.profilePic,
      username: username || this.state.username
    })
  }

  render () {
    return (
      <View style={{flex: 1}}>
          <View style={{alignItems: 'center', padding: 10, borderBottomColor: 'grey', borderBottomWidth: 2}}>
              <Image
                  style={{width: 128, height:128, borderRadius: 100}}
                  source={this.state.profilePic ? {uri: this.state.profilePic} : require("../assets/girl.png")}
              />
              <Text style={{fontWeight: 'bold', fontSize: 18, marginTop: 10}}>{this.state.name}</Text>
          </View>
          <View style={{flex: 1}}>
              <DrawerItems {...this.props} />
          </View>
          <View style={{justifyContent: 'flex-end', backgroundColor: 'red', alignItems: 'center', padding: 10}}>
              <TouchableHighlight onPress={ async() => (await AsyncStorage.clear(), this.props.navigation.navigate('Auth'))}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Log Out!</Text>
              </TouchableHighlight>
          </View>
      </View>
    );
  }
}

DrawerContent.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flex: 1,
  },
  separatorTop: {
    marginBottom: 30,
    height: 125,
  },
  sectionHeadingStyle: {
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  button: {
    backgroundColor: '#FF9F1C',
}
});

export default DrawerContent;