import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Spinner2 = () => {
    return(
        <View style = {styles.View} >
            <ActivityIndicator size = 'large' color = 'white' />
        </View>
    )
}

export default Spinner2;

const styles = StyleSheet.create({
     View:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        backgroundColor: '#FE3C72',
        marginTop: 10,
        borderRadius: 20,
        elevation: 5
     }
})