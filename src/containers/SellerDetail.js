import React, { Component } from 'react'
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { AsyncStorage } from 'react-native';

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
            console.log(  data )
           this.setState({
               name : data.name,
               brand : data.shopId.brand,
               itemList : data.shopId.itemList
           }, ()=>{
               console.log(this.state)
           })
        })
        .catch(error => {
            console.log(error)
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatRoom")}>
                        <Image
                            source={require("../assets/chat.png")}
                            style={styles.menuIcon}
                        ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
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