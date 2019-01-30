import React, { Component } from 'react'
import { ActivityIndicator, AsyncStorage, View, Text, StyleSheet, Button, Image, TextInput, FlatList, Dimensions, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native'
import { scale } from '../helpers/scaling';
import axios from 'axios'
import firebase from 'react-native-firebase';
import { connect } from  'react-redux';
import BurgerMenu from '../components/burgerMenu';
import Modal from 'react-native-modalbox'
import ImagePicker from 'react-native-image-picker'

const options = {
    title: 'Pilih Gambar Makanan',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

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
        token : '',
        swipeToClose: true,
        addModalIsOpen: false,
        editModalIsOpen: false,
        inputNewFood: "",
        inputPrice: "",
        inputEditFood: "",
        inputEditPrice: "",
        currentEditID: "",
        loading: false,
        uriImage: {},
        uploadImageResponse: {},
        loading: false,
        urlImageUpdated : ''
    }

    componentDidMount =  async () => {
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
        this.setState({
            loading: true
        }, () => {
            axios({
                url: `http://35.243.157.0/users/${this.state.id}`,
                method: 'GET',
                headers: {
                    auth: this.state.token
                }
            })
            .then( response => {
                console.log(response)
                this.setState({
                    listItems: response.data.shopId.itemList,
                    brandName: response.data.shopId.brand,
                    loading: false
                })
            })
            .catch( err => {
                this.setState({
                    loading: false
                })
                console.log(err.response);
            })

        })
    }

    pickImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('ini adalah balikan response :', response.data)

                this.setState({
                    uploadImageResponse: response,
                    uriImage: {
                        uri: response.uri, 
                        name : response.fileName, 
                        type : response.type
                    }
                }, () => {
                    console.log('haiii',this.state.uriImage);
                })

            }
        })
    }

    addFood = () => {
        this.setState({
            loading: true
        }, () => {
            let formData = new FormData()
            formData.append('file', this.state.uriImage)
            formData.append('name', this.state.inputNewFood)
            formData.append('price', this.state.inputPrice)

            axios.post('http://35.243.157.0/items',formData, {
                headers : {
                    "Content-Type": "multipart/form-data",
                auth : this.state.token
                }
            })
            .then( (response) => {
                this.setState({
                    inputNewFood: "",
                    inputPrice: "",
                    addModalIsOpen: false,
                    listItems: response.data.itemList,
                    loading: false
                }, () => {
                    console.log('ini adalah state :', this.state)
                });
            })
            .catch( error => {
                this.setState({
                    inputNewFood: "",
                    inputPrice: "",
                })
                console.log( error.response )
            })
        })
    }

    editFood = () => {
        this.setState({
            loading: true
        }, () => {
            let formData = new FormData()
            formData.append('file', this.state.urlImageUpdated)
            formData.append('name', this.state.inputEditFood)
            formData.append('price', this.state.inputEditPrice)

            axios.put(`http://35.243.157.0/items/${this.state.currentEditID}`, formData, {
                headers : {
                    "Content-Type": "multipart/form-data",
                auth : this.state.token
                }
            })
            .then( (response) => {
                // alert(JSON.stringify(response, 'hahah'))
                this.getAllItems()
                this.setState({
                    editModalIsOpen: false,
                    loading: false,
                    inputEditFood: "",
                    inputEditPrice: "",
                }, () => {
                    console.log('ini adalah state :', this.state)
                });
            })
            .catch( error => {
                // alert('errrr', JSON.stringify(error))
                this.setState({
                    inputEditFood: "",
                    inputEditPrice: "",
                    loading: false
                })
                console.log( error.response )
            })
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
            <View>
                <BurgerMenu style={styles.burgerMenu} {...this.props}></BurgerMenu>
                <View style={styles.topMenu}>
                    <Text style={styles.title}>{this.state.brandName}</Text>
                </View>

                <ScrollView style={{marginBottom: 50, backgroundColor: 'whitesmoke'}}>
                    <View style={styles.shopStatus}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            {this.state.shopStatus ? 
                                <Text style={{fontSize: 18, marginRight: 10, width: '40%'}}>Toko Buka</Text> : 
                                <Text style={{fontSize: 18, marginRight: 10, width: '40%'}}>Toko Tutup</Text>}
                            <Switch
                                onValueChange={() => this.toggleShopStatus()}
                                value={this.state.shopStatus}
                                trackColor={{false: '#ab1919', true: '#283D85'}}
                                thumbColor='gray'
                                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginTop: 5 }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.setState({addModalIsOpen: true, uploadImageResponse: {}, uriImage: {}})}
                        >
                            <Image
                                source={require("../assets/add.png")}
                                style={styles.editIcon}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Modal Add New Item */}
                    <Modal isOpen={this.state.addModalIsOpen} onClosed={() => this.setState({addModalIsOpen: false})} coverScreen={true} style={styles.modal} position={"center"} >
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
                                keyboardType="number-pad"
                                placeholder="Harga"
                                ref={input => { this.inputPrice = input }}
                                onChangeText={(text) => this.handleChange('inputPrice', text)}
                                underlineColorAndroid="#F0E9E0"
                            ></TextInput>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Image 
                                    source={ this.state.uploadImageResponse.data ? {uri: "data:image/jpeg;base64," + this.state.uploadImageResponse.data} : require('../assets/camera.png')}
                                    style={{width: 100, height: 100}}
                                />
                                <TouchableOpacity onPress={() => this.pickImage()} onLongPress={false}>
                                    <Text style={{ fontSize: 18 }}>Unggah Foto</Text>
                                </TouchableOpacity>
                            </View>

                            {this.state.loading && 
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <ActivityIndicator style={{margin: 10}} size="small" color="#ab1919" />
                                </View>
                            }
                            <TouchableOpacity onPress={() => this.addFood()} onLongPress={false} style={{borderColor: "#ab1919", borderWidth: 1, borderRadius: 25, paddingVertical: 10, marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, color: "#ab1919", textAlign: "center"}}>Tambah Baru</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/* Modal Edit Item */}
                    <Modal isOpen={this.state.editModalIsOpen} onClosed={() => this.setState({editModalIsOpen: false})} coverScreen={true} style={styles.modal} position={"center"}>
                        <Text style={styles.titleText}>Ubah Menu</Text>
                        <View>
                            <TextInput
                                autoCapitalize="none"
                                style={styles.inputForm}
                                placeholder="Nama menu"
                                value={this.state.inputEditFood}
                                ref={input => { this.inputFood = input }}
                                onChangeText={(text) => this.handleChange('inputEditFood', text)}
                                underlineColorAndroid="#F0E9E0"
                            ></TextInput>
                            <TextInput
                                autoCapitalize="none"
                                style={styles.inputForm}
                                placeholder="Harga"
                                keyboardType="number-pad"
                                value={String(this.state.inputEditPrice)}
                                ref={input => { this.inputPrice = input }}
                                onChangeText={(text) => this.handleChange('inputEditPrice', text)}
                                underlineColorAndroid="#F0E9E0"
                            ></TextInput>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Image 
                                    source={{ uri : this.state.urlImageUpdated}}
                                    style={{width: 100, height: 100}}
                                />
                                <TouchableOpacity onPress={() => this.pickImage()} onLongPress={false}>
                                    <Text style={{ fontSize: 18 }}>Unggah Foto</Text>
                                </TouchableOpacity>
                            </View>

                            {this.state.loading && <ActivityIndicator style={{margin: 10}} size="small" color="#ab1919" />}
                            <TouchableOpacity onPress={() => this.editFood()} onLongPress={false} style={{borderColor: "#ab1919", borderWidth: 1, borderRadius: 25, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 18, color: "#ab1919", textAlign: "center"}}>Ubah</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                
                    {this.state.loading && 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator style={{margin: 5}} size="large" color="#ab1919" />
                        </View>
                    }

                    <FlatList
                        horizontal={false}
                        numColumns={2}
                        style={styles.allItems}
                        data={this.state.listItems}
                        keyExtractor={item => item._id}
                        renderItem={({item}) => (
                            <View style={styles.eachItem}>
                                {item.picture 
                                ? <Image
                                    source={{uri: item.picture}}
                                    // source={require("../assets/food.png")}
                                    style={styles.itemImage}
                                    /> 
                                : <Image
                                    // source={{uri: item.picture}}
                                    source={require("../assets/food.png")}
                                    style={styles.itemImage}
                                    />
                                }
                                <View style={{flex: 1, justifyContent: 'space-around'}}>
                                    <Text style={styles.textMenu}>{item.name}</Text>
                                    <Text style={styles.textMenu}>{this.formatRupiah(item.price)}</Text>
                                </View>
                                <View style={styles.menuOptions}>
                                    <TouchableOpacity onPress={() => this.setState(
                                        {
                                            editModalIsOpen: true, 
                                            inputEditFood: item.name,
                                            inputEditPrice: item.price,
                                            currentEditID: item._id,
                                            urlImageUpdated: item.picture, 
                                            uriImage: {}
                                    }, ()=> console.log('Ini Adalah url updated :', this.state.urlImageUpdated))}>
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


const styles = StyleSheet.create({
    topMenu: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    allItems: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        width: '80%',
        textAlign: 'center',
        alignSelf: 'flex-end',
        fontWeight: '700'
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10
    },
    inputForm: {
        fontSize: 18,
        marginVertical: 2
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
    },
    editBrand: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
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
        backgroundColor: '#e8e8e8', 
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
        marginTop: 10,
        width: 100,
        height: 100,
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
        fontWeight: '800'
    }
})

const mapStatetoProps = state => {
    return {
        token : state.home.token
    }
}

export default connect(mapStatetoProps, null)(ShopDetail);