import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CardPedagang from './CardPedagang';
import { connect } from 'react-redux';
import haversine from 'haversine';
class ListPedagang extends Component {
    state = {
        ListPedagang : []
    }

    sortingNearest = () => {
        const currentPosition =  {
           ...this.props.userPosition
        }

        let sortingData = this.props.allUsers.map((datum, index) => {
            return {
            ...datum,
            distance : haversine(currentPosition, {latitude : datum.coordinate.lat, longitude : datum.coordinate.long}, {unit : 'meter'})
            }
        })

        if ( sortingData.length !== 0 ){
            let data = sortingData.sort((a, b) => a.distance - b.distance)
            this.setState({
                ListPedagang : data
            })
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.userPosition.latitude !== this.props.userPosition.latitude){
            this.sortingNearest()
        }
    }

    render(){
        return (
            <View style={styles.container}>
                 {  
                    this.state.ListPedagang.length !== 0 ? this.state.ListPedagang.slice(0, 3).map((pedagang, index) => {
                        return <CardPedagang key={index} {...pedagang} {...this.props}/>
                     })
                     : null
                 }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        paddingLeft : 20,
        paddingRight : 20,
        paddingTop : 5,
        paddingBottom : 5,
        // backgroundColor : '#e1391bl'  
    }
})

const mapStatetoProps = state => {
    return {
        allUsers : state.home.allUsers,
        userPosition : state.home.userPosition
    }
}
export default connect(mapStatetoProps, null)(ListPedagang);