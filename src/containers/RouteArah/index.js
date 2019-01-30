import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker,Polyline,Callout  } from 'react-native-maps';
import { PermissionsAndroid,Image, BackHandler, DeviceEventEmitter, Linking } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import axios from 'axios';
const APIKEY_GOOGLE_DIRECTION = 'AIzaSyAwiEbbtLePgCOrTpqCeTYQ8qmt-pxX1bE';
import polyline from '@mapbox/polyline';
import StyleMaps from './StyleMap.json';
import { DrawerActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import haversine from 'haversine';
import Transportation from './Transportation/index';
import NavigationMap from './Navigations/index';
class App extends Component{
  
  state = {
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
    coords : [],
    map : React.createRef(),
    mode : 'driving'
  }
  
  startNavigation = () => {
    let {lat, long} = this.props.navigation.getParam('coordinate')
    var url = `https://www.google.com/maps/dir/?api=1&origin=${this.state.latitude},${this.state.longitude}&travelmode=${this.state.mode}&dir_action=navigate&destination=${lat},${long}`;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
          console.log('Can\'t handle url: ' + url);
      } else {
          //return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err)); 
  }

  getDirections = async ( mode='driving' ) => {
    console.log('Ini adalah mode :', mode)
    let {lat, long} = this.props.navigation.getParam('coordinate')
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=${lat},${long}&mode=${mode}&key=${APIKEY_GOOGLE_DIRECTION}`
    try {
        let { data } = await axios.get(url)
        let data_encoded = polyline.decode(data.routes[0].overview_polyline.points)
        let routes = data_encoded.map((point, index) => {
            return {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({
            coords : routes
        },()=>{
          console.log('Data berubah!')
        })
    }catch(e){
        console.log('ini adalah error google directions :', e);
    }
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

  calculateDistance = (data) => {
    const target = {
      latitude : data.lat,
      longitude : data.long
    }
    const currentPosition =  {
      latitude : this.state.latitude, 
      longitude : this.state.longitude
    }

    let distance = haversine(currentPosition, target, {unit : 'meter'}).toFixed(2)
    if( distance >= 1000){
      let km = Math.floor(distance / 1000)
      let sisa = distance % 1000
      return String((km+','+String(sisa).substring(0,2))+ ' Km')
    }else{
      return String(distance + ' Meter')
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
    this.getDirections(this.state.penjual)
  }

  changeTransport = (mode) => {
    switch(mode){
      case 'mobil :' :
        this.getDirections('driving')
        this.setState({
          mode : 'driving'
        })
        break;
      case 'man' : 
        this.getDirections( 'walking')
        this.setState({
          mode : 'walking'
        })
        break;
      case 'sepeda':
        this.getDirections('bicycling')
        this.setState({
          mode : 'bicycling'
        })
        break;
      default :
      this.getDirections(this.state.penjual, 'driving')
      this.setState({
        mode : 'driving'
      })
    }
  }

  componentDidMount(){
    this.cekMapsEnaled()
  }

  render() {
    let {lat, long} = this.props.navigation.getParam('coordinate')
    return (
      <View style={styles.container}>
        <MapView 
          ref={map => {this.map = map}}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          customMapStyle={StyleMaps}
          style={styles.map}
          initialRegion={{
            latitude : this.props.currentPosition.latitude,
            longitude : this.props.currentPosition.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}>
          <Marker
            coordinate={{latitude : this.props.currentPosition.latitude, longitude : this.props.currentPosition.longitude}}>
            <Image source={require('../../assets/current.png')} style={{ width : 80, height : 80}}/>
          </Marker>
          <Marker
            coordinate={{latitude : lat, longitude : long}}>
            <Image source={require('../../assets/street-vendor.png')} style={{ width : 80, height : 80}}/>
          </Marker>

          <Polyline
            coordinates={this.state.coords}
            strokeWidth={5}
            strokeColor="#275e2c"/>
        </MapView>
        <Transportation changeTransport={this.changeTransport}/>
        <NavigationMap mode={this.state.mode} latitude={this.props.currentPosition.latitude} longitude={this.props.currentPosition.longitude} destinationLatitude={lat} destinationLongitude={long}/>
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
  topMenu : {
    position : 'absolute',
    zIndex: 5,
    height : 50,
    width:'90%',
    top : 20,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around',
    padding : 0,
  },
  searchButton: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'flex-end'
  },
  menu: {
    marginHorizontal: 10,
    borderRadius: 50,
    backgroundColor: 'white'
  },
  menuIcon: {
    width: 50,
    height: 50
  },
  searchBar: {
    paddingHorizontal: 20,
    marginHorizontal: 5,
    flex: 1,
    flexDirection : 'row',
    borderRadius : 25,
    backgroundColor : 'white',
  },
  inputLocation : {
    width : '100%',
    height : 100,
    borderWidth : 1
  }
 });

 const mapStatetoProps = state => {
   return {
       currentPosition : state.home.userPosition
   }
 }

 const mapDispatchtoProps = dispatch => {
   return {

   }
 }

 export default connect(mapStatetoProps, mapDispatchtoProps)(withNavigation(App))