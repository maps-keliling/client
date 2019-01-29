import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import { GiftedChat } from 'react-native-gifted-chat'

export default class ChatDetail extends Component {

  state = {
    myChat: [],
    seller: {},
    buyer: {},
    messages: [],
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const chatkey = navigation.getParam('chatKey', '')
    firebase.database().ref('message').child(chatkey).on('value', (snapshot) => {
      // console.log(snapshot.val(), 'ini dari chat detail')
      const ArrayOfChat = Object.entries(snapshot.val().allChat).map(item => {
        const myItem = {
          _id: item[0],
          text: item[1].message,
          user: {
            _id: item[1].idUser,
            name: item[1].name
          }
        }
        console.log(myItem)
        // return {...item[1], key: item[0]}
        return myItem
      });
      // console.log(ArrayOfChat)
      const { seller, buyer } = snapshot.val()

      // const data = {
      //   seller,
      //   buyer,
      //   allChat: ArrayOfChat
      // }
      // console.log(ArrayOfChat)
      this.setState({
        seller,
        buyer,
        myChat: ArrayOfChat
      })
    })

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 'idoranglain',
            name: 'React Native',
            // avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'chat rangga',
          createdAt: new Date(),
          user: {
            _id: '1234abc',
            name: 'rangga',
            // avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    const myId = '1234abc'
    const myName = 'Rangga'
    const { navigation } = this.props
    const chatkey = navigation.getParam('chatKey', '')
    // console.log({...messages, })
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
    // console.log(messages)
    // const data = {
    //   idUser: myId,
    //   message: messages,
    //   name: myName
    // }
    firebase.database().ref('message').child(chatkey+ '/allChat').push().set({
      idUser: myId,
      message: messages[0].text,
      name: myName,
      createdAt: Date.now()
    })
  }


  render() {
    const { navigation } = this.props
    const chatkey = navigation.getParam('chatKey', '')
    const myId = '1234abc'
    const { myChat, messages } = this.state
    // console.log(messages)
    return (
      <GiftedChat
        messages={this.state.myChat}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: myId,
        }}
      />
    )
  }
}
