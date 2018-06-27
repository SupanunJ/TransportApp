import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar } from 'react-native'

import { Icon, Container, Header, Content, Card, CardItem, Left, Body, Title, Right, View, Button, Row } from 'native-base';


console.disableYellowBox = true;

class HomeTab extends Component {

    static navigationOptions = {
        tabBarLabel: "ตรวจ",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-create" style={{
                color:
                    tintColor
            }} />
        )


    }
    render() {
        return (

            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>ตรวจงาน</Title>
                    </Body>
                </Header>
                
            </Container>


        );
    }


}
export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    tabBarLabel: {
        fontSize: 1,
    },
    buttonContainer: {
        margin: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
