import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

class BurgerMenu extends Component {
    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <View style={styles.menu}>
                <TouchableOpacity
                    onPress={this.openDrawer}
                >
                <Image
                    source={require('../assets/menu.png')}
                    style={styles.menuIcon}
                />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        marginHorizontal: 10,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    menuIcon: {
        width: 50,
        height: 50
    },
})

export default BurgerMenu