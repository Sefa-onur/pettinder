import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Spinner from '../helpercomponents/Spinner2';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const [loading,setloading] = useState(false);
    const [text,settext] = useState(null)

    onclick = () => {
        setloading(true)
        if(!email||!password){
           setloading(false)
           settext('E-mail Adresi ve Şifre Boş Geçilemez')
        }
        else{
            auth().signInWithEmailAndPassword(email,password)
            .then(() => {
                setloading(false)
                setEmail(null)
                setpassword(null)
                navigation.navigate('BottomTabNavigation')
            })
            .catch(() => {
                alert('E-mail yada şifre hatalı')
                setloading(false)
                setEmail(null)
                setpassword(null)
            })
        }
    }
    
    SpinnerFunction = () => {
        if(loading == false){
            return(
                <TouchableOpacity style={styles.Button} onPress={() => onclick()} >
                    <Text style={{ fontWeight: 'bold', color: 'white' }} >
                        GİRİŞ
                   </Text>
                </TouchableOpacity>
            )
        }else{
           return <Spinner/>
        }
    }



    return (
        <View style={styles.Container}>
            <View style={styles.Image} >
                <Image source={require('../../../Logos/logo.png')} style = {{width:220,height:220}} />
            </View>
            <View>
                <Text style = {{color:'red'}} >
                  {text}
                </Text>
            </View>
            <View style={styles.Inputs}>
                <View style={styles.EmailView} >
                    <Icon name='user' size={20} color='black' />
                    <TextInput
                        style={styles.Input}
                        placeholder='E-mail'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType='email-address'
                    />
                </View>
                <View style={styles.EmailView} >
                    <Icon name='lock' size={20} color='black' />
                    <TextInput
                        style={styles.Input}
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setpassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                {SpinnerFunction()}
                <View style={{ alignItems: 'flex-end', marginTop: 10 }} >
                    <Text style={{ color: 'gray' }} >
                        Şifremi Unuttum?
                   </Text>
                </View>
            </View>
                <View style={styles.Icons} >
                    <Entypo name='facebook-with-circle' size={30} color='black' style={styles.IconItem} />
                    <Entypo name='email' size={30} color='black' style={styles.IconItem} />
                    <Entypo name='twitter-with-circle' size={30} color='black' style={styles.IconItem} />
                </View>
                <View style={styles.Info} >
                    <Text style={{ marginHorizontal: 10 }} >Hala hesabın yok mu?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('KisiselBilgiler')} >
                        <Text style={{ fontWeight: 'bold' }} >
                            KAYIT OL!
                    </Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFBA49'
    },
    Image: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    Inputs: {
        flex: 1,
        marginBottom:10
    },
    Icons: {
        flexDirection: 'row',
        height: 10
    },
    EmailView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        width: 311,
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'gray',
        elevation: 5
    },
    Button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        backgroundColor: '#FE3C72',
        marginTop: 10,
        borderRadius: 20,
        elevation: 5
    },
    Input: {
        flex: 1
    },
    Icons: {
        flexDirection: 'row',
    },
    IconItem: {
        marginHorizontal: 20,
        marginVertical:25
    },
    Info: {
        flexDirection: 'row',
        marginBottom:15
    }
})