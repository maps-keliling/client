import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import CardPedagang from './CardPedagang';
import { connect } from 'react-redux';
import haversine from 'haversine';
class ListPedagang extends Component {
    state = {
        ListPedagang : []
    }

    sortingNearest = (asal) => {
        console.log(asal)
        const currentPosition =  {
           ...this.props.userPosition
        }

        let sortingData = this.props.allUsers.map((datum, index) => {
            return {
            ...datum,
            distance : haversine(currentPosition, {latitude : datum.coordinate.lat, longitude : datum.coordinate.long}, {unit : 'meter'})
            }
        })

        let data = sortingData.sort((a, b) => a.distance - b.distance)
        this.setState({
            ListPedagang : data
        }, ()=>{
            console.log('ini adalah list pedagang :', this.state )
        })
        
    }
    componentDidMount(){
        this.sortingNearest('dari did mount!')
    }

    componentDidUpdate(prevProps){
        if(prevProps.userPosition.latitude !== this.props.userPosition.latitude || prevProps.userPosition.longitude !== this.props.userPosition.longitude || this.props.allUsers.length !== prevProps.allUsers.length){
            this.sortingNearest('dari did update !')
        }
    }

    render(){
        return (
            <>
            {
                this.props.loading ? 
                (
                    <ActivityIndicator style={{alignSelf : 'center'}} size="large" color="#00ff00" />
                )  
                :
                (<ScrollView style={styles.container}>
                    {  
                        this.state.ListPedagang.map((pedagang, index) => {
                        return <CardPedagang key={index} {...pedagang} {...this.props}/>
                        })
                    }
                </ScrollView>)
            }
            </>
            
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
        allUsers :state.home.allUsers.filter(item => item.brand.toLowerCase().includes(state.home.keyword.toLowerCase())),
        userPosition : state.home.userPosition,
        loading : state.home.loading
    }
}
export default connect(mapStatetoProps, null)(ListPedagang);