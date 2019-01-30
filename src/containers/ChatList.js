import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, AsyncStorage } from 'react-native'
import BurgerMenu from '../components/burgerMenu'
import firebase from 'react-native-firebase'

class ChatList extends Component {
    state = {
        chatList: [{
            picture: "",
            name: "Budi",
            lastChat: "Halo mbak, mau pesan apa hari ini?"
        }, {
            picture: "",
            name: "Joko",
            lastChat: "Mau beli"
        }, {
            picture: "",
            name: "Tukul",
            lastChat: "Halo kak, pesanannya sudah sesuai aplikasi ?"
        }, {
            picture: "",
            name: "Budi",
            lastChat: "Halo mbak, mau pesan apa hari ini?"
        }, {
            picture: "",
            name: "Joko",
            lastChat: "Mau beli"
        }, {
            picture: "",
            name: "Tukul",
            lastChat: "Halo kak, pesanannya sudah sesuai aplikasi ?"
        }, {
            picture: "",
            name: "Budi",
            lastChat: "Halo mbak, mau pesan apa hari ini?"
        }, {
            picture: "",
            name: "Joko",
            lastChat: "Mau beli"
        }, {
            picture: "",
            name: "Tukul",
            lastChat: "Halo kak, pesanannya sudah sesuai aplikasi ?"
        }, {
            picture: "",
            name: "Budi",
            lastChat: "Halo mbak, mau pesan apa hari ini?"
        }, {
            picture: "",
            name: "Joko",
            lastChat: "Mau beli"
        }, {
            picture: "",
            name: "Tukul",
            lastChat: "Halo kak, pesanannya sudah sesuai aplikasi ?"
        }],
        myChat: [],
        role: ''
    }

    componentDidMount = async () => {
        const myId = await AsyncStorage.getItem('_id')
        const role = await AsyncStorage.getItem('role')
        // console.log(myId, 'ini id sayay')
        firebase.database().ref('chat').once('value', (snapshot) => {
            console.log(snapshot.val(), 'ini dari chat list')
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

            firebase.database().ref('message').once('value', (snapshot) => {
                const ArrayOfChat = Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}));
                // console.log(snapshot.val(), 'ini dari message')
                const chatFiltered = ArrayOfChat.filter(eachChat => {
                    // console.log(eachChat, 'ini eachChat')
                    for (let i = 0; i < keyMessage.length; i++) {
                        if (eachChat.key === keyMessage[i]) {
                            return eachChat
                        }
                    }
                })
                console.log(chatFiltered, 'ini chat filtered')
                // console.log(chatFiltered.allChat, 'ini all chat nya')
                this.setState({
                    myChat: chatFiltered,
                    role: role
                })
            })
        })
    }

    render() {
        const { role } = this.state
        // console.log(this.state.myChat, 'my chat history')
        return (
            <View>
                <BurgerMenu style={styles.burgerMenu} {...this.props}></BurgerMenu>
                <View style={styles.topMenu}>
                    <Text style={styles.title}>Chat</Text>
                </View>
                {/* <FlatList
                    data={this.state.chatList}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ChatRoom')}
                            style={styles.eachChat}
                        >   
                            <Image
                                source={require('../assets/profile.png')}
                                style={styles.profilePicture}
                            />
                            <View style={styles.chatInfo}>
                                <Text style={styles.name}>{item.name}</Text>
                                {item.lastChat.length > 25 ? 
                                    <Text style={styles.chatDetail}>{item.lastChat.slice(0, 25)}  
                                        <Text style={{color: '#283D85'}}>       ...more</Text>
                                    </Text>
                                    :
                                    <Text style={styles.chatDetail}>{item.lastChat}</Text>
                                    }
                            </View>
                        </TouchableOpacity>
                    )}
                /> */}
                <FlatList
                    data={this.state.myChat}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ChatDetail', {
                                chatKey: item.key,
                            })}
                            style={styles.eachChat}
                        >   
                            <Image
                                source={require('../assets/profile.png')}
                                style={styles.profilePicture}
                            />
                            <View style={styles.chatInfo}>
                                {/* <Text>
                                    {JSON.stringify(item)}
                                </Text> */}
                                <Text style={styles.name}>{role === 'buyer' ? item.seller.name : item.buyer.name}</Text>
                                {/* <Text style={styles.name}>{item.name}</Text>
                                {item.lastChat.length > 25 ? 
                                    <Text style={styles.chatDetail}>{item.lastChat.slice(0, 25)}  
                                        <Text style={{color: '#283D85'}}>       ...more</Text>
                                    </Text>
                                    :
                                    <Text style={styles.chatDetail}>{item.lastChat}</Text>
                                    } */}
                            </View>
                        </TouchableOpacity>
                    )}
                />
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
        alignItems: 'center'
    },
    profilePicture: {
        flex: 1,
        height: 75
    },
    chatInfo: {
        flex: 3
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