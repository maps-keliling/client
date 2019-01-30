import React, { Component } from 'react'
import { AsyncStorage, View, Text, StyleSheet, Button, Image, TextInput, FlatList, Dimensions, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native'
import { scale } from '../helpers/scaling';
import axios from 'axios'
import firebase from 'react-native-firebase';
import { connect } from  'react-redux';
class ShopDetail extends Component {
    state = {
        brandName: "",
        shopStatus: false,
        listItems: [],
        id : '',
        name : '',
        username : '',
        role : '',
        profilePic : '',
        token : ''
    }

    componentDidMount =  async () => {
        this.getAllItems()
        let {id, name, username, role, profilePic, token } = await this.getDataLocalStorage()
        this.setState({
            id,
            name,
            username,
            role,
            profilePic,
            token
        }, ()=> {
            firebase.database().ref(`/seller/${id}`).once('value', snapshot => {
                if(snapshot.val()){
                    this.setState({
                        shopStatus : true
                    })
                }
            })
            this.getAllItems()
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    getDataLocalStorage = async () => {
        try {
            let id =  await AsyncStorage.getItem('id');
            let role = await AsyncStorage.getItem('role');
            let name =  await AsyncStorage.getItem('name');
            let profilePic = await AsyncStorage.getItem('profilePic');
            let username =  await AsyncStorage.getItem('username');
            let token =  await AsyncStorage.getItem('token')
            return {
                id, role, name, profilePic, username, token
            }
        }catch(e){
            console.log('Error :', e)
        }
    }

    toggleShopStatus = () => {
        if (this.state.shopStatus) {
            this.setState({
                shopStatus: false
            }, ()=> {
              firebase.database().ref(`/seller/${this.state.id}`).set(null)
            })
        } else {
            this.setState({
                shopStatus: true
            }, ()=> {
                navigator.geolocation.getCurrentPosition(position => {
                    let { latitude, longitude} = position.coords
                    firebase.database().ref(`/seller`).child(this.state.id).set({
                        name : this.state.name,
                        brand : this.state.brandName,
                        profilePic : this.state.profilePic,
                        coordinate : {
                            lat : latitude,
                            long : longitude
                        }
                    })
                  }, (error) => {
                    console.log('ini adaalah error :', error)
                  }, {
                    enableHighAccuracy : false,
                    timeout: 10000,
                    maximumAge: 10000
                  })
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
            url: `http://35.243.157.0/users/${this.state.id}`,
            method: 'GET',
            headers: {
                auth: this.state.token
            }
        })
        .then( response => {
            this.setState({
                listItems: response.data.itemList,
                brandName: response.data.brand
            })
        })
        .catch( err => {
            console.log(err.response);
        })
    }

    addFood = () => {
        axios({
            url: `http://35.243.157.0/items`,
            method: `POST`,
            headers: {
                auth: this.state.token
            },
            data: {
                name: this.state.inputNewFood,
                price: this.state.inputPrice
            }
        })
        .then( response => {
            // console.log(response.data.itemList);
            this.setState({
                inputNewFood: "",
                inputPrice: "",
                isOpen: false,
                listItems: response.data.itemList})
        })
        .catch( err => {
            console.log(err.response);
            // error belum terhandle
        })
    }
    

    render() {
        return (
            <View>
                <BurgerMenu style={styles.burgerMenu} {...this.props}></BurgerMenu>
                <View style={styles.editBrand}>
                    <View style={styles.inputBrandName}>
                        <Text>{this.state.brandName}</Text>
                        {/* <TextInput
                            placeholder="Nama Toko"
                            style={styles.inputBrandName}
                            onChangeText={(text) => this.handleChange('brand', text)}
                            value={this.state.
                                brand}
                            underlineColorAndroid="#F0E9E0"
                        /> */}
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
                            onPress={() => this.setState({isOpen: true, current})}
                        >
                            <Image
                                source={require("../assets/add.png")}
                                style={styles.editIcon}
                            />
                        </TouchableOpacity>
                    </View>

                    <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} coverScreen={true} style={styles.modal} position={"center"}>
                        <Text style={styles.titleText}>Tambah menu baru</Text>
                        <View>
                            <TextInput
                                autoCapitalize="none"
                                style={styles.inputForm}
                                placeholder="Nama menu"
                                ref={input => { this.inputFood = input }}
                                onChangeText={(text) => this.handleChange('inputNewFood', text)}
                                underlineColorAndroid="#F0E9E0"
                            ></TextInput>
                            <TextInput
                                autoCapitalize="none"
                                style={styles.inputForm}
                                placeholder="Harga"
                                ref={input => { this.inputPrice = input }}
                                onChangeText={(text) => this.handleChange('inputPrice', text)}
                                underlineColorAndroid="#F0E9E0"
                            ></TextInput>
                            <Button onPress={() => this.addFood()} title="Tambah" color="#ab1919"></Button>
                        </View>

                    </Modal>
                

                    
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
                                <View style={{flex: 1, justifyContent: 'space-between'}}>
                                    <Text style={styles.textMenu}>{item.name}</Text>
                                    <Text style={styles.textMenu}>{item.price}</Text>
                                </View>
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
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25
    },
    inputForm: {
        fontSize: 18,
        marginVertical: 2
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    editBrand: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    burgerMenu: {
        top: 5,
        left: 10,
        zIndex: 2,
        position : 'absolute',
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
        height: scale(240),
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

const mapStatetoProps = state => {
    return {
        token : state.home.token
    }
}

export default connect(mapStatetoProps, null)(ShopDetail);