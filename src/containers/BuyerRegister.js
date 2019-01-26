import React, { Component} from 'react'
import { StyleSheet, View, Text, TouchableHighlight, ScrollView, Image, TextInput, Button } from 'react-native'


class Register extends Component {
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
    buyerRegister = () => {
        console.log('test')
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
                <Text style={styles.textBody}>Hai, Calon Pembeli!</Text>
                <Text style={styles.textBody}>Silahkan Daftar</Text>
                <TextInput
                    style={styles.inputNumber}
                    placeholder="Nama lengkap"
                    underlineColorAndroid="gray"
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    placeholder="Username"
                    underlineColorAndroid="gray"
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    keyboardType="phone-pad"
                    placeholder="No Handphone"
                    underlineColorAndroid="gray"
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    secureTextEntry={true} 
                    placeholder="Kata sandi"
                    underlineColorAndroid="gray"
                ></TextInput>
                <Button 
                    title="Daftar" 
                    onPress={this.buyerRegister}
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