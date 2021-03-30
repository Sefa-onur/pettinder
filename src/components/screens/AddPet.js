import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as İmagepicker from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Button from '../helpercomponents/Button2';

const AddPet = ({ navigation }) => {

    const [response, setresponse] = useState();
    const [petname, setpetname] = useState();
    const [type,settype] = useState();
    const [gender,setgender] = useState();
    const [age,setage] = useState();
    const [weigth,setweigth] = useState();
    const [size,setsize] = useState();
    const [loading,setloading] = useState(false);

    const openlibrary = () => {
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

    const spinnerFunc = () => {
        if(loading == false){
            return(
               <Button Text = 'KAYDET' onPress = { () =>  addPetFunc()} />
            )            
        }else {
            return(
                <View style = {styles.Spinner} >
                    <ActivityIndicator color = 'white' size = 'large' />
                </View>
            )
        }
    }

    const userid = auth().currentUser.uid;

    const addPetFunc = () => {
        if(!response||!petname||!gender||!type||!age||!weigth||!size){
            alert('Bilgileri Giriniz')
        }else{
            setloading(true)
            const ref = storage().ref('users'+userid+'jpg')
            ref.putFile(response.uri)
            .then((ress) => {
                if(ress.state == 'success'){
                   ref.getDownloadURL()
                   .then(url => {
                       database().ref('/users/'+userid).child('pets').push({
                        petname: petname,
                        type: type,
                        gender: gender,
                        age: age,
                        weight: weigth,
                        size: size,
                        photoUrl: url
                       })
                   })
                   .then(() => {
                       setloading(false)
                       navigation.goBack()
                   })
                }
                else{
                    setloading(false)
                    alert('Bir Hata Oluştu')
                }
            })
            .catch(() => {
                alert('Bir Hata Oluştu')
                setloading(false)
            })
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#EFEFEF' }} >
            <View style={styles.Header} >
                <View style={styles.HeaderIcon} >
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Icon name='chevron-back' size={30} color='#A4A9AD' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.HeaderText} >
                    PET EKLE
                </Text>
            </View>
            <View style={styles.Body} >
                <TouchableOpacity onPress={() => openlibrary()} >
                    <View style={styles.FotoView} >
                        <Feather name='camera' size={70} color='gray' />
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {{marginTop:10}} >
                <TextInput
                    placeholder='Petin Adı'
                    value={petname}
                    onChangeText={(text) => setpetname(text)}
                    style={styles.TextInputs}
                />
                <TextInput
                    placeholder='Türü'
                    value={type}
                    onChangeText={(text) => settype(text)}
                    style={styles.TextInputs}
                />
                <TextInput
                    placeholder='Cinsiyeti'
                    value={gender}
                    onChangeText={(text) => setgender(text)}
                    style={styles.TextInputs}
                />
            </View>
            <View style = {{flexDirection:'row',marginTop:5}} >
                <TextInput
                    placeholder='Yaş'
                    onChangeText={(text) => setage(text) }
                    value = {age}
                    style = {styles.InputAge}
                    keyboardType = 'numeric'
                />
                <TextInput
                    placeholder='Kilo'
                    onChangeText={(text) => setsize(text) }
                    value = {size}
                    style = {styles.InputSize}
                    keyboardType = 'numeric'
                />
                <TextInput
                    placeholder='Boy'
                    onChangeText={(text) => setweigth(text) }
                    value = {weigth}
                    style = {styles.InputWeigth}
                    keyboardType = 'numeric'
                />
            </View>
            <View style = {{marginTop:20}} >
                 {spinnerFunc()}
            </View>
        </View>
    )
}

export default AddPet;

const styles = StyleSheet.create({
    Header: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    HeaderIcon: {
        height: 41,
        width: 41,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 31
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 70
    },
    Body: {
        alignItems: 'center'
    },
    FotoView: {
        height: 150,
        width: 150,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#CECECE',
        borderRadius: 10,
        marginTop: 30,
        elevation: 5
    },
    TextInputs:{
        borderWidth:1,
        marginVertical:5,
        borderRadius:10,
        backgroundColor:'white',
        elevation:5,
        borderColor:'#CECECE',
        marginHorizontal:32
    },
    InputAge:{
        flex:1,
        borderWidth:1,
        marginLeft:32,
        backgroundColor:'white',
        borderRadius:10,
        borderColor:'#CECECE',
        elevation:5
    },
    InputSize:{
        flex:1,
        borderWidth:1,
        backgroundColor:'white',
        borderRadius:10,
        marginHorizontal:10,
        borderColor:'#CECECE',
        elevation:5
    },
    InputWeigth:{
        flex:1,
        borderWidth:1,
        marginRight:32,
        backgroundColor:'white',
        borderRadius:10,
        borderColor:'#CECECE',
        elevation:5
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