import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView } from 'react-native'

import { Icon, Container, Header, Left, Body, Title, Right, Button,Content ,Footer ,Item,Input} from 'native-base';

class ProfileTab extends Component {

  static navigationOptions = {
    tabBarLabel: "ข่าว",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list-box" style={{
        color:
          tintColor
      }} />
    )
  }
  render() {
    return (

      <Container>
        <Header >
          <Left>
            <Button transparent
              onPress={() => { this.props.screenProps.rootNavigation.navigate("MainMenu") }}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>ข่าวสาร</Title>
          </Body>
          <Right />
        </Header>
        <Content>

          <View style={{ margin: 10 }}>
            <Text>รหัสบิล : </Text>
          </View>

          <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>

            <Text>ชื่อ</Text>
            <Text>จำนวน</Text>
            <Text>จำนวน</Text>
            <Text>ราคา</Text>

          </View>

          <View style={{ flexDirection: 'row' }}>

            <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
              <Text>GOAS101-APIPH8P</Text>
            </View>
            <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
              <Text>1</Text>
            </View>
            <Item regular>
            <Input placeholder='Regular Textbox' />
          </Item>
            <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
              <Text>60</Text>
            </View>

          </View>

        </Content>

        <Footer style={{
          backgroundColor: '#66c2ff',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button success style={{
              width: 200,
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>ยืนยันการแก้ไข</Text>
            </Button>
          </View>
        </Footer>
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
