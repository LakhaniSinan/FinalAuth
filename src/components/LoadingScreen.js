import React, { Component } from 'react';
import {

  ActivityIndicator,View,Text
}
from 'react-native';
import firebase from 'firebase'


export default class LoadingScreen extends React.Component{
    componentDidMount(){
         firebase.auth().onAuthStateChanged(user=>{
             this.props.navigation.navigate(user ? "App" : "Auth")
         })
    }

    render()
    {
        console.log('in loading',this.props);
        
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Loading.... </Text>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}