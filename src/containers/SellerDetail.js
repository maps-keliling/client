import React, { Component } from 'react'
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, Linking, AsyncStorage } from 'react-native'
import axios from 'axios';
import firebase from 'react-native-firebase'

class SellerDetail extends Component {
    state = {
        name: "",
        brand: "",
        itemList: [{
            name: "",
            price: ""
        }]
    }
    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                return value
            }
          } catch (error) {
            console.log(error)
          }
    }
    componentDidMount = async () => {
        let id = this.props.navigation.getParam('id')
        let token = await this.getToken()
        axios.get('http://35.243.157.0/users/'+id, {
            headers : {
                auth : token
            }
        })
        .then(({ data }) => {
           this.setState({
               name : data.name,
               brand : data.shopId.brand,
               itemList : data.shopId.itemList
           })
        })
        .catch(error => {
            console.log(error)
        })
      

    }

    testCall = () => {
        Linking.openURL('tel:0816297325').catch((err) => console.error('An error occurred', err));
    }

    chatSeller = async () => {
        // console.log()
        const { navigation } = this.props
        const newIdChat = firebase.database().ref('chat').push().key
        const newIdMessage = firebase.database().ref('message').push().key
        let sellerId = this.props.navigation.getParam('id')
        const myId  = await AsyncStorage.getItem('_id')
        const myName  = await AsyncStorage.getItem('name')
        const chatRoomId = `${myId}-${sellerId}`
        console.log(sellerId, 'ini seller id')
        console.log(myId, 'ini my id')
        console.log(newIdChat, 'new id chat')
        console.log(newIdMessage, 'new id message')
        firebase.database().ref('chat').child(chatRoomId).once('value', (snapshot) => {
            console.log(snapshot.val())
            if (snapshot.val()) {
                console.log('sudah ada chat history ...')
                navigation.navigate('ChatDetail', {
                    chatKey: snapshot.val().messageId,
                    sellerName: this.state.name
                })
            } else {
                firebase.database().ref('chat').child(chatRoomId).set({
                    messageId: newIdChat
                })
                .then(() => {
                    return firebase.database().ref('message').child(newIdChat).set({
                        seller: {
                            id: sellerId,
                            name: this.state.name
                        },
                        buyer: {
                            id: myId,
                            name: myName
                        },
                        allChat: {
                            [newIdMessage]: {
                                createdAt: Date.now(),
                                idUser: myId,
                                message: '',
                                name: myName
                            }
                        }
                    })
                })
                .then(() => {
                    navigation.navigate('ChatDetail', {
                        chatKey: newIdChat,
                        sellerName: this.state.name
                    })
                })
            }
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView>
                        <View style={styles.profileContainer}>
                            <Image
                                source={require("../assets/profile.png")}
                                style={styles.imageProfile}
                            ></Image>
                            <Text style={styles.name}>{this.state.name}</Text>
                            <Text style={styles.brand}>{this.state.brand}</Text>
                        </View>
                        <FlatList
                            style={styles.flatList}
                            data={this.state.itemList}
                            renderItem={({item}) => (
                                <View style={styles.itemContainer}>
                                    <Image
                                        source={require("../assets/food.png")}
                                        style={styles.imageFood}
                                    ></Image>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>{item.price}</Text>
                                </View>
                            )}
                        />
                    </ScrollView>
                </View>
                <View style={styles.bottomMenu}>
                    <TouchableOpacity onPress={this.chatSeller}>
                        <Image
                            source={require("../assets/chat.png")}
                            style={styles.menuIcon}
                        ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('RouteToSeller',{
                        coordinate : this.props.navigation.getParam('coordinate')
                    })}>
                        <Image
                            source={require("../assets/marker.png")}
                            style={styles.menuIcon}
                        ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.testCall()}>
                    <Image
                        source={require("../assets/call.png")}
                        style={styles.menuIcon}
                    ></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = {
    container: {
        flex: 1,
        position: 'relative'
    },
    bottomMenu: {
        height: 60,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    menuIcon: {
        width: 70,
        height: 70
    },
    profileContainer: {
        alignItems: 'center', 
        backgroundColor: "white",
        marginVertical: 10,
    },
    imageProfile: {
        width: 200,
        height: 200
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10
    },
    flatList: {
        backgroundColor: "white",
        marginVertical: 15,
    },
    imageFood: {
        flex: 2,
        height: 100,
    },
    itemName: {
        flex: 3,
        fontSize: 18,
        marginHorizontal: 10,
    },
    itemPrice: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 18,
    },
    name: {
        fontSize: 40,
    },
    brand: {
        fontSize: 30
    }
}

export default SellerDetail