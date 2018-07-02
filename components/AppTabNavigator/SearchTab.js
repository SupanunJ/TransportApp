import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { Icon, Container, Header, Left, Body, Title, Right, Tab, Tabs, TabHeading, Button, Separator, ListItem, Content, Badge } from 'native-base';

import SuccessWorkTab from './WorkTab/SuccessWorkTab';
import UnsuccessWorkTab from './WorkTab/UnsuccessWorkTab';


class SearchTab extends Component {


  static navigationOptions = {}

  render() {

    const { navigate } = this.props.navigation

    return (

      <Container>
        <Header style={{ backgroundColor: '#66c2ff' }}>
          <Left>
            <Button transparent
              onPress={() => { this.props.screenProps.rootNavigation.navigate("MainMenu") }}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>ส่งงาน</Title>
          </Body>
          <Right />
        </Header>

        <Tabs>
          <Tab heading={<TabHeading style={{ backgroundColor: '#66c2ff' }}><Icon name="md-cart" /><Text style={{ color: 'white' }}>  รายการส่ง</Text></TabHeading>}>
            <Content>
              <Separator bordered>
                <Text>ห้างเดอะมอลล์ท่าพระ</Text>
              </Separator>
              <ListItem>
                <View>
                  <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                    <Text style={styles.storeLabel}>ABCD001</Text>
                    <Text style={{ paddingHorizontal: 5 }}>คุณA</Text>
                    <Text>/</Text>
                    <Text style={{ paddingHorizontal: 5 }}>ร้านAAA</Text>
                  </View>
                </View>
                <View style={{ position: 'absolute', right: 0 }}>
                  <Button transparent
                    onPress={() => navigate('DetailWork')}>
                    <Icon name='ios-arrow-dropright' />
                  </Button>
                </View>
              </ListItem>
              <Separator bordered>
                <Text>ห้างเดอะมอลล์ลาดพร้าว</Text>
              </Separator>
              <ListItem>
                <View>
                  <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                    <Text style={styles.storeLabel}>ABCD001</Text>
                    <Text style={{ paddingHorizontal: 5 }}>คุณD</Text>
                    <Text>/</Text>
                    <Text style={{ paddingHorizontal: 5 }}>ร้านDDD</Text>
                  </View>
                </View>
                <View style={{ position: 'absolute', right: 0 }}>
                  <Button transparent
                    onPress={() => navigate('DetailWork')}>
                    <Icon name='ios-arrow-dropright' />
                  </Button>
                </View>
              </ListItem>
            </Content>


          </Tab>
          <Tab heading={<TabHeading style={{ backgroundColor: '#66c2ff' }}><Icon name="md-checkbox-outline" /><Text style={{ color: 'white' }}>  ส่งสำเร็จ</Text></TabHeading>}>
            <Content>
              <ListItem>
                <View>
                  <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                    <Text style={styles.storeLabel}>ABCD001</Text>
                    <Text style={{ paddingHorizontal: 5 }}>คุณC</Text>
                    <Text>/</Text>
                    <Text style={{ paddingHorizontal: 5 }}>ร้านCCC</Text>
                  </View>
                </View>
                <View style={{ position: 'absolute', right: 0 }}>
                  <Badge success>
                    <Text>ส่งสำเร็จ</Text>
                  </Badge>
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                    <Text style={styles.storeLabel}>ABCD001</Text>
                    <Text style={{ paddingHorizontal: 5 }}>คุณB</Text>
                    <Text>/</Text>
                    <Text style={{ paddingHorizontal: 5 }}>ร้านBBB</Text>
                  </View>
                </View>
                <View style={{ position: 'absolute', right: 0 }}>
                  <Badge warning>
                    <Text>ส่งสำเร็จมีการแก้ไข</Text>
                  </Badge>
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                    <Text style={styles.storeLabel}>ABCD001</Text>
                    <Text style={{ paddingHorizontal: 5 }}>คุณB</Text>
                    <Text>/</Text>
                    <Text style={{ paddingHorizontal: 5 }}>ร้านBBB</Text>
                  </View>
                </View>
                <View style={{ position: 'absolute', right: 0 }}>
                  <Badge >
                    <Text>ส่งสำเร็จไม่สำเร็จ</Text>
                  </Badge>
                </View>
              </ListItem>
            </Content>
          </Tab>
        </Tabs>

      </Container>
    );
  }


}
export default SearchTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  storeLabel: {
    fontSize: 18,
    color: 'black'
  },
  detailContent: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center'
  }
})