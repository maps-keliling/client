import React, { Component } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'

class ChatRoom extends Component {
    sendChat = () => {
        // sendToFirebase
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.chatContainer}>
                    <TextInput
                        style={styles.chatInput}
                    />
                    <TouchableOpacity
                        onPress={() => sendChat()}
                        style={styles.imageContainer}
                    >
                        <Image
                            source={require('../assets/send.png')}
                            style={styles.sendIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    chatContainer: {
        flexDirection: 'row',
        backgroundColor: '#283D85',
        paddingVertical: 5,
        height: 60
    },
    chatInput: {
        flex: 4,
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        borderColor: 'black',
        marginHorizontal: 10,
        backgroundColor: 'white'
    }, 
    imageContainer: {
        flex: 1,
    },
    sendIcon: {
        width: "100%",
        height: "100%"
    }
})

export default ChatRoom