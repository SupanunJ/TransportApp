import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
class UnsuccessWorkTab extends Component {
  render() {
    var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren',
    'Mama Sakho','Emre Can','Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];
    return (
      <Container>
        <Content>
          <List dataArray={items}
            renderRow={(item) =>
              <ListItem>
                <Text>{item}</Text>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}
export default UnsuccessWorkTab
