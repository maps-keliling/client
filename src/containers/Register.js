import React, { Component} from 'react'
import { StyleSheet, ActivityIndicator, View, Text, Dimensions, ScrollView, Image, TextInput, Button, Picker, TouchableOpacity } from 'react-native'
import axios from 'axios'

class Register extends Component {
    state = {
        name: "",
        username: "",
        phone: "",
        address: "",
        password: "",
        role: "seller", 
        errors: [],
        shopName: "", 
        loading: false
    }

    register = () => {
        // console.log(this.state);
        this.setState({
            loading: true
        }, () => {
            axios({
                url: "http://35.243.157.0/register",
                method: "POST",
                data: {
                    name: this.state.name,
                    username: this.state.username,
                    phone: this.state.phone,
                    address: this.state.address,
                    password: this.state.password,
                    role: this.state.role,
                    brand: this.state.shopName
                }
            })
            .then( response => {
                this.inputName.clear()
                this.inputUsername.clear()
                this.inputPhone.clear()
                this.inputAddress.clear()
                this.inputPassword.clear()
                this.inputShopName.clear()
                // console.log("register success, response: ", response.data);
                this.setState({
                    name: "", username: "", phone: "", address: "", password: "", role: "", errors: [], loading: false
                }, () => {
                    this.props.navigation.navigate('Auth', {
                        message: "Anda sudah terdaftar. Silahkan masuk untuk melanjutkan"
                    }) 
                }) 
            })
            .catch( err => {
                this.setState({
                    loading: false
                })
                let errors = Object.values(err.response.data)
                let errorMessages = errors.map((errors) => {
                    return errors.message
                })
                console.log("error: ",  errorMessages);
                this.setState({
                    errors: errorMessages
                }, () => {
                    console.log("stateee: ", this.state);
                })
            })


        })
    }   


    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require("../assets/register.png")}
                    />
                </View>
                <Text style={styles.textTitle}>Silahkan Daftar</Text>
                <TextInput
                    style={styles.inputNumber}
                    placeholder="Nama lengkap"
                    underlineColorAndroid="#F0E9E0"
                    ref={input => { this.inputName = input }}
                    onChangeText={(text) => this.handleChange('name', text)}
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    placeholder="Username"
                    underlineColorAndroid="#F0E9E0"
                    ref={input => { this.inputUsername = input }}
                    onChangeText={(text) => this.handleChange('username', text)}
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    keyboardType="phone-pad"
                    placeholder="No Handphone"
                    underlineColorAndroid="#F0E9E0"
                    ref={input => { this.inputPhone = input }}
                    onChangeText={(text) => this.handleChange('phone', text)}
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    placeholder="Alamat"
                    underlineColorAndroid="#F0E9E0"
                    ref={input => { this.inputAddress = input }}
                    onChangeText={(text) => this.handleChange('address', text)}
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    secureTextEntry={true} 
                    placeholder="Kata sandi"
                    underlineColorAndroid="#F0E9E0"
                    ref={input => { this.inputPassword = input }}
                    onChangeText={(text) => this.handleChange('password', text)}
                ></TextInput>
                <Picker
                    selectedValue={this.state.role}
                    style={styles.picker}
                    mode="dropdown"
                    onValueChange={(itemValue) => this.setState({role: itemValue})}>
                    <Picker.Item label="Penjual" value="seller" />
                    <Picker.Item label="Pembeli" value="buyer" />
                </Picker>
                {this.state.role === "seller" && 
                    <TextInput
                        style={styles.inputNumber}
                        placeholder="Nama Toko"
                        underlineColorAndroid="#F0E9E0"
                        ref={input => { this.inputShopName = input }}
                        onChangeText={(text) => this.handleChange('shopName', text)}
                    ></TextInput>
                }


                {this.state.errors.length > 0 && 
                    <View>
                        {this.state.errors.map((error, i) => 
                            <Text key={i} style={styles.error}>{error}</Text>
                        )}
                    </View>
                }
                {this.state.loading && <ActivityIndicator style={{margin: 5}} size="large" color="#ab1919" />}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Daftar" 
                        color="#ab1919"
                        onPress={this.register}
                    ></Button>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Auth')}
                        ><Text
                            style={styles.textBody}
                        >Sudah Daftar? Silahkan Login</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200,
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 5
    },
    textBody: {
        marginVertical: 15,
        fontSize: 16,
        color: '#FF750D',
        textAlign: 'center'
    },
    buttonContainer: {
        marginVertical: 5,
        marginHorizontal: 20
    },
    picker: {
        height: 50
    },
    inputNumber: {
        fontSize: 16,
        marginVertical: 2
    },
    error: {
        fontSize: 15,
        color: 'red',
        marginVertical: 3
    }
})

export default Register
