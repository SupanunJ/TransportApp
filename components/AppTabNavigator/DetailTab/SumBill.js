import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'

import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer, Input, Item, Grid, Col } from 'native-base';

class SumBill extends Component {

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
                        <Title>สรุปยอดเงิน</Title>
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
                <Footer style={{ 
                    backgroundColor: '#66c2ff',
                    justifyContent:'center', 
                    alignItems: 'center'
                    }}>
                    <View style={{ justifyContent:'center', alignItems: 'center' }}>
                        <Button warning 
                        onPress={() => navigate('DetailBill')} 
                         style={{ 
                            width: 200, 
                            height: '80%', 
                            justifyContent:'center', 
                            alignItems: 'center' }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>รายละเอียดยอดเงิน</Text>
                        </Button>
                    </View>
                </Footer>
            </Container>

        )

    }
}

export default SumBill;


