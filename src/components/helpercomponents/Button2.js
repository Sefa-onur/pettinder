import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button2 = (props) => {
    return(
        <View style = {{elevation:5}} >
            <TouchableOpacity style = {styles.Button} onPress = {props.onPress} >
                <Text style = {styles.Text} >
                    {props.Text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button2;

const styles = StyleSheet.create({
    Button:{
        justifyContent:'center',
        alignItems:'center',
        height:44,
        marginHorizontal:20,
        borderRadius:20,
        backgroundColor:'#F27059',
        elevation:5 
    },
    Text:{
        fontWeight:'bold',
        color:'white'
    }
})