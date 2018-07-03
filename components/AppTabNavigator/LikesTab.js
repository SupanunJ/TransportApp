import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import {Icon,Container,Header,Left,Body,Title,Right,Button} from 'native-base';

class LikesTab extends Component {
    
    static navigationOptions = {
        tabBarLabel: "ประวัติ",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-folder-open" style={{ color:
            tintColor }} />
        )
    }
  render() {
    const { navigate } = this.props.navigation
    return (
        
        <Container>
        <Header >
        <Left>
        <Button transparent
        onPress={() => {navigate("MainMenu")}}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
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
