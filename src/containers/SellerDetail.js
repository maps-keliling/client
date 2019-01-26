import React, { Component } from 'react'
import { View, Text, Image, FlatList, ScrollView } from 'react-native'


class SellerDetail extends Component {
    state = {
        name: "",
        brand: "",
        itemList: [{
            name: "Baso Urat",
            price: 25000
        }, {
            name: "Baso Keju",
            price: 30000
        }, {
            name: "Baso Keju",
            price: 30000
        }, {
            name: "Baso Keju",
            price: 30000
        }, {
            name: "Baso Keju",
            price: 30000
        }]
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        source={require("../assets/profile.png")}
                        style={styles.imageProfile}
                    ></Image>
                    <Text style={styles.name}>Budi</Text>
                    <Text style={styles.brand}>Sate Ayam Hacktiv8</Text>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={this.state.itemList}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Image
                                source={require("../assets/food.png")}
                                style={styles.imageFood}
                            ></Image>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                    )}
                />
            </ScrollView>
        )
    }
}


const styles = {
    container: {
        alignItems: 'center', 
        backgroundColor: "white",
        marginVertical: 10,
    },
    imageProfile: {
        width: 200,
        height: 200
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10
    },
    flatList: {
        backgroundColor: "white",
        marginVertical: 15,
    },
    imageFood: {
        flex: 2,
        height: 100,
    },
    itemName: {
        flex: 3,
        fontSize: 16,
        marginHorizontal: 10,
    },
    itemPrice: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16,
    },
    name: {
        fontSize: 40,
    },
    brand: {
        fontSize: 30
    }
}

export default SellerDetail