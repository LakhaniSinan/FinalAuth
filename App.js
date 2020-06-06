import {createStackNavigator} from 'react-navigation-stack'
import Home from './src/components/Home'
import History from './src/components/History'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {TouchableOpacity,Text} from 'react-native'
import React from 'react'
import LoginScreen from './src/components/LoginScreen'
import {Icon} from 'react-native-elements'
import Details from './src/components/Details'
import Responded from './src/components/Responded'
import firebase from 'firebase'
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoadingScreen from './src/components/LoadingScreen'
import SignOut from './src/components/SignOut'

const firebaseConfig = {
  apiKey: "AIzaSyCuh4hWyEABLxdxRveoMD290hgo69AWXV4",
  authDomain: "userapp-1569782530340.firebaseapp.com",
  databaseURL: "https://userapp-1569782530340.firebaseio.com",
  projectId: "userapp-1569782530340",
  storageBucket: "userapp-1569782530340.appspot.com",
  messagingSenderId: "470250628857",
  appId: "1:470250628857:web:9d6c71d7658a2f51d4e428",
  measurementId: "G-YSLVGW7TXJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AuthStack = createStackNavigator({
  Login:{screen:LoginScreen,
    navigationOptions:{
     title:'Please Login',
     headerTitleAlign:'center',
     headerTintColor: '#fff',
     headerTitleStyle: {
       fontWeight: 'bold',
       fontSize:22
     },
     headerStyle:{
         backgroundColor:'green'
     },
        
    } 
   }
})
const HomeStack = createStackNavigator({


Home:{screen:Home,
    navigationOptions:(props)=>{

        return {
          title:'Home',
          headerTitleAlign:'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:22
          },
          headerStyle:{
              backgroundColor:'green'
          },
         headerLeft:()=><Icon name="menu"
        size={24}
        color='white'
        onPress={()=>props.navigation.toggleDrawer()}/>,
        headerRight:()=><SignOut/>
     
    }
 }
},
Details:{screen:Details,
navigationOptions:{
          title:'Details',
          headerTitleAlign:'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:22
          },
          headerStyle:{
              backgroundColor:'green'
          },
}},
Responded:{screen:Responded,
  navigationOptions:{
            title:'Responded',
            headerTitleAlign:'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:22
            },
            headerStyle:{
                backgroundColor:'green'
            },
  }}
})

const HistoryStack = createStackNavigator({
History:{screen:History,
  navigationOptions:(props)=>{
     
      return {
        title:'History',
        headerTitleAlign:'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize:22
        },
        headerStyle:{
            backgroundColor:'green'
        },
       headerLeft:()=><Icon name="menu"
      size={24}
      color='white'
     onPress={()=>props.navigation.toggleDrawer()}/>,
   
  }
}
}

})






const AppStack=createDrawerNavigator({
    Home:{screen:HomeStack,
      navigationOptions:{
        drawerIcon:({tintColor}) => (
       <Icon
         name="home"
         type='font-awesome'
         size={24}
    
       color={tintColor} />
       )
        
          }
      },
      History:{screen:HistoryStack,
        navigationOptions:{
          drawerIcon:({tintColor}) => (
         <Icon
           name="home"
           type='font-awesome'
           size={24}
      
         color={tintColor} />
         )
          
            }
        },
})




export default createAppContainer(
  createSwitchNavigator({
    Loading:LoadingScreen,
    App:AppStack,
    Auth:AuthStack
  })
)