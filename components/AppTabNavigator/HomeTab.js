import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView } from 'react-native'

import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer } from 'native-base';
console.disableYellowBox = true;

class HomeTab extends Component {


    static navigationOptions = {}
    
    render() {

        const { navigate } = this.props.navigation

        return (

            <Container>
                <Header style={{ backgroundColor: '#66c2ff' }}>
                    <Left>
                    <Button transparent
                    onPress={() => {this.props.screenProps.rootNavigation.navigate("MainMenu")}}>
                        <Icon name='arrow-back' />
                    </Button>
                    </Left>
                    <Body>
                        <Title>ตรวจงาน</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>


                        <View style={styles.detailContent}>
                            <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                                <Text style={styles.storeLabel}>ABCD001</Text>
                                <Text style={{ paddingHorizontal: 5 }}>คุณA</Text>
                                <Text>/</Text>
                                <Text style={{ paddingHorizontal: 5 }}>ร้านAAA</Text>
                            </View>
                            <View style={{ position: 'absolute', right: 0 }}>
                                <Button transparent
                                    onPress={() => navigate('CheckWork')}>
                                    <Icon name='ios-arrow-dropright' />
                                </Button>
                            </View>
                        </View>

                </Content>
                <Footer style={{ 
                    backgroundColor: '#66c2ff',
                    justifyContent:'center', 
                    alignItems: 'center'
                    }}>
                    <View style={{ justifyContent:'center', alignItems: 'center' }}>
                        <Button success style={{ 
                            width: 200, 
                            height: '80%', 
                            justifyContent:'center', 
                            alignItems: 'center' }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>CONFIRM</Text>
                        </Button>
                    </View>
                </Footer>
            </Container>
            
        );
    }


}
export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    storeLabel: {
        fontSize: 18,
        color: 'black'
    },
    detailContent: {
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50, 
        justifyContent:'center'
    }
})
