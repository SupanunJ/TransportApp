import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import {Icon,Container,Header,Left,Body,Title,Right} from 'native-base';

class LikesTab extends Component {
    
    static navigationOptions = {
        tabBarLabel: "ประวัติ",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-folder-open" style={{ color:
            tintColor }} />
        )
    }
  render() {
    return (
        
        <Container>
        <Header >
            <Left/>
            <Body>
              <Title>ประวัติ</Title>
            </Body>
            <Right />
          </Header>
        </Container>
    );
  }

  
}
export default LikesTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
})
