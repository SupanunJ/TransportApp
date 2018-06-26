import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import {Icon,Container,Header,Left,Body,Title,Right} from 'native-base';

class ProfileTab extends Component {
    
    static navigationOptions = {
        tabBarLabel: "ข่าว",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-list-box" style={{ color:
            tintColor }} />
        )
    }
  render() {
    return (
        
        <Container>
       <Header >
            <Left/>
            <Body>
              <Title>ข่าวสาร</Title>
            </Body>
            <Right />
          </Header>
        </Container>
    );
  }

  
}
export default ProfileTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    
})
