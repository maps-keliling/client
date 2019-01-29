import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity, StyleSheet} from 'react-native';
import BurgerMenu from '../../../../components/burgerMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
//actions
import { Search } from '../../../../actions/home';
class SearchBar extends Component {
    state = {
        keyword : ''
    }

    render(){
        return (
        <View style={styles.topMenu}>
            <BurgerMenu {...this.props}/>
            <View style={styles.searchBar}>
              <View>
                <TextInput 
                    placeholder="cari makanan favorite anda.."
                    value={this.state.keyword}
                    onChangeText={(text) => this.setState({keyword : text})} />
              </View>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => this.props.setKeyword(this.state.keyword)}>
                <Icon 
                  name="search"
                  size={20}/>
              </TouchableOpacity>
            </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
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
        // marginHorizontal: 5,
        flex: 1,
        flexDirection : 'row',
        borderRadius : 25,
        backgroundColor : 'white',
    },
})

const mapDispatchtoProps = dispatch => {
    return {
        setKeyword : (keyword) => dispatch(Search(keyword))  
    }
}
export default connect(null, mapDispatchtoProps)(SearchBar);