import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesing from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Tab1 from '../TabNavigation/Tab1';
import Tab2 from '../TabNavigation/Tab2';
import Tab3 from '../TabNavigation/Tab3';
import Tab4 from '../TabNavigation/Tab4';
import Tab5 from '../TabNavigation/Tab5';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return(
           <Tab.Navigator tabBarOptions = {{activeTintColor : '#F27059',inactiveTintColor : '#4A4A4A', style : {borderTopRightRadius:20,borderTopLeftRadius:20} }} backBehavior = 'none' >
               <Tab.Screen name = 'Tab1' component = {Tab1} options = {{
                   tabBarIcon:({color}) => <Icon name = 'heart' size = {25} color = {color} style = {{marginTop:15}} />,
                   title : '',
               }} />
               <Tab.Screen name = 'Tab2' component = {Tab2} options = {{
                   tabBarIcon:({color}) => <SimpleLineIcons name = 'bubbles' size = {25} color = {color} style = {{marginTop:15}} />,
                   title:''
               }} />
               <Tab.Screen name = 'Tab3' component = {Tab3} options = {{
                   tabBarIcon:({color}) => <FontAwesome name = 'bone' size = {25} color = {color} style = {{marginTop:15}} />,
                   title:''
               }} />
               <Tab.Screen name = 'Tab4' component = {Tab4} options = {{
                   tabBarIcon:({color}) => <AntDesing name = 'calendar' size = {25} color = {color} style = {{marginTop:15}} />,
                   title:''
               }} />
               <Tab.Screen name = 'Tab5' component = {Tab5} options = {{
                   tabBarIcon:({color}) => <Icon name = 'user' size = {25} color = {color} style = {{marginTop:15}} />,
                   title:''
               }} />
           </Tab.Navigator>
    )
}

export default BottomTabNavigator;