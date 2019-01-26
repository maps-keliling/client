import React, { Component} from 'react'
import { StyleSheet, View, Text, TouchableHighlight, ScrollView, Image, TextInput, Button } from 'react-native'
// import axios from 'axios'

class Register extends Component {
    sellerRegister = () => { // belum dicoba, edit key data, url, response
        console.log(this.state);
        this.props.navigation.navigate('home')
        // axios({
        //     url: "",
        //     method: "POST",
        //     data: {
        //         fullName: this.state.fullName,
        //         username: this.state.username,
        //         handphoneNumber: this.state.handphoneNumber,
        //         password: this.state.password,
        //         type: this.state.type
        //     }
        // })
        // .then( response => {
        //     console.log(response);
        // })
        // .catch( err => {
        //     console.log(err);
        // })
    }   

    state = {
        fullName: "",
        username: "",
        handphoneNumber: "",
        password: "",
        type: "seller"
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
                <Text style={styles.textBody}>Hai, Calon Penjual!</Text>
                <Text style={styles.textBody}>Silahkan Daftar</Text>
                <TextInput
                    style={styles.inputNumber}
                    placeholder="Nama lengkap"
                    underlineColorAndroid="gray"
                    onChangeText={(text) => this.handleChange('fullName', text)}
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    placeholder="Username"
                    underlineColorAndroid="gray"
                    onChangeText={(text) => this.handleChange('username', text)}
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    keyboardType="phone-pad"
                    placeholder="No Handphone"
                    underlineColorAndroid="gray"
                    onChangeText={(text) => this.handleChange('handphoneNumber', text)}
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    secureTextEntry={true} 
                    placeholder="Kata sandi"
                    underlineColorAndroid="gray"
                    onChangeText={(text) => this.handleChange('password', text)}
                ></TextInput>
                <Button 
                    title="Daftar" 
                    onPress={this.sellerRegister}
                ></Button>
                <View>
                    <Text>Sudah punya akun?</Text>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Auth')}>
                        <Text>Masuk!</Text>
                    </TouchableHighlight>
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
    textBody: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 5
    },
    inputNumber: {
        fontSize: 20,
        marginVertical: 5
    }
})

export default Register