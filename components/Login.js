import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert, ImageBackground, StatusBar} from 'react-native'

import { Icon, Container, Header, Left, Body, Right, Content, Button } from 'native-base'

// import MSSQL from 'react-native-mssql'; //connect to db

class Login extends Component {

    static navigationOptions = {
        header: null
    }

    constructor (props)
    {
        super(props);
        this.state = { 
            text: '',
            mess: ''
        };
    }

    eiei = () =>{
        const IMEI = require('react-native-imei');
        const { navigate } = this.props.navigation

        if(IMEI.getImei()!='357220076959124')
        {
            // Alert.alert("Test Login","Failed Login and you input -"+this.state.text+"-");
            navigate('MainMenu');
        }
        else
        {
            // Alert.alert("Test Login",IMEI.getImei());
            navigate('MainMenu');
        }
        // console.log("test")
    }

    user = () => {
        const IMEI = require('react-native-imei');

        if(IMEI.getImei()!='357220076959124')
        {
            this.state.mess = "You aren't Employee"
        }
        else
        {
            this.state.mess = "Messenger001"
        }
    }

    render() {

        const { navigate } = this.props.navigation

        this.user();

        return (

            <Container>

                <StatusBar backgroundColor="#b3f0ff"
                    barStyle="light-content" hidden = {false} />
                
                    <ImageBackground style={styles.container}
                    source={require('../assets/loader.jpg')}>
                        <View style={{ marginBottom:  20}}>
                            <Image source={require('../assets/dplus.jpg')} 
                                style={{ width: 160, height: 133 }}
                            />
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', color: 'white' }}>
                            {this.state.mess}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 50, justifyContent: 'center' }}>
                            <Image source={require('../assets/icon/lock.png')} 
                                    style={{ width: 32, height: 32 }}
                            />
                            <TextInput
                                style={{ height: 45,
                                    width: 200,
                                    padding: 10,
                                    backgroundColor: 'rgba(0,0,0,0)'
                                }}
                                keyboardType= 'default'
                                placeholder= 'Enter your password'
                                placeholderTextColor= "white"
                                secureTextEntry={true}
                                underlineColorAndroid= 'white'
                                onChangeText={(text) => this.setState({text})}
                            />
                        </View>

                        <View style={{ justifyContent: 'center', marginTop: 20}}>
                            <Button transparent
                                style={{ height: 20 }}
                                onPress={() => navigate('ForgetPassword')}
                            >
                                <Text style={{ color: 'white' }}>Forget Password</Text>
                            </Button>
                        </View>
                        <TouchableOpacity onPress={this.eiei.bind(this)}
                        style={{  marginTop: 20 }}>
                            <Button rounded
                                style={{ width: 200, backgroundColor: 'white', justifyContent: 'center' }}
                            >
                                <Text style={{ color: '#0086b3', fontWeight: 'bold'}}>Login</Text>
                            </Button>
                        </TouchableOpacity>
                    </ImageBackground>

                    
                
            </Container>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        flexDirection: 'column'
      }
})
