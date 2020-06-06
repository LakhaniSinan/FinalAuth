import React from 'react'
import { View, Text, Image, Alert, ToastAndroid, ScrollView } from 'react-native'
import { Button, Card } from 'react-native-elements'
import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NodePlayerView } from 'react-native-nodemediaclient';



class Details extends React.Component {

    constructor() {
        super()
        this.state = {
            done: 1, uid: '',
            responders: [],
            ip: '',
            IP:""
        }
     }
      componentDidMount() {
          //console.log(firebase.auth().currentUser)

          console.log("i am here")

          firebase.database().ref().on("value", (snapshot) => {
              this.setState({ responders: snapshot.val().responses })
              console.log(snapshot.val().responses, "response generated");
          })

          this.setState({ uid: firebase.auth().currentUser.uid })
      }

     componentDidUpdate() {
          setTimeout(() => {
              //console.log(this.state.ip,"oooooooooooooooooooooooooooooooooooooooooooooooooooooo")

              firebase.database().ref().on("value", (snapshot) => {
                  
                this.setState({ responders: snapshot.val().responses })
                  //console.log(snapshot.val().responses, "response generated");
              })
              this.setState({ uid: firebase.auth().currentUser.uid })

          }, 5000)

     }

    alertDone = (name, type, longitude, latitude, id,IP) => {
        var date = new Date().getDate()
        var month = new Date().getMonth() + 1
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        if (this.state.done === 1) {
            ToastAndroid.showWithGravity(
                'You Have Responsed To Alert.!!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                this.setState({ done: 2 }, () => console.log(this.state)),
            )

            firebase.database().ref(`/responses/${id}/${this.state.uid}`)
                .push({ name, type, date, month, hours, sec, min, longitude, latitude,IP })
            this.props.navigation.navigate('Responded', { id: id })
        }
        else if (this.state.done === 2 && firebase.auth().currentUser.uid != this.state.uid) {
            ToastAndroid.showWithGravity(
                `Already Responded,Connect With Nearest Cop,You are number ${this.state.done}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                this.setState({ done: 2 }, () => console.log(this.state)),
            )
        }
        else {
            ToastAndroid.showWithGravity(
                `You Have Already Responded`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                this.props.navigation.navigate('Responded', { id: id })
            )
        }

    }

    checkImage(image) {
        if (image) {
            //console.log('in if')
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <Image
                        style={{ height: 400, width: 350 }}
                        source={{ uri: `data:image/png;base64,${image}` }} />
                </View>
            )
        }
        else {
            //console.log('in else')
            return <View><Text style={{ marginLeft: 25, fontSize: 20 }}> No Image Received</Text></View>
        }
    }

    render() {
        const { name, type, image, longitude, latitude, id } = this.props.navigation.state.params;

        const driver = Object.keys(this.state.responders).map((key) => this.state.responders[key]);

        driver.map((index1) => {
            const index_1 = Object.keys(index1).map((key) => index1[key]);
            // console.log("Itteration 1")
            index_1.map((index2) => {
                //   console.log("Itteration 2")
                const index_2 = Object.keys(index2).map((key) => index2[key]);
                index_2.map(index3 => {
                    setTimeout(() => {
                        this.setState({ ip: index3.IP })
                        console.log(this.state.ip)

                    }, 4000)
                })
            })

        })
        return (
            <ScrollView>
                <Text style={{ fontSize: 20, padding: 0, margin: 0 }}> Image Received From Sender </Text>
                {this.checkImage(image)}
                <Text style={{ fontSize: 20, padding: 0, margin: 0 }}>Area</Text>
                <Text style={{ marginLeft: 25, fontSize: 20 }}>{name}</Text>

                <Text style={{ fontSize: 20, padding: 0, margin: 0 }}>Type</Text>
                <Text style={{ marginLeft: 25, fontSize: 20 }}>{type}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                    {/* <Image source ={require('../../image/image.jpg')}  style={{width:500,height:250}}/> */}
                    
                    <NodePlayerView

                        style={{ height: 310, width: 1000 }}
                        ref={(vp) => { this.vp = vp }}
                        inputUrl={this.state.ip}
                        scaleMode={"ScaleAspectFit"}
                        bufferTime={300}
                        maxBufferTime={1000}
                        Muted
                        autoplay={true}
                    />
                    {/* <Image source ={require('../../image/image1.jpg')} 
      style={{width:500,height:250}}/> */}
                </View>
                <TouchableOpacity>
                    <Button
                        type="solid"
                        title="Respond"
                        buttonStyle={{ marginTop: 50, borderRadius: 20, width: 300, marginLeft: 300 }}
                        onPress={this.alertDone.bind(this, name, type, longitude, latitude, id,this.state.IP)}
                    />
                </TouchableOpacity>
            </ScrollView>

        )
    }
}

export default Details