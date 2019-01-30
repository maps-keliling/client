import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer, DrawerItems, withNavigation } from 'react-navigation';
import { ScrollView,
         Image,
        Text,
        View,
        StyleSheet,
        Button,
        TouchableHighlight,
        AsyncStorage, 
        TouchableOpacity,
        ActivityIndicator } from 'react-native';
// import { Button } from 'react-native-elements';
// import styles from './Sidebar.style';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class DrawerContent extends Component {
  state = {
    name: 'User01',
    role: 'User01',
    profilePic: '',
    username: 'User01',
    loading : false
  }

  pickImage = async () => {
    let  token  = await AsyncStorage.getItem('token')
    ImagePicker.showImagePicker(options, (response) => {
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          loading : true
        })

        let formData = new FormData()
        formData.append('file',{ uri: response.uri, name : response.fileName, type : response.type})
        axios.post('http://35.243.157.0/users/addPhoto',formData, {
          headers : {
            "Content-Type": "multipart/form-data",
            auth : token
          }
        })
        .then( async ({ data }) => {
          await AsyncStorage.setItem('profilePic', data.data.profilePic);
          this.setState({
            profilePic: data.data.profilePic,
            loading : false
          });
        })
        .catch( error => {
          console.log( error.response )
        })
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
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
          <View style={{ justifyContent: 'space-between', height: 200, alignItems: 'center', padding: 10, borderBottomColor: 'lightgrey', borderBottomWidth: 2}}>
            <TouchableOpacity onPress={this.pickImage}>
              {
                this.state.loading ? 
                <ActivityIndicator size="large" style={{width: 128, height:128}}/> :
                <Image
                    style={{width: 128, height:128, borderRadius: 100}}
                    source={this.state.profilePic ? {uri: this.state.profilePic} : require("../assets/girl.png")}
                />
              }
              <Text style={{fontWeight: 'bold', fontSize: 18, marginTop: 10}}>{this.state.name.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
              <DrawerItems {...this.props} />
          </View>
          <View style={{justifyContent: 'flex-end', backgroundColor: '#ab1919', alignItems: 'center', padding: 10}}>
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