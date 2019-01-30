import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator,Image} from 'react-native';
import CardPedagang from './CardPedagang';
import { connect } from 'react-redux';
import haversine from 'haversine';
class ListPedagang extends Component {
    state = {
        ListPedagang : [],
        role : 'seller'
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

        let data = sortingData.sort((a, b) => a.distance - b.distance)
        this.setState({
            ListPedagang : data
        })
        
    }
    componentDidMount(){
        this.sortingNearest()
    }

    componentDidUpdate(prevProps){
        if(prevProps.userPosition.latitude !== this.props.userPosition.latitude || prevProps.userPosition.longitude !== this.props.userPosition.longitude || this.props.allUsers.length !== prevProps.allUsers.length){
            this.sortingNearest()
        }
    }

    render(){
        return (
            <>
            {
                this.props.loading ? 
                (
                    <ActivityIndicator style={{alignSelf : 'center'}} size="large" color="#ab1919" />
                )  
                :
                (
                <ScrollView style={styles.container}>
                    {  
                        this.state.ListPedagang.length !== 0 ? 
                        this.state.ListPedagang.map((pedagang, index) => {
                        return <CardPedagang key={index} {...pedagang} {...this.props}/>
                        })
                        :
                        <View style={styles.notFound}>
                            <View>
                                <Image 
                                    source={require('../../../assets/food-not-found.png')}
                                    style={styles.imageNotFound}/>
                            </View>
                            <View style={{ flex : 1, flexWrap : 'wrap'}}>
                                <Text style={{fontWeight : 'bold'}}>Maaf, Makanan yang anda cari Tidak Tersedia.</Text>
                            </View>
                        </View>

                    }
                </ScrollView>
                )
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
    },
    notFound : {
        flex : 1,
        width : '100%',
        height : '100%',
        flexDirection: 'row',
        marginTop : 20
    },
    imageNotFound : {
        width : 100,
        height : 100,
        alignSelf : 'center'
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