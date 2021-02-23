import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../helpercomponents/Button';
import Spinner from '../helpercomponents/Spinner';

const KisiselBilgiler = ({ navigation }) => {

    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password,setpassword] = useState();
    const [date, setdate] = useState();
    const [location, setlocation] = useState();
    const [text, settext] = useState(null);
    const [loading, setloading] = useState(false);


    const onclick = () => {
        setloading(true)
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!name||!email||!date||!location) {
            settext('Bilgileri Eksiksiz Doldurunuz!!')
            setloading(false)
        } else if (reg.test(email) != true) {
            settext('E-mail adresiniz İstenilen Formatta Değil!!')
            setloading(false)
            setemail('')
        } else {
            auth().createUserWithEmailAndPassword(email,password)
            .then((res) => {
                database().ref('/users/'+res.user.uid).set({
                    name: name,
                    email: email,
                    date: date,
                    location: location
                    })
                .then(() => {
                    setloading(false)
                    navigation.navigate('Pet')
                })                       
                .catch((e) => {
                    console.log(e)
                })
            })
                
        }
    }

    const textFunction = () => {
        if (text == null) {
            return null;
        } else {
            return text
        }
    }

    const SpinnerFunction = () => {
        if (loading == false) {
            return <Button onPress={() => onclick() } Text='İLERİ' />
        } else {
            return <Spinner />
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
            <View style={styles.Header} >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name='chevron-back' size={40} color='#F27059' />
                </TouchableOpacity>
            </View>
            <View style={styles.Info} >
                <Text style={styles.InfoText} >
                    Kişisel Bilgiler
                </Text>
            </View>
            <View style={{ height: 10, paddingLeft: 40 }} >
                <Text style={{ color: 'red' }} >
                    {textFunction()}
                </Text>
            </View>
            <View style={styles.Inputs} >
                <TextInput
                    placeholder='Ad'
                    style={styles.TextInput}
                    onChangeText={(text) => setname(text)}
                    value={name}
                />
                <TextInput
                    placeholder='example@gmail.com'
                    style={styles.TextInput}
                    onChangeText={(text) => setemail(text)}
                    value={email}
                />
                <TextInput
                    placeholder='Password'
                    style={styles.TextInput}
                    onChangeText={(text) => setpassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
                <TextInputMask
                  type = {'datetime'}
                  style = {styles.DateInput}
                  value = {date}
                  onChangeText = {text => setdate(text)}
                  placeholder = 'gg/aa/yyyy'
                  options = {{
                      format : 'DD/MM/YYYY'
                  }}
                /> 
                <TextInput
                    placeholder='Konum'
                    style={styles.TextInput}
                    onChangeText={(text) => setlocation(text)}
                    value={location}
                />
                {SpinnerFunction()}
            </View>
        </View>
    )
}

export default KisiselBilgiler;

const styles = StyleSheet.create({
    Header: {
        height: 50,
        justifyContent: 'flex-end',
        marginLeft: 35
    },
    InfoText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    Info: {
        marginLeft: 50,
        marginTop: 30
    },
    TextInput: {
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'gray'
    },
    Inputs: {
        marginTop: 10
    },
    DateInput:{
        borderWidth:1,
        marginHorizontal:30,
        borderRadius:10,
        borderColor:'gray',
        backgroundColor:'white',
        marginVertical:5
    }
})