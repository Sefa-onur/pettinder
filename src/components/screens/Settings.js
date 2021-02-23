import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Button from '../helpercomponents/Button2';

const Settings = ({navigation,route}) => {
    const data = route.params
    console.log(data)

    const [name,setname] = useState(data.name);
    const [email,setemail] = useState(data.email);
    const [date,setdate] = useState(data.date);
    const [location,setlocation] = useState(data.location);
    
    const userid = auth().currentUser.uid

    updatedata = () => {
        database().ref('/users/'+userid).update({
            name:name,
            email:email,
            date:date,
            location:location
        })
        .then(() => {
            alert('updated')
        })
        .catch(() => {
            alert('hataa')
        })
    }
    return(
        <View style = {{flex:1, backgroundColor:'#EFEFEF'}} >
             <View style={styles.Header} >
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity onPress = {() => navigation.goBack() } >
                            <View style={styles.IconLeft} >
                                <Icon name='chevron-left' color='gray' size={40} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: 'gray', marginLeft: 31, marginTop: 5 }} >
                            Düzenle
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                        <TouchableOpacity>
                            <View style={styles.IconRigth}>
                                <SimpleLine name='settings' color='gray' size={25} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: 'gray', marginRight: 31, marginTop: 5 }} >
                            Ayarlar
                        </Text>
                    </View>
                </View>
                <View style = {{alignItems:'center'}} >
                    <Image source = {{uri:data.pets.photoUrl}} style = {styles.Image} />
                </View>
                <View style = {{marginTop:15}} >
                <TextInput
                    style = {styles.Inputs}
                    value = {name}
                    onChangeText = {text => setname(text)}
                    placeholder = {'İsim'}
                />
                <TextInput
                    style = {styles.Inputs}
                    value = {email}
                    onChangeText = {text => setemail(text)}
                    placeholder = {'Email'}
                />
                <TextInput
                    style = {styles.Inputs}
                    value = {date}
                    onChangeText = {text => setdate(text)}
                    placeholder = {'gg/aa/yyyy'}
                />
                <TextInput
                    style = {styles.Inputs}
                    value = {location}
                    onChangeText = {text => setlocation(text)}
                    placeholder = {'Konum'}
                />
                </View>
                <View style = {{marginTop:10}} >
                      <Button Text = 'KAYDET' onPress = {() => updatedata() } />
                </View>   
        </View>
    )
}

export default Settings;

const styles = StyleSheet.create({
    Header:{
        flexDirection: 'row',
        marginTop: 30
    },
    IconLeft:{
        height: 41,
        width: 41,
        marginLeft: 31,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    IconRigth: {
        height: 41,
        width: 41,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 31,
        borderRadius: 50
    },
    Image:{
        height:190,
        width:190,
        borderRadius:100,
        marginTop:-20
    },
    Inputs:{
        borderWidth:1,
        marginHorizontal:31,
        marginVertical:5,
        backgroundColor:'white',
        borderColor:'#CECECE',
        borderRadius:5,
        elevation:5
    }
})