import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import BurgerMenu from '../components/burgerMenu'

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
        }]
    }

    render() {
        return (
            <View>
                <BurgerMenu style={styles.burgerMenu} {...this.props}></BurgerMenu>
                <View style={styles.topMenu}>
                    <Text style={styles.title}>Chat</Text>
                </View>
                <FlatList
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