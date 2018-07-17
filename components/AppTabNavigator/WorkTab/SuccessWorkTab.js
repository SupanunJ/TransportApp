import React, { Component } from 'react';
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView } from 'react-native'
import { Container, Icon, Content, Button, ListItem, Separator, Accordion } from 'native-base';


class SuccessWorkTab extends Component {

  render() {

    const { navigate } = this.props.navigation

    return (
      <Container>
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
      </Container>
    );
  }
}
export default SuccessWorkTab
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
