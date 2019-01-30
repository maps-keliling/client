import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase'

export default class ChatScreem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatAku: []
    };
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount = () => {
    const myId = '1234abc'
    // console.log('testing 123')

    
    firebase.database().ref('chat').child(myId).on('value', (snapshot) => {
      // console.log(snapshot.val()[0])
      const myChat = snapshot.val()
      const stateChat = []
      // for (let i = 0; i < myChat.length; i++) {
        // console.log(myChat[i], 'ini dari firebase array')
      firebase.database().ref('message').on('value', (snapshot) => {
        const ArrayOfChat = Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}));
        // console.log(snapshot.val(), '=-=-=-=-=-=-')
        // console.log(ArrayOfChat)
        // console.log(myChat)
        
        const chatFiltered = ArrayOfChat.filter(eachChat => {
          let found = false;
          for (let i = 0; i < myChat.length; i++) {
            if (eachChat.key === myChat[i]) {
              return eachChat
            }
          }
        })
        // console.log(chatFiltered)
        this.setState({
          chatAku: chatFiltered
        })

      })

    })
  }

  render() {
    const { chatAku } = this.state
    const { navigation } = this.props
    return (
      <View>
        {chatAku.map(each => (
          <TouchableOpacity key={each.key} 
          onPress={() => navigation.navigate('ChatDetail', {
            chatKey: each.key,
            sellerName: each.seller.name
          })}
          >
            <View style={{backgroundColor: 'red', marginVertical: 3, height: 50}}>
              <Text>
                {each.seller.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        
        <Button title="Dashboard" onPress={() => this.props.navigation.openDrawer()} />
      </View>
    );
  }
}
