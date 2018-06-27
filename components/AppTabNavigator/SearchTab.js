import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {Icon,Container,Header,Left,Body,Title,Right, Tab, Tabs, TabHeading} from 'native-base';

import SuccessWorkTab from './WorkTab/SuccessWorkTab';
import UnsuccessWorkTab from './WorkTab/UnsuccessWorkTab';


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
        <Header >
            <Left/>
           
            <Body>
              <Title>ส่งงาน</Title>
            </Body>
            <Right />
          </Header>
         
        <Tabs >
          <Tab heading={ <TabHeading><Icon name="md-cart" /><Text>  รายการส่ง</Text></TabHeading>}>
            <SuccessWorkTab/>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-checkbox-outline" /><Text>  ส่งสำเร็จ</Text></TabHeading>}>
         <UnsuccessWorkTab/>
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
        alignItems: "center",
        justifyContent: "center"
    },
})
