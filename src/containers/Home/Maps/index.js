/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//081314782109
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker,Polyline } from 'react-native-maps';
import { PermissionsAndroid, BackHandler, DeviceEventEmitter, Linking } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import axios from 'axios';
const APIKEY_GOOGLE_DIRECTION = 'AIzaSyAwiEbbtLePgCOrTpqCeTYQ8qmt-pxX1bE';
import polyline from '@mapbox/polyline';
import StyleMaps from '../StyleMap.json';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component{
  state = {
    latitude: -6.265299,
    longitude: 106.782836,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
    coords : [],
    map : React.createRef()
  }
  startNavigation = () => {
    var url = "https://www.google.com/maps/dir/?api=1&origin=75+9th+Ave+New+York,+NY&travelmode=driving&dir_action=navigate&destination=MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073";
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
          console.log('Can\'t handle url: ' + url);
      } else {
          //return Linking.openURL(url);
      }
  }).catch(err => console.error('An error occurred', err)); 
  }
  getDirections = async ( destination ) => {
    // let { data } = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?
    //            origin=${this.state}
    //            &destination=${{latitude:-6.2711693,longitude: 106.7777011}}&key=${APIKEY_GOOGLE_DIRECTION}`)

    let { data } = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=75+9th+Ave+New+York,+NY&destination=MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073&key=${APIKEY_GOOGLE_DIRECTION}`)
    let data_encoded = polyline.decode(data.routes[0].overview_polyline.points)
    let routes = data_encoded.map((point, index) => {
      return {
        latitude : point[0],
        longitude : point[1]
      }
    })
    this.setState({
      coords : routes
    }, () => {
      this.startNavigation()
    })
  }

  cekMapsEnaled = async () => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    }).then((success) => {
        this.requestPermission()
    }).catch((error) => {
        console.log(error.message); // error.message => "disabled"
    });
    
  }

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let { latitude, longitude} = position.coords
      this.setState({
        latitude, longitude
      }, () => {
          this.handleCenter()
          this.getDirections()
      })
    }, (error) => {
      console.log('ini adaalah error :', error)
    }, {
      enableHighAccuracy : false,
      timeout: 10000,
      maximumAge: 10000
    })
  }

  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Acces Location',
          'message': 'Cool Photo App needs access to your camera ' +
                     'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
       this.getCurrentPosition()
      } else {
        console.log("Map Permission denied!")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  handleCenter = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  componentDidMount(){
    this.cekMapsEnaled()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View>
            <TextInput placeholder="cari makanan favorite anda.."/>
          </View>
          <TouchableOpacity>
            <Icon 
              name="search"
              size={20}/>
          </TouchableOpacity>
        </View>
        <MapView 
          ref={map => {this.map = map}}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          customMapStyle={StyleMaps}
          style={styles.map}
          initialRegion={{
            latitude : this.state.latitude,
            longitude : this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
        >
          <Marker
            coordinate={{...this.state}}
            title={'Curent Position'}
            description={'Ini adalah current position'}
            />
          <Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        </MapView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFill,
    flex : 1,
    width : '100%', 
    height : '100%',
  },
  searchBar : {
    position : 'absolute',
    zIndex:100,
    height : 50,
    width:'80%',
    top : 20,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around',
    padding : 5,
    borderWidth : 1,
    borderRadius : 6,
    backgroundColor : '#e1391b'
  },
  inputLocation : {
    width : '100%',
    height : 100,
    borderWidth : 1
  }
 });

