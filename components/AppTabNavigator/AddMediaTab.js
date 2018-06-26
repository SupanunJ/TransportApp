import React, { Component } from 'react'
import { Text, StyleSheet ,StatusBar} from 'react-native'

import {Icon,Header,Container,Left,Body,Title,Right} from 'native-base';

class AddMediaTab extends Component {

    static navigationOptions = {
        tabBarLabel: "่เครม",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-construct" style={{ color:
            tintColor  }} />
            
        )
    }
  render() {
    return (
      <Container>
       <Header>
          <Left/>
          <Body>
            <Title>เครม</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }

  
}
export default AddMediaTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
})
