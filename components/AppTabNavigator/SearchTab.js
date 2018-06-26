import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import {Icon,Container,Header,Left,Body,Title,Right} from 'native-base';

class SearchTab extends Component {
    
    static navigationOptions = {
        tabBarLabel: "ส่งงาน",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-car" style={{ color:
            tintColor }} />
        )
    }
  render() {
    return (
        
        <Container>
        <Header>
            <Left/>
            <Body>
              <Title>ส่งงาน</Title>
            </Body>
            <Right />
          </Header>
        </Container>
    );
  }

  
}
export default SearchTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
})
