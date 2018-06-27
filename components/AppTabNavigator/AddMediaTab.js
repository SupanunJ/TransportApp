import React, { Component } from 'react'
import { Text, StyleSheet ,StatusBar} from 'react-native'

import {Icon,Header,Container,Left,Body,Title,Right,Button} from 'native-base';

class AddMediaTab extends Component {

    static navigationOptions = {
        tabBarLabel: "่เครม",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-construct" style={{ color:
            tintColor  }} />
            
        ),
        
    }
  render() {
    const { navigate } = this.props.navigation
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
