import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  ScrollView, 
  Image, 
  TextInput, 
  AsyncStorage 
} from 'react-native';


class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    login = async () => {
        console.log('loggedIN');
        await AsyncStorage.setItem('username', this.state.username);
        this.props.navigation.navigate('App');
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require("../assets/login.png")}
                    />
                </View>
                <Text style={styles.textBody}>Silahkan Daftar</Text>
                <TextInput
                    style={styles.inputNumber}
                    // keyboardType="phone-pad"
                    placeholder="Username"
                    onChangeText={(text) => this.handleChange('username', text)}
                    underlineColorAndroid="gray"
                ></TextInput>
                <TextInput
                    style={styles.inputNumber}
                    secureTextEntry={true} 
                    placeholder="Kata sandi"
                    onChangeText={(text) => this.handleChange('password', text)}
                    underlineColorAndroid="gray"
                ></TextInput>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button 
                            color="#e1391b"
                            title='Masuk' onPress={() => this.login()}></Button>
                    </View>
                    <View style={styles.button}>
                        <Button 
                            color="#e1391b"
                            title='Daftar sebagai Penjual' onPress={() => this.props.navigation.navigate('SellerRegister')}></Button>
                    </View>
                    <View style={styles.button}>
                        <Button 
                            color="#e1391b"
                            title='Daftar sebagai Pembeli' onPress={() => this.props.navigation.navigate('BuyerRegister')}></Button>
                    </View>
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
    buttonContainer: {
        marginVertical: 10
    },  
    button: {
        marginVertical: 5,
        marginHorizontal: 20
    },
    image: {
        width: 200,
        height: 200,
    },
    textBody: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 20
    },
    inputNumber: {
        fontSize: 20,
        marginVertical: 5
    }
})

export default Login
