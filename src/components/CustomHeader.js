import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  clicked = () => {
    // alert('touchable clicked');
    this.props.navigation.push('Register')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.clicked}>
          <Text> Daftar </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 30,
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
});

export default withNavigation(CustomHeader);