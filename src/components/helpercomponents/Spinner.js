import React from 'react';
import {View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = () => {
    return(
        <View style = {styles.View} >
            <ActivityIndicator size = 'large' color = 'white' />
        </View>
    )
}

export default Spinner;

const styles = StyleSheet.create({
    View:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'gray',
        backgroundColor:'#707070',
        height:44,
        marginHorizontal:20,
        borderRadius:20,
        elevation:5,
        marginVertical:5
    }
})