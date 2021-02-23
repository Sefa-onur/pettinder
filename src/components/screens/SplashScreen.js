import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({navigation}) => {
    return(
        <View style = {styles.Container}>
            <Animatable.View style = {styles.ImageView} animation='fadeInRightBig' delay={1*500} direction='normal' >
              <Image source = {require('../../../Logos/logo.png')} style = {styles.Image} />
            </Animatable.View>
            <View style = {styles.ButtonView} >
              <TouchableOpacity style = {styles.ButtonLogin} onPress = {() => navigation.navigate('Login') } >
                  <Text style = {styles.Text} >Giriş Yap</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.ButtonCreate} onPress = {() => navigation.navigate('KisiselBilgiler')} >
                  <Text style = {styles.Text}>Kayıt Ol</Text>
              </TouchableOpacity>
            </View>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#FFBA49',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    ImageView:{
        flex:1,
        justifyContent:'flex-end'
    },
    ButtonView:{
        flex:1,
        justifyContent:'center'
    },
    Image:{
        height:240,
        width:240,
    },
    ButtonLogin:{
        width:300,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F27059',
        borderColor:'#FE3C72',
        borderRadius:25
    },
    Text:{
        fontWeight:'bold',
        fontSize:14,      
    },
    ButtonCreate:{
        width:300,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#4A4A4A',
        borderColor:'#FE3C72',
        borderRadius:25,
        marginTop:16
    }
})