import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView } from 'react-native'

import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer,Separator ,ListItem} from 'native-base';

class DetailBill extends Component {

    render() {

        const { navigate } = this.props.navigation

        return (
            
            <Container style={{ backgroundColor: 'white'}}>
                <Header style={{ backgroundColor: '#66c2ff' }}>
                    <Left>
                        <Button transparent
                            onPress={() => navigate('SumBill')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>รายละเอียดยอดเงิน</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
              <Separator bordered>
                <Text style={styles.storeLabel}>ABCD001</Text>
              </Separator>

              <ListItem  style={{   backgroundColor: 'white', borderColor: 'white', paddingLeft: 0}} >
             
              <View>
                  <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                  <Text style={{ paddingHorizontal:5 }}></Text>
                    <Text style={{ paddingHorizontal:5 }}>ฟิล์มกระจก</Text>
                    <Text style={{ paddingHorizontal:30 }}></Text>
                    <Text style={{ paddingHorizontal:5 }}>20</Text>
            
                    <Text style={{ paddingHorizontal: 5 }}>ชิ้น</Text>
                  </View>
                </View>
                <View style={{ position: 'absolute', right: 5 , flexDirection: 'row' }}>
                  
                    <Text style={{ paddingHorizontal: 5 }}>2500</Text>
                    <Text style={{ paddingHorizontal: 5 }}>บาท</Text>
                
                </View>
              </ListItem>
              
              <Separator bordered>
                <Text style={styles.storeLabel}>ABCD002</Text>
              </Separator>
              <ListItem>
                <View>
                  <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                  <Text style={{ paddingHorizontal:5 }}></Text>
                    <Text style={{ paddingHorizontal:5 }}>ฟิล์มกระจก</Text>
                    <Text style={{ paddingHorizontal:30 }}></Text>
                    <Text style={{ paddingHorizontal:5 }}>20</Text>
            
                    <Text style={{ paddingHorizontal: 5 }}>ชิ้น</Text>
                  </View>
                </View>
                <View style={{ position: 'absolute', right: 0 , flexDirection: 'row' }}>
                  
                    <Text style={{ paddingHorizontal: 5 }}>2500</Text>
                    <Text style={{ paddingHorizontal: 5 }}>บาท</Text>
                
                </View>
              </ListItem>
            </Content>

              
            </Container>

        )

    }
}


export default DetailBill;

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