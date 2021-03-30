import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Tab5 = ({ navigation }) => {

    const [userdata, setuserdata] = useState(null);

    const userid = auth().currentUser.uid;
    useEffect(() => {
        database().ref('/users/' + userid).on('value',snapshot => {
            setuserdata(snapshot.val())
        })           
    }, [])
    if (userdata == null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <ActivityIndicator size='large' color='#F27059' />
            </View>
        )
    } else {
        return (
            <View style={styles.Container} >
                <View style={styles.Header} >
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity onPress={() => navigation.navigate('Settings',userdata)} >
                            <View style={styles.IconLeft} >
                                <Icon name='pencil' color='gray' size={35} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: 'gray', marginLeft: 31, marginTop: 5 }} >
                            Düzenle
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                        <TouchableOpacity onPress = {() => navigation.navigate('SingOut') } >
                            <View style={styles.IconRigth}>
                                <SimpleLine name='settings' color='gray' size={25} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: 'gray', marginRight: 31, marginTop: 5 }} >
                            Ayarlar
                        </Text>
                    </View>
                </View>
                <View style={styles.Body} >
                    <Image style={styles.ImageStyle} source={{ uri: userdata.pets.photoUrl }} />
                    <Text style={styles.Name} > {userdata.name} </Text>
                    <Text style={styles.Location} > {userdata.location} </Text>
                    <Text style={styles.Pets}>Petlerim</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                    <View style={styles.PetImage} >
                        <ImageBackground source = {{uri: userdata.pets.photoUrl }} style = {{height:80, width:80}} imageStyle = {{borderRadius:10}} >
                            <View style={{ alignItems: 'flex-end' }} >
                                <View style={styles.PicIcon} >
                                    <Icon name='pencil' size={20} color='white' />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <TouchableOpacity style={styles.Button} onPress = {() => navigation.navigate('AddPet') } >
                    <Text style={{ fontWeight: 'bold' }} >
                        PET EKLE
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Tab5;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    Header: {
        flexDirection: 'row',
        marginTop: 30
    },
    IconLeft: {
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
    Body: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageStyle: {
        height: 190,
        width: 190,
        borderRadius: 100,
        marginTop: -20
    },
    Name: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20,
        color: '#4A4A4A'
    },
    Location: {
        fontWeight: 'bold',
        marginTop: 5,
        color: '#4A4A4A'
    },
    Pets: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 25,
        color: '#4A4A4A'
    },
    PetImage: {
        height: 80,
        width: 80,
        backgroundColor: 'white',
        marginVertical: 20,
        borderRadius: 10,
        marginHorizontal: 10
    },
    Button: {
        backgroundColor: '#00B9B2',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        marginHorizontal: 31,
        borderRadius: 20,
        elevation: 5,
        marginTop: 15
    },
    PicIcon: {
        height: 20,
        width: 20,
        backgroundColor: '#4A4A4A',
        borderTopRightRadius: 10,
    }
})