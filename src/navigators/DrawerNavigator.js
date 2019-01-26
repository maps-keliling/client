import { createDrawerNavigator, createAppContainer, DrawerItems, withNavigation } from 'react-navigation';
import MapScreen from '../containers/Map';
import ChatScreen from '../containers/ChatScreen';
import React from 'react'
import { View, Text, Image, TouchableHighlight, AsyncStorage } from 'react-native';

const DrawerNavigator = createDrawerNavigator(
    {      
        MapScreen,
        ChatScreen,
    },
    {
        backBehavior: "none",
        contentComponent: props => (
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center', padding: 10, borderBottomColor: 'grey', borderBottomWidth: 2}}>
                    <Image
                        style={{width: 128, height:128}}
                        source={require("../assets/girl.png")}
                    />
                    <Text style={{fontWeight: 'bold', fontSize: 18, marginTop: 10}}>Desy Rachmawati Armariena</Text>
                </View>
                <View style={{flex: 1}}>
                    <DrawerItems {...props} />
                </View>
                <View style={{justifyContent: 'flex-end', backgroundColor: 'red', alignItems: 'center', padding: 10}}>
                    <TouchableHighlight onPress={ async() => (await AsyncStorage.clear(), props.navigation.navigate('Auth'))}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Log Out!</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
  );

const AppContainer = createAppContainer(DrawerNavigator)
export default AppContainer