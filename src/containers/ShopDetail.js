import React, { Component } from 'react'
import { AsyncStorage, View, Text, StyleSheet, Image, TextInput, FlatList, Dimensions, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native'
import { scale } from '../helpers/scaling';
import axios from 'axios'

class ShopDetail extends Component {
    state = {
        token: "",
        brandName: "Sate Maranggi Blok M",
        shopStatus: false,
        listItems: [],
    }

    componentDidMount = async () => {
        let token = await AsyncStorage.getItem('token')
        this.setState({
            token
        }, () => {
            console.log("token: ", this.state.token);
            this.getAllItems()
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    toggleShopStatus = () => {
        if (this.state.shopStatus) {
            this.setState({
                shopStatus: false
            })
        } else {
            this.setState({
                shopStatus: true
            })
        }
    }

    alertDeleteItem = (itemID) => {
        Alert.alert(
            "Hapus Makanan",
            "Apa anda yakin untuk menghapus makanan ini ?",
            [{
                text: "Batal",
                onPress: () => console.log('batal')
                
            }, {
                text: "OK",
                onPress: () => this.deleteItem(itemID)
            }]
        )
    }

    deleteItem = async (itemID) => {
        console.log(itemID, 'sudah terhapus'); 
        let token = await AsyncStorage.getItem('token')
        // alert(`${itemID}, ${token}`)
        axios({
            method: 'DELETE',
            url: `http://35.243.157.0/items/${itemID}`,
            headers: {
                auth: token
            }
        })
        .then( response => {
            console.log("res: ", response.data);
            this.getAllItems()
        })
        .catch( err => {
            console.log("error: ",err.responnse);
        })
    }

    getAllItems = () => {
        axios({
            url: `http://35.243.157.0/items`,
            method: 'GET',
            headers: {
                auth: this.state.token
            }
        })
        .then( response => {
            console.log(response.data.itemList);
            this.setState({
                listItems: response.data.itemList
            })
        })
        .catch( err => {
            console.log(err.response);
        })
    }

    render() {
        return (
            <View>
                <View style={styles.editBrand}>
                    <View style={styles.inputBrandName}>
                        <TextInput
                            placeholder="Nama Toko"
                            style={styles.inputBrandName}
                            onChangeText={(text) => this.handleChange('brandName', text)}
                            value={this.state.
                                brandName}
                            underlineColorAndroid="#F0E9E0"
                        />
                    </View>
                    <TouchableOpacity
                        // onPress={function untuk edit BrandName}
                    >
                        <Image
                            source={require("../assets/edit.png")}
                            style={styles.editIcon}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{marginBottom: 50, backgroundColor: 'whitesmoke'}}>
                    <View style={styles.shopStatus}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            {this.state.shopStatus ? 
                                <Text style={{fontSize: 18, marginRight: 15, width: '30%'}}>Toko Buka</Text> : 
                                <Text style={{fontSize: 18, marginRight: 15, width: '30%'}}>Toko Tutup</Text>}
                            <Switch
                                onValueChange={() => this.toggleShopStatus()}
                                value={this.state.shopStatus}
                                trackColor={{false: '#ab1919', true: '#283D85'}}
                                thumbColor='gray'
                                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginTop: 5 }}
                            />
                        </View>
                        <TouchableOpacity
                            // onPress={function untuk add new item}
                        >
                            <Image
                                source={require("../assets/edit.png")}
                                style={styles.editIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <FlatList
                        horizontal={false}
                        numColumns={2}
                        style={styles.allItems}
                        data={this.state.listItems}
                        keyExtractor={item => item._id}
                        renderItem={({item}) => (
                            <View style={styles.eachItem}>
                                <Image
                                    source={require("../assets/food.png")}
                                    style={styles.itemImage}
                                />
                                <Text style={styles.textMenu}>{item.name}</Text>
                                <Text style={styles.textMenu}>{item.price}</Text>
                                <View style={styles.menuOptions}>
                                    <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                        <Image
                                            source={require("../assets/editBlue.png")}
                                            style={styles.editIcon}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.alertDeleteItem(item._id)}>
                                        <Image
                                            source={require("../assets/delete.png")}
                                            style={styles.editIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </ScrollView>
            </View>
        )
    }
}

const win = Dimensions.get('window')

const styles = StyleSheet.create({
    editBrand: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    editIcon: {
        width: 50,
        height: 50
    },
    inputBrandName: {
        fontSize: 24,
        width: 250,
    },
    menuOptions: {
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'space-between', 
        backgroundColor: 'salmon', 
        borderBottomLeftRadius: 25, 
        borderBottomRightRadius: 25, 
        justifyContent: 'space-around'
    },
    shopStatus: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    itemImage: {
        width: 100,
        height: 100
    },
    eachItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 25,
        width: scale(165),
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 2,
        shadowRadius: 2,
        elevation: 5,
    },
    textMenu: {
        textAlign: 'center', 
        fontSize: 18,
        paddingTop: 5,
        paddingBottom: 5,
    }
})

export default ShopDetail