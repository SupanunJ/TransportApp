import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator,Accordion } from 'native-base';
 class SuccessWorkTab extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Accordion >
            <Text>FORWARD</Text>
          </Accordion>
          <ListItem >
            <Text>Aaron Bennet</Text>
          </ListItem>
          <ListItem>
            <Text>Claire Barclay</Text>
          </ListItem>
          <ListItem last>
            <Text>Kelso Brittany</Text>
          </ListItem>
          <Separator bordered>
            <Text>MIDFIELD</Text>
          </Separator>
          <ListItem>
            <Text>Caroline Aaron</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
export default SuccessWorkTab