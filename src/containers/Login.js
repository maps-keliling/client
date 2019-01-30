import React, { Component} from 'react'
import { StyleSheet, View, Text, Button, ScrollView, Image, TextInput, AsyncStorage } from 'react-native'
import axios from 'axios'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux';

//actions 
import { SetToken } from '../actions/home';
class Login extends Component {
    state = {
        username: "",
        password: "",
        error: ""
    }

    componentDidMount() {
        // console.log(this.props.navigation)
        console.log('ini did mount')
        firebase.database().ref('Test').on('value', (snapshot) => {
            console.log(snapshot.val())
        })
    }
    

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    login = () => {
        axios({
            url: "http://35.243.157.0/login",
            method: "POST",
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then( async response => {
            this.inputUsername.clear()
            this.inputPassword.clear()

            console.log('login======')
            console.log(response.data)

            // let token = response.data.token
            // let role = response.data.role
            const {name, profilePic, token, role, username, _id } = response.data
            const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWROaDgBF1b0LxeIqtVE9C-XbBoGBonouTumjSCtFQB5Hn4BcY'
            await AsyncStorage.setItem('id', _id);
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('role', role);
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('profilePic', profilePic || defaultAvatar);
            await AsyncStorage.setItem('username', username);
            this.props.SetTokenToRedux(token)
            if (role === "seller") {
                // this.props.navigation.navigate('SellerHome')
                console.log('Masuk ke sini ni! ke seller!')
                this.props.navigation.navigate('App')
            } else if (role === "buyer") {
                console.log('Masuk ke buyer!')
                // this.props.navigation.navigate("BuyerHome")
                this.props.navigation.navigate('App')
            }else{
                console.log('Masuk ke Else!')
            }
            console.log('Finish!')
        })
        .catch( err => {
            this.inputPassword.clear()

            console.log("error: ", err.response);
            this.setState({
                error: err.response.data.message
            })
        })
    }


    render() {
        const { navigation } = this.props
        const message = navigation.getParam('message')
        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require("../assets/login.png")}
                    />
                </View>
                <Text style={styles.textBody}>Silahkan Masuk</Text>
                <Text style={styles.info}>{message}</Text>
                <TextInput
                    style={styles.inputNumber}
                    placeholder="Username"
                    autoCapitalize="none"
                    ref={input => { this.inputUsername = input }}
                    onChangeText={(text) => this.handleChange('username', text)}
                    underlineColorAndroid="#F0E9E0"
                ></TextInput>
                <TextInput
                    autoCapitalize="none"
                    style={styles.inputNumber}
                    secureTextEntry={true} 
                    placeholder="Kata sandi"
                    ref={input => { this.inputPassword = input }}
                    onChangeText={(text) => this.handleChange('password', text)}
                    underlineColorAndroid="#F0E9E0"
                ></TextInput>
                <Text style={styles.textError}>{this.state.error}</Text>
                <View style={styles.buttonContainer}>
                    <Button 
                        color="#ab1919"
                        title='Masuk' onPress={() => this.login()}></Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        color="#ab1919"
                        title='Daftar' onPress={() => this.props.navigation.navigate('Register')}></Button>
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
    buttonContainer: {
        marginVertical: 5,
        marginHorizontal: 20
    },
    info: {
        color: "#FF750D",
        fontSize: 16
    },
    textError: {
        color: 'red',
        fontSize: 16,
        marginVertical: 5
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
        fontSize: 16,
        marginVertical: 2
    },
})

const mapDispatchtoProps = dispatch => {
    return {
        SetTokenToRedux : (token ) => dispatch(SetToken(token))
    }
}
export default connect(null, mapDispatchtoProps)(Login);
