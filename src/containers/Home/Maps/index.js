import React, {Component} from 'react';
import {Platform, StyleSheet, View, PermissionsAndroid, AsyncStorage} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker,Polyline,Callout  } from 'react-native-maps';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import axios from 'axios';
const APIKEY_GOOGLE_DIRECTION = 'AIzaSyAwiEbbtLePgCOrTpqCeTYQ8qmt-pxX1bE';
import polyline from '@mapbox/polyline';
import StyleMaps from '../StyleMap.json';
import { DrawerActions, withNavigation } from 'react-navigation';
import SearchBar from './SeacrhBar/index';
import { connect } from 'react-redux';
import haversine from 'haversine';
import CustomMarker from './CustomMarker/index';



//actions 
import { setCurrentPositionUser } from '../../../actions/home';
class App extends Component{
  state = {
    latitude: -6.265299,
    longitude: 106.782836,
    latitudeDelta: 0.0010,
    longitudeDelta: 0.0010,
    coords : [],
    map : React.createRef(),
    role : 'seller'
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
          this.props.setPosition({
            latitude : this.state.latitude,
            longitude : this.state.longitude
          })
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
  }

  async componentDidMount(){
    let role = await AsyncStorage.getItem('role')
    this.setState({
      role : role
    })
    this.cekMapsEnaled()
  }

  render() {
    return (
      <View style={styles.container}>
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
          showsUserLocation={true}
        
        >
          {this.props.allUsers.length !== 0 ? this.props.allUsers.map((user, index) => {
            return (
            <Marker 
              key={index} 
              coordinate={{latitude : user.coordinate.lat, longitude:user.coordinate.long}} 
              title={user.brand} 
              description={this.calculateDistance(user.coordinate)}
              onCalloutPress={ this.state.role === 'buyer' ? ()=> this.props.navigation.navigate('SellerDetail', {
                id : user.id,
                coordinate : user.coordinate
              }) : null}>
                <CustomMarker {...user}/>
            </Marker>
           )
          }) : null}
          <Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        </MapView>
        <SearchBar {...this.props}/>
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
  searchBar: {
    paddingHorizontal: 20,
    marginHorizontal: 5,
    flex: 1,
    flexDirection : 'row',
    borderRadius : 25,
    backgroundColor : 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
  inputLocation : {
    width : '100%',
    height : 100,
    borderWidth : 1
  }
 });

 const mapStatetoProps = state => {
   return {
     allUsers : state.home.allUsers
   }
 }

 const mapDispatchtoProps = dispatch => {
   return {
     setPosition : (data) => dispatch(setCurrentPositionUser(data))
   }
 }

 export default connect(mapStatetoProps, mapDispatchtoProps)(withNavigation(App))