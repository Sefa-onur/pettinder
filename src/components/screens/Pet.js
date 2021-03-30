import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import * as İmagepicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Button from '../helpercomponents/Button2';

const Pet = ({ navigation }) => {

    const [petname, setpetname] = useState();
    const [type, settype] = useState();
    const [gender, setgender] = useState();
    const [age, setage] = useState();
    const [weight, setweight] = useState();
    const [size, setsize] = useState();
    const [response, setresponse] = useState(null);
    const [loading, setloading] = useState(false)

    openlibrary = () => {
        İmagepicker.launchImageLibrary({
            mediaType: 'photo',
            maxHeight: 150,
            maxWidth: 150
        },
            ((res) => {
                setresponse(res)
            })
        )
    }

    onfocuss = () => {
        if (response == null) {
            return (
                <TouchableOpacity onPress={() => alert('tıklandı')} >
                    <View style={styles.ImageView} >
                        <Feather name='camera' color='gray' size={40} />
                        <Text style={{ color: 'gray' }} >Fotoğraf Ekle</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={{ elevation: 10 }} >
                    <Image source={{ uri: response.uri }} style={styles.Response} />
                </View>
            )
        }
    }
    spinnerFunc = () => {
        if(loading == false) {
            return(
                <Button Text='İLERİ' onPress={() => setDataFunc() } />
            )
        }else {
            return(
                <View style = {styles.Spinner} >
                    <ActivityIndicator size = 'large' color = 'white' />
                </View>
            )
        }
    }
    
    let userid = auth().currentUser.uid
    setDataFunc =  () => {
        if (!petname||!type||!gender||!age||!weight||!size||!response) {
            alert('Bilgileri Giriniz')
        } else {
            setloading(true)         
            const ref = storage().ref('users'+userid+'.jpg')
            console.log(userid)
             ref.putFile(response.uri)
                .then((ress) => {
                    if (ress.state == 'success') {
                        ref.getDownloadURL()
                            .then((url) => {
                                database().ref('/users/'+userid).child('pets').set({
                                    petname: petname,
                                    type: type,
                                    gender: gender,
                                    age: age,
                                    weight: weight,
                                    size: size,
                                    photoUrl: url
                                })
                            })
                            .then(() => {
                                setloading(false)
                                navigation.navigate('Welcome')
                            })
                    }else {
                        setloading(false)
                        alert('hatalııı')
                    }
                })
                .catch(() => {
                    setloading(false)
                    alert('Bir Hata Oluştu')
                })
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#EFEFEF' }} >
            <View style={styles.Header} >
                <Text style={styles.HeaderText} >
                    İlk Petini Ekle
                </Text>
            </View>
            <View style={styles.PetImage} >
                {onfocuss()}
                <View style={styles.AddView} >
                    <TouchableOpacity onPress={() => openlibrary()} >
                        <View style={styles.ButtonView} >
                            <Icon name='plus' size={30} color='#A4A9AD' />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TextInput
                    style={styles.TextInputs}
                    value={petname}
                    onChangeText={(text) => setpetname(text)}
                    placeholder='Petin Adı'
                />
                <TextInput
                    style={styles.TextInputs}
                    value={type}
                    onChangeText={(text) => settype(text)}
                    placeholder='Türü'
                />
                <TextInput
                    style={styles.TextInputs}
                    value={gender}
                    onChangeText={(text) => setgender(text)}
                    placeholder='Cinsiyeti'
                />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }} >
                <TextInput
                    placeholder='Yaş'
                    onChangeText={(text) => setage(text)}
                    value={age}
                    style={styles.InputAge}
                    keyboardType ='numeric'
                />
                <TextInput
                    placeholder='Kilo'
                    onChangeText={(text) => setweight(text)}
                    value={weight}
                    style={styles.InputWeight}
                    keyboardType ='numeric'
                />
                <TextInput
                    placeholder='Boy'
                    onChangeText={(text) => setsize(text)}
                    value={size}
                    style={styles.InputSize}
                    keyboardType ='numeric'
                />
            </View>
            <View style={{ marginTop: 20, elevation: 5 }} >
                {spinnerFunc()}
            </View>
        </View>
    )
}

export default Pet;

const styles = StyleSheet.create({
    Header: {
        height: 40,
        justifyContent: 'flex-end',
        paddingLeft: 35
    },
    HeaderText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    PetImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageView: {
        height: 150,
        width: 150,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    AddView: {
        marginTop: 5
    },
    ButtonView: {
        backgroundColor: 'white',
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 5
    },
    TextInputs: {
        borderWidth: 1,
        marginHorizontal: 32,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#F27059',
        backgroundColor: 'white',
        elevation: 5
    },
    InputAge: {
        flex: 1,
        borderWidth: 1,
        marginLeft: 32,
        borderRadius: 10,
        borderColor: '#F27059',
        elevation: 5,
        backgroundColor: 'white'
    },
    InputSize: {
        flex: 1,
        borderWidth: 1,
        marginRight: 32,
        borderRadius: 10,
        borderColor: '#F27059',
        backgroundColor: 'white',
        elevation: 5,
    },
    InputWeight: {
        flex: 1,
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        borderColor: '#F27059',
        backgroundColor: 'white',
        elevation: 5,
    },
    ResponseImage: {
        height: 150,
        width: 150,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    Response: {
        height: 150,
        width: 150,
        borderRadius: 5,
    },
    Spinner:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        backgroundColor: '#F27059',
        borderRadius: 20,
        elevation: 5
    }
})