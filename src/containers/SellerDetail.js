import React, { Component } from 'react'
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, Linking, AsyncStorage, ActivityIndicator } from 'react-native'
import axios from 'axios';
import firebase from 'react-native-firebase'

class SellerDetail extends Component {
    state = {
        name: "",
        brand: "",
        itemList: [],
        profilePic: "",
        phone : null
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
               itemList : data.shopId.itemList,
               profilePic: data.profilePic,
               phone : data.phone
           })
        })
        .catch(error => {
            console.log(error)
        })
      

    }

    testCall = () => {
        Linking.openURL(`tel:${this.state.phone}`).catch((err) => console.error('An error occurred', err));
    }

    chatSeller = async () => {
        // console.log()
        const { navigation } = this.props
        const newIdChat = firebase.database().ref('chat').push().key
        const newIdMessage = firebase.database().ref('message').push().key
        let sellerId = this.props.navigation.getParam('id')
        const myId  = await AsyncStorage.getItem('_id')
        const myName  = await AsyncStorage.getItem('name')
        const myProfilePic  = await AsyncStorage.getItem('profilePic')
        const sellerProfilePic = this.state.profilePic
        const chatRoomId = `${myId}-${sellerId}`
        // console.log(sellerId, 'ini seller id')
        // console.log(myId, 'ini my id')
        // console.log(newIdChat, 'new id chat')
        // console.log(newIdMessage, 'new id message')
        // console.log('ini room idnya nih', chatRoomId)
        console.log(myProfilePic, 'ini my profile pic')
        console.log(sellerProfilePic, 'ini seller profile pic')
        
        firebase.database().ref('chat').child(chatRoomId).once('value', (snapshot) => {
            // console.log(snapshot.val())
            if (snapshot.val()) {
                // console.log('sudah ada chat history ...')
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
                            name: this.state.name,
                            profilePic: sellerProfilePic
                        },
                        buyer: {
                            id: myId,
                            name: myName,
                            profilePic: myProfilePic
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

    formatRupiah = (number) => {
        var splitNum;
        number = Math.abs(number);
        number = number.toFixed(0);
        splitNum = number.split('.');
        splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return 'Rp. ' + splitNum.join(".");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginBottom: 70, flex: 1}}>
                    <ScrollView>
                        <View style={styles.profileContainer}>
                            <Image
                                source={this.state.profilePic ? {uri : this.state.profilePic } : require("../assets/profile.png")}
                                style={styles.imageProfile}
                            ></Image>
                            <Text style={styles.brand}>{this.state.brand}</Text>
                            <Text style={styles.name}>{this.state.name}</Text>
                        </View>
                        {this.state.itemList.length
                        ?
                            <FlatList
                                style={styles.flatList}
                                data={this.state.itemList}
                                renderItem={({item}) => (
                                    <View style={styles.itemContainer}>
                                        {item.picture 
                                        ? <Image
                                            source={{uri: item.picture}}
                                            style={styles.imageFood}
                                            /> 
                                        : <Image
                                            source={require("../assets/food.png")}
                                            style={styles.imageFood}
                                            />
                                        }
                                        <View style={{flex: 1, flexWrap: 'wrap', justifyContent: 'center'}}>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemPrice}>{this.formatRupiah(item.price)}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        : <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                            <ActivityIndicator style={{margin: 10}} size="large" color="#ab1919" />
                        </View>
                        }
                    </ScrollView>
                </View>
                <View style={styles.bottomMenu}>
                    <TouchableOpacity onPress={this.chatSeller}>
                        <Image
                            source={require("../assets/chat.png")}
                            style={styles.menuIcon}
                        ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('RouteToSeller',{
                            coordinate : this.props.navigation.getParam('coordinate')
                        })
                    
                    }}>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        marginVertical: 10,
    },
    imageProfile: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    flatList: {
        backgroundColor: "white",
        // marginVertical: 15,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'lightgrey'
    },
    imageFood: {
        height: 120,
        width: 170,
        borderRadius: 10,
    },
    itemName: {
        fontSize: 22,
        marginHorizontal: 10,
        fontWeight: 'bolder',        
    },
    itemPrice: {
        marginHorizontal: 10,
        fontSize: 18,
    },
    name: {
        fontSize: 24
    },
    brand: {
        fontSize: 35,
        alignItems: 'center',
        textAlign: 'center',
        color: '#ab1919'
    }
}

export default SellerDetail