import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props) => {
    return (
        <View>
            <TouchableOpacity style = {styles.Button} onPress = {props.onPress} >
                <Text style = {styles.Text} >
                    {props.Text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    Button:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'gray',
        backgroundColor:'#707070',
        height:44,
        marginHorizontal:20,
        borderRadius:20,
        elevation:5,
        marginVertical:5
    },
    Text:{
        fontWeight:'bold',
        color:'white'
    }
})