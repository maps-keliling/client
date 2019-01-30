import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'
import { GiftedChat } from 'react-native-gifted-chat'
let firebaseVar
export default class ChatDetail extends Component {

  state = {
    myChat: [],
    seller: {},
    buyer: {},
    messages: [],
    myId: '',
    myName: '',
    myProfilePic: ''
  }

  componentWillUnmount = () => {
    firebaseVar.off()
  }

  componentDidMount = async () => {
    const { navigation } = this.props
    const chatkey = navigation.getParam('chatKey', '')
    const myId = await AsyncStorage.getItem('_id')
    const myName = await AsyncStorage.getItem('name')
    const myProfilePic  = await AsyncStorage.getItem('profilePic')

    // console.log(chatkey)
    firebaseVar = firebase.database().ref('message').child(chatkey)
    firebaseVar.on('value', (snapshot) => {
      // console.log(snapshot.val(), 'ini dari chat detail')
      const ArrayOfChat = Object.entries(snapshot.val().allChat).map(item => {
        const myItem = {
          _id: item[0],
          text: item[1].message,
          createdAt: new Date(item[1].createdAt),
          user: {
            _id: item[1].idUser,
            name: item[1].name,
            avatar: item[1].avatar
          }
        }
        // console.log(myItem)
        // return {...item[1], key: item[0]}
        return myItem
      });
      const { seller, buyer } = snapshot.val()
      const filterChat = ArrayOfChat.filter(each => each.text)
      const sortedChat = filterChat.sort(function(a, b) {
        // return a.createdAt > b.createdAt;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      // console.log(sortedChat, 'ini kena sort')

      this.setState({
        seller,
        buyer,
        myId: myId,
        myName: myName,
        // myChat: ArrayOfChat.filter(each => each.text),
        myChat: sortedChat,
        myProfilePic: myProfilePic
      })
      // console.log(ArrayOfChat.filter(each => each.text), 'chat kena filter')
    })

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 'idoranglain',
    //         name: 'React Native',
    //         // avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //     {
    //       _id: 2,
    //       text: 'chat rangga',
    //       createdAt: new Date(),
    //       user: {
    //         _id: '1234abc',
    //         name: 'rangga',
    //         // avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ],
    // })
  }

  onSend = (messages = []) => {
    // const myId = '1234abc'
    // const myName = 'Rangga'
    const { myId, myName, myProfilePic } = this.state
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
      createdAt: Date.now(),
      avatar: myProfilePic
    })
  }


  render() {
    const { navigation } = this.props
    const chatkey = navigation.getParam('chatKey', '')
    // const myId = '1234abc'
    const { myChat, messages, myId } = this.state
    console.log(myId, 'ini id dari chat')
    return (
      <GiftedChat
        messages={myChat}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: myId,
        }}
      />
    )
  }
}
