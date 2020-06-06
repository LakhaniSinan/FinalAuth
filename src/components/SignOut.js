import React from 'react'
import {View,Text, TouchableOpacity} from 'react-native'
import firebase from 'firebase'

class SignOut extends React.Component{
    render()
    {
        return (
       
            <TouchableOpacity onPress={()=>firebase.auth().signOut()}>
                <Text style={{color:'white',fontSize:18}}>Sign Out</Text>
            </TouchableOpacity>
        ) 
    }
}

export default SignOut