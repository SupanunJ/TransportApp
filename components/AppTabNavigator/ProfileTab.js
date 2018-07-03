import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import {Icon,Container,Header,Left,Body,Title,Right,Button} from 'native-base';

class ProfileTab extends Component {
    
    static navigationOptions = {
        tabBarLabel: "ข่าว",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-list-box" style={{ color:
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
