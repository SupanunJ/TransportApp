import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'

import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer, Input, Item, Grid, Col } from 'native-base';

class DetailWork extends Component {

    static navigationOptions = {
        header: null
    }
  render() {

    const { navigate } = this.props.navigation

    return (

            <Container>
                <Header style={{ backgroundColor: '#66c2ff' }}>
                    <Left>
                        <Button transparent
                            onPress={() => navigate('Search')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>รายละเอียด</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>

                    <View style={{ margin: 10 }}>
                        <Text>รหัสบิล : </Text>
                        <Text>ห้าง : </Text>
                    </View>

                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>

                        <Text>ชื่อ</Text>
                        <Text>จำนวน</Text>
                        <Text>ราคา</Text>

                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>GOAS101-APIPH8P</Text>
                        </View>
                        <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>1</Text>
                        </View>
                        <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>60</Text>
                        </View>

                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>หมายเหตุ : </Text>
                       
                    </View>

                </Content>

                <Footer style={{ height: 200 }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <TouchableOpacity onPress={() => navigate('EditItem')} >
                            <View style={{ width: 180, height: 100, backgroundColor: '#FFBC66' }} >
                                <Image source={require('../../../assets/icon/phone-receiver.png')}
                                    style={{ width: 70, height: 70 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>โทรหาลูกค้า</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('TabPage')} >
                            <View style={{ width: 180, height: 100, backgroundColor: '#FFFD66' }} >
                                <Image source={require('../../../assets/icon/clam.png')}
                                    style={{ width: 70, height: 70 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>แก้ไขรายการ</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <TouchableOpacity onPress={() => navigate('TabPage')} >
                            <View style={{ width: 180, height: 100, backgroundColor: '#FFA566' }} >
                                <Image source={require('../../../assets/icon/car.png')}
                                    style={{ width: 70, height: 70 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>นำทาง</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('TabPage')} >
                            <View style={{ width: 180, height: 100, backgroundColor: '#66FFB3' }} >
                                <Image source={require('../../../assets/icon/check.png')}
                                    style={{ width: 70, height: 70 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>ส่งงาน</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Footer>
            </Container>

        )

    }
}

export default DetailWork;


