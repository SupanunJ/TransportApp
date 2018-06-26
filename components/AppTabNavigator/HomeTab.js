import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar } from 'react-native'

import { Icon, Container, Header, Left, Body, Title, Right } from 'native-base';
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
                <Left/>
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
        alignItems: "center",
        justifyContent: "center"
    },
    tabBarLabel: {
        fontSize: 1,
    }
})
