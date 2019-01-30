import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import MapsView from './Maps/index';
import ListPedagang from './ListPedagang/index';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
//actions 
import { ReadData } from '../../actions/home';

class Home extends Component {
    state = {
        role : 'seller'
    }
    async componentDidMount(){
        let role = await AsyncStorage.getItem('role')
        if(role !== 'seller'){
            this.setState({
                role : 'buyer'
            })
        }
        this.props.readDataSeller()
    }

    componentWillUnmount = () => {
        firebase.database().ref('/seller').off()
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.maps}>
                    <MapsView {...this.props}/>
                </View>
                {
                    this.state.role !== 'seller' ?
                <View style={styles.listPedagang}>
                   <ListPedagang {...this.props}/>
                </View>
                    :
                null
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container : {
        height : '100%',
        width : '100%'    
    },
    maps : {
        flex : 1,
    },
    listPedagang : {
        height : 200,
        width : '100%'
    },
    headerButton : {

    }
})

const mapDispatchtoProps = dispatch => {
    return {
        readDataSeller : () => dispatch(ReadData())
    }
}
export default connect(null, mapDispatchtoProps)(Home);