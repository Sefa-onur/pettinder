import React from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import Button from '../helpercomponents/Button2';

const SingOut = ({navigation}) => {
    return(
        <View style = {{flex:1,justifyContent:'center'}} >
            <Button Text = 'Çıkış Yap' onPress = {() => auth().signOut().then(() => navigation.navigate('SplashScreen') )} />
        </View>
    )
}

export default SingOut;