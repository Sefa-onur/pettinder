import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../helpercomponents/Button2';

const Welcome = ({navigation}) => {
    return(
        <View style = {styles.Container} >
            <View style = {styles.Header} >
                <Text style = {styles.HeaderText} >
                    Hoşgeldiniz
                </Text>
            </View>
            <View style = {styles.ImageView} >
                <Image style = {styles.Image} source = {require('../../../Logos/logo.png')} />
            </View>
            <View style = {styles.ButtonView} >
                <Button Text = 'EŞLEŞTİR' onPress = {() => navigation.navigate('BottomTabNavigation') } />
            </View>
        </View>
    )
}

export default Welcome;

const styles = StyleSheet.create({
    Container:{
       flex:1,
       backgroundColor:'#EFEFEF'
    },
    Header:{
       height:70,
       justifyContent:'flex-end',
       paddingLeft:35
    },
    HeaderText:{
      fontWeight:'bold',
      fontSize:30
    },
    Image:{
        height:250,
        width:250
    },
    ImageView:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        paddingBottom:50
    },
    ButtonView:{
        paddingBottom:50
    }
})