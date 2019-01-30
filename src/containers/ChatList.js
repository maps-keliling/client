import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, AsyncStorage, ActivityIndicator } from 'react-native'
import BurgerMenu from '../components/burgerMenu'
import firebase from 'react-native-firebase'

class ChatList extends Component {
    state = {
        myChat: [],
        role: '',
        bool: false,
        loading: false
    }

    componentWillUnmount = () => {
        firebase.database().ref('chat').off()
        firebase.database().ref('message').off()
    }

    componentDidMount = async () => {
        await this.setState({loading: true})
        const myId = await AsyncStorage.getItem('_id')
        const role = await AsyncStorage.getItem('role')
        // console.log(myId, 'ini id sayay')
        firebase.database().ref('chat').on('value', (snapshot) => {
            // console.log(snapshot.val(), 'ini dari chat list')
            const ArrayOfChatRoom = Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}));
            // console.log(ArrayOfChatRoom)
            const filteredChatRoom = ArrayOfChatRoom.filter(each =>  {
                const idRegex = new RegExp(myId)
                if (idRegex.test(each.key)) {
                    return each
                }
            })
            const keyMessage = filteredChatRoom.map(each => each.messageId)
            // console.log(filteredChatRoom, 'ini filtered')
            // console.log(keyMessage, 'ini key only')

            firebase.database().ref('message').on('value', (snapshot) => {
                const ArrayOfChat = Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}));
                // console.log(snapshot.val(), 'ini dari message')
                const chatFiltered = ArrayOfChat.filter(eachChat => {
                    // console.log(eachChat, 'ini eachChat')
                    // console.log(eachChat.allChat)
                    const ArrayOfAllChat = Object.entries(eachChat.allChat).map(item => ({...item[1], key: item[0]}));
                    // console.log(ArrayOfAllChat)
                    const data = {
                        key: eachChat.key,
                        seller: eachChat.seller,
                        buyer: eachChat.buyer,
                        allChat: ArrayOfAllChat
                    }
                    // console.log(data, 'ini udah diubah')
                    // const eachChanged = eachChat
                    for (let i = 0; i < keyMessage.length; i++) {
                        if (eachChat.key === keyMessage[i]) {
                            return eachChat
                            // return data
                        }
                    }
                })
                console.log(chatFiltered, 'ini chat filtered')
                const chatChanged = chatFiltered.map(each => {
                    const ArrayOfAllChat = Object.entries(each.allChat).map(item => ({...item[1], key: item[0]}));
                    // console.log(ArrayOfAllChat)
                    const sortedArrayChat = ArrayOfAllChat.sort(function(a, b) {
                        // return a.createdAt > b.createdAt;
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });
                    //   console.log(sortedArrayChat, 'ini chat list ke sort')
                    const data = {
                        key: each.key,
                        seller: each.seller,
                        buyer: each.buyer,
                        allChat: sortedArrayChat
                    }

                    return data
                })
                // console.log(chatChanged, 'ini udah diubah nih')
                // console.log(chatFiltered.allChat, 'ini all chat nya')
                this.setState({
                    myChat: chatChanged,
                    loading: false,
                    role: role,
                    bool: !this.state.bool
                })
            })
        })
    }

    render() {
        const { role } = this.state
        // console.log(this.state.myChat, 'my chat history')
        return (
            <View style={{flex: 1}}>
                <BurgerMenu style={styles.burgerMenu} {...this.props}></BurgerMenu>
                <View style={styles.topMenu}>
                    <Text style={styles.title}>Chat</Text>
                </View>
                
                {this.state.loading
                ? 
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#ab1919" />
                    </View>
                :

                this.state.myChat.length 
                ?
                <FlatList
                    data={this.state.myChat}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ChatDetail', {
                                chatKey: item.key,
                            })}
                            style={styles.eachChat}
                        >   
                            
                            {role === 'buyer' ? item.seller.profilePic ? 
                            <Image
                            source={{uri: item.seller.profilePic}}
                            style={styles.profilePicture} />  
                            : 
                                <Image
                                    source={require('../assets/profile.png')}
                                    style={styles.profilePicture} /> 
                            : 
                            item.buyer.profilePic ? 
                            <Image
                            source={{uri: item.buyer.profilePic}}
                            style={styles.profilePicture} />   : 
                            <Image
                                    source={require('../assets/profile.png')}
                                    style={styles.profilePicture} />  }
                                    
                            <View style={styles.chatInfo}>
                                <Text style={styles.name}>{role === 'buyer' ? item.seller.name : item.buyer.name}</Text>

                                {item.allChat[0].message.length > 25 ? 
                                    <Text style={styles.chatDetail}>{item.allChat[0].message.slice(0, 25)}  
                                        <Text style={{color: '#283D85'}}>...</Text>
                                    </Text>
                                    :
                                    <Text style={styles.chatDetail}>{item.allChat[0].message}</Text>
                                    }
                            </View>
                        </TouchableOpacity>
                    )}
                />
                :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Tidak ada history chat</Text>
                </View>
                
                }

            </View>
        )
    }
}


const styles = StyleSheet.create({
    topMenu: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    burgerMenu: {
        top: 5,
        left: 10,
        zIndex: 2,
        position : 'absolute',
    },
    title: {
        fontSize: 24,
    },
    eachChat: {
        flex: 1,
        height: 100,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'lightgrey',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    profilePicture: {
        flex: 1,
        height: 75,
        width: 75,
        marginRight: 15,
    },
    chatInfo: {
        flex: 3,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    chatDetail: {
        fontSize: 16
    }
})

export default ChatList