import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert, StatusBar} from 'react-native'
import { TabRouter, addNavigationHelpers, createNavigator, NavigationActions } from 'react-navigation'
import { Icon, Container, Header, Left, Body, Right, Content, Button, Form, Item, Label, Input, Title } from 'native-base'

class MainMenu extends Component {

    static navigationOptions = {
        header: null
    }
  render() {

    const { navigate } = this.props.navigation

    return (

        <Container style={{ backgroundColor: 'white' }}>
            <Header style={{ backgroundColor: '#66c2ff' }}>
                <View style={{justifyContent: 'center'}}>
                    <Image source={require('../assets/dplus.jpg')}
                    style={{ width: 40, height: 40 }} />
                </View>
            </Header>
            <Body>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 20 }}>
                    <TouchableOpacity onPress={() => { navigate('HomeTab')}} 
                    style={{ paddingHorizontal: 10 }}>
                        <View style={{ width: 150, height: 150, backgroundColor: '#0099CC',
                         justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../assets/icon/check.png')}
                                style={{ width: 100, height: 100}} />
                            <Text style={{ fontWeight: 'bold', marginTop: 5 }}>ตรวจงาน</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('SearchTab')}
                    style={{ paddingHorizontal: 10 }}>
                        <View style={{ width: 150, height: 150, backgroundColor: '#CCFFCC',
                        justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../assets/icon/car.png')}
                                style={{ width: 100, height: 100}} />
                            <Text style={{ fontWeight: 'bold', marginTop: 5 }}>ส่งงาน</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10 }}>
                    <TouchableOpacity onPress={() => navigate('AddMediaTab')} 
                    style={{ paddingHorizontal: 10 }}>
                        <View style={{ width: 100, height: 100, backgroundColor: '#CCFFCC',
                        justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../assets/icon/clam.png')}
                                style={{ width: 65, height: 65}} />
                            <Text style={{ fontWeight: 'bold', marginTop: 2 }}>เคลม</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('LikesTab')}
                    style={{ paddingHorizontal: 10 }}>
                        <View style={{ width: 100, height: 100, backgroundColor: '#66CCFF',
                        justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../assets/icon/folder.png')}
                                style={{ width: 65, height: 65}} />
                            <Text style={{ fontWeight: 'bold', marginTop: 2 }}>ประวัติ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('ProfileTab')}
                    style={{ paddingHorizontal: 10 }}>
                        <View style={{ width: 100, height: 100, backgroundColor: '#0099CC',
                        justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../assets/icon/newspaper.png')}
                                style={{ width: 65, height: 65}} />
                            <Text style={{ fontWeight: 'bold', marginTop: 2 }}>ข่าวสาร</Text>
                        </View>
                    </TouchableOpacity>
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
