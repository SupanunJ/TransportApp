import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { Icon, Container, Header, Left, Body, Title, Right, Tab, Tabs, TabHeading, Button, Separator, ListItem, Content, Badge, Accordion } from 'native-base';
import { gql, withApollo, compose } from 'react-apollo'

// import SuccessWorkTab from './WorkTab/SuccessWorkTab';
// import UnsuccessWorkTab from './WorkTab/UnsuccessWorkTab';


class SearchTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showWork: [],
      showZone: [],
      show_SUC: [],
    }
    // this.props.client.resetStore();
    this.queryZONE();
    this.worksub();
    this.sucesswork();
  }

  worksub = () => {
    console.log('worksub')

    this.props.client.query({
      query: worksub,
      variables: {
        "MessengerID": global.NameOfMess
      }
    }).then((result) => {
      console.log(result.data.worksub)
      this.setState({
        showWork: result.data.worksub
      })
    }).catch((err) => {
      console.log(err)
    });
  }

  queryZONE = () => {
    console.log("queryZone")

    this.props.client.query({
      query: queryZONE,
      variables: {
        "MessengerID": global.NameOfMess
      }
    }).then((result) => {
      console.log(result.data.queryZONE)
      this.setState({
        showZone: result.data.queryZONE
      })
    }).catch((err) => {
      console.log(err)
    });
  }

  sucesswork = () => {
    console.log("sucesswork")

    this.props.client.query({
      query: sucesswork,
      variables: {
        "MessengerID": global.NameOfMess
      }
    }).then((result) => {
      console.log(result.data.sucesswork)
      this.setState({
        show_SUC: result.data.sucesswork
      })
    }).catch((err) => {
      console.log(err)
    });
  }

  _renderHeader(expanded) {
    return (
      <View
        style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: "#A9DAD6" }}
      >
        <Text style={{ fontWeight: "600" }}>
          {" "}{}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }

  render() {

    const { navigate } = this.props.navigation

    return (

      <Container>
        <Header style={{ backgroundColor: '#66c2ff' }}>
          <Left>
            <Button transparent
              onPress={() => { this.props.client.resetStore(); navigate("MainMenu") }}>
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
            <Content padder>
              <View>
                {
                  this.state.showZone.map(val => (
                    <Accordion
                      dataArray={[{ test: "test" }]}
                      renderHeader={(expanded) => (
                        <View
                          style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: "#E2E2E1" }}
                        >
                          <Text style={{ fontWeight: "600" }}>
                            {"  "}{val.Zone}
                          </Text>
                          {expanded
                            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                            : <Icon style={{ fontSize: 18 }} name="add-circle" />}
                        </View>
                      )}
                      renderContent={() => this.state.showWork.map(l => {
                        if (l.Zone == val.Zone) {
                          return (
                            <View style={styles.detailContent}>
                              <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                                <Text style={styles.storeLabel}>{l.invoiceNumber}</Text>
                                <Text style={{ paddingHorizontal: 5 }}>{l.DELIVERYNAME}</Text>
                              </View>
                              <View style={{ position: 'absolute', right: 10 }}>
                                <Button transparent
                                  onPress={() => navigate('DetailWork', { id: l.invoiceNumber })}>
                                  <Icon name='ios-arrow-forward' />
                                </Button>
                              </View>
                            </View>
                          )
                        }
                      })}
                    />
                  ))
                }
              </View>
            </Content>
          </Tab>

          <Tab heading={<TabHeading style={{ backgroundColor: '#66c2ff' }}><Icon name="md-checkbox-outline" /><Text style={{ color: 'white' }}>  ส่งสำเร็จ</Text></TabHeading>}>
            <Content>
              {
                this.state.show_SUC.map(k => (
                  <ListItem>
                    <View>
                      <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                        <Text style={styles.storeLabel}>{k.invoiceNumber}</Text>
                        <Text style={{ paddingHorizontal: 5 }}>{k.DELIVERYNAME}</Text>
                      </View>
                    </View>
                    <View style={{ position: 'absolute', right: 0 }}>
                      {
                        (() => {
                          if (k.status == "A1") {
                            return (

                              <Badge success>
                                <Text>ส่งสำเร็จ</Text>
                              </Badge>

                            )
                          } else if (k.status == "A2") {
                            return (
                              <View style={{ position: 'absolute', right: 0 }}>
                                <Badge warning>
                                  <Text>ส่งสำเร็จมีการแก้ไข</Text>
                                </Badge>
                              </View>

                            )
                          } else {
                            return (
                              <View style={{ position: 'absolute', right: 0 }}>
                                <Badge >
                                  <Text>ส่งไม่สำเร็จ</Text>
                                </Badge>
                              </View>

                            )
                          }
                        })()
                      }
                      {/* <Badge success>
                        <Text>ส่งสำเร็จ</Text>
                      </Badge> */}
                    </View>
                  </ListItem>
                ))
              }
              {/* <ListItem>
                <View>
                  <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                    <Text style={styles.storeLabel}>ABCD001</Text>
                    <Text style={{ paddingHorizontal: 5 }}>ร้านCCC</Text>
                  </View>
                </View>
                <View style={{ position: 'absolute', right: 0 }}>
                  <Badge success>
                    <Text>ส่งสำเร็จ</Text>
                  </Badge>
                </View>
              </ListItem> */}
              {/* <ListItem>
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
                    <Text>ส่งไม่สำเร็จ</Text>
                  </Badge>
                </View>
              </ListItem> */}
            </Content>
          </Tab>
        </Tabs>

      </Container>
    );
  }


}

const GraphQL = compose(SearchTab)
export default withApollo(GraphQL)


const worksub = gql`
    query worksub($MessengerID:String!){
      worksub(MessengerID: $MessengerID){
            invoiceNumber
            customerName
            DELIVERYNAME
            Zone
        }
    }
`

const queryZONE = gql`
  query queryZONE($MessengerID:String!){
    queryZONE(MessengerID: $MessengerID){
          Zone
      }
  }
`

const sucesswork = gql`
  query sucesswork($MessengerID:String!){
    sucesswork(MessengerID: $MessengerID){
          invoiceNumber
          status
          DELIVERYNAME
      }
  }
`


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