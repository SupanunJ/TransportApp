import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import {Icon,Container,Header,Left,Body,Title,Right,Button} from 'native-base';

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
        <Left>
        <Button transparent
        onPress={() => {this.props.screenProps.rootNavigation.navigate("MainMenu")}}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
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
