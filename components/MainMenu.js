import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native'

import { Icon, Container, Header, Left, Body, Right, Content, Button, Form, Item, Label, Input, Title } from 'native-base'

class MainMenu extends Component {

    static navigationOptions = {
        header: null
    }
  render() {
    return (

        <Container>
            <Header style={{ backgroundColor: '#66c2ff' }}>
                <Left />
                <Body style={{ flex: 1 }}>
                    <View style={{ marginLeft: 100 }}>
                        <Image source={require('../assets/dplus.jpg')}
                        style={{ width: 40, height: 40 }} />
                    </View>
                </Body>
                <Right />
            </Header>
            <Body>
                <View>
                    <Image source={require('../assets/dplus.jpg')}
                            style={{ width: 200, height: 200 }} />
                </View>
            </Body>
        </Container>
      
    )
  }
}

export default MainMenu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#66c2ff',
        flexDirection: 'column'
      }
})
