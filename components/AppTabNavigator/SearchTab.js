import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, RefreshControl, CheckBox, Alert } from 'react-native'
import { Icon, Container, Header, Left, Body, Title, Right, Tab, Tabs, TabHeading, Button, Separator, ListItem, Content, Badge, Accordion, Footer, ActionSheet } from 'native-base';
import { gql, withApollo, compose } from 'react-apollo'

var BUTTONS = [
  { text: "ลูกค้ากดผิด", icon: "md-arrow-dropright", iconColor: "#2c8ef4", status: "B1" },
  { text: "ร้านปิด", icon: "md-arrow-dropright", iconColor: "#f42ced", status: "B2" },
  { text: "Order ซ้ำ", icon: "md-arrow-dropright", iconColor: "#ea943b", status: "B3" },
  { text: "สินค้าผิด", icon: "md-arrow-dropright", iconColor: "#fa213b", status: "B4" },
  { text: "เซลล์ key ผิด", icon: "md-arrow-dropright", iconColor: "#2c8ef4", status: "B5" },
  { text: "ลูกค้าสั่งร้านอื่นมาแล้ว", icon: "md-arrow-dropright", iconColor: "#f42ced", status: "B6" },
  { text: "เซลล์บอกราคาลูกค้าผิด", icon: "md-arrow-dropright", iconColor: "#ea943b", status: "B7" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var CANCEL_INDEX = 4;

class SearchTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showWork: [],
      showZone: [],
      show_SUC: [],
      refreshing_2: false,
      CF_ALL_INVOICE: [],
      stack_IVOICE: [],
      status_CHECKBOX: false,
    }
    // this.props.client.resetStore();
    this.addBeer = this.addBeer.bind(this);
    this.queryZONE();
    this.worksub();
    this.sucesswork();
  }

  addBeer(itemValue, itemIndex) {

    this.setState((state) => {
      beer: [...state.beer, itemValue]
    });
  }

  _RELOAD_MAIN2 = () => {
    this.props.client.resetStore();
    this.setState({ refreshing_2: true });
    this.queryZONE();
    this.worksub();
    this.sucesswork();
    this.setState({ refreshing_2: false });
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

  submitwork = (s, in_V, n) => {
    this.props.client.mutate({
      mutation: submitwork,
      variables: {
        "status": s,
        "invoiceNumber": in_V
      }
    }).then((result) => {
      this.submiitdetail(s, in_V, n)
    }).catch((err) => {
      console.log("err of submitwork", err)
    });
  }

  submiitdetail = (s, in_V, n) => {
    this.props.client.mutate({
      mutation: submiitdetail,
      variables: {
        "invoiceNumber": in_V
      }
    }).then((result) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("wokeeey");
          console.log(position);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          }, () => this.tracking(s, in_V, n));
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
    }).catch((err) => {
      console.log("err of submiitdetail", err)
    });
  }

  tracking = (s, in_V, n) => {
    console.log("tracking")

    this.props.client.mutate({
      mutation: tracking,
      variables: {
        "invoice": in_V,
        "status": s,
        "messengerID": global.NameOfMess,
        "lat": this.state.latitude,
        "long": this.state.longitude,
      }
    }).then((result) => {
      if (n == 0) {
        console.log("Tracking ", result.data.tracking.status)
      } else if (n == 1) {
        this._RELOAD_MAIN2()
      }
    }).catch((err) => {
      console.log("ERR OF TRACKING", err)
    });
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

        <Tabs locked>
          <Tab heading={<TabHeading style={{ backgroundColor: '#66c2ff' }}><Icon name="md-cart" /><Text style={{ color: 'white' }}>  รายการส่ง</Text></TabHeading>}>
            <Content padder
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing_2}
                  onRefresh={this._RELOAD_MAIN2}
                />
              }
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  value={this.state.status_CHECKBOX}
                  onValueChange={() => {
                    this.setState({ status_CHECKBOX: !this.state.status_CHECKBOX })
                    this.state.showWork.map((i, k) => {
                      let n = this.state.CF_ALL_INVOICE;
                      let s = this.state.stack_IVOICE;
                      n[k] = !this.state.status_CHECKBOX
                      s[k] = i.invoiceNumber
                      this.setState({
                        CF_ALL_INVOICE: n,
                        stack_IVOICE: s
                      })
                    })
                  }} />
                <Text>เลือกทั้งหมด</Text>
              </View>

              <View>
                {
                  this.state.showZone.map((val, j) => (
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
                      renderContent={() => this.state.showWork.map((l, i) => {
                        if (l.Zone == val.Zone) {
                          return (
                            <View style={styles.detailContent}>
                              <View style={{ paddingLeft: 0, flexDirection: 'row' }}>
                                <CheckBox
                                  value={this.state.CF_ALL_INVOICE[i]}
                                  onValueChange={() => {
                                    if (this.state.CF_ALL_INVOICE[i] == true) {
                                      let n = this.state.CF_ALL_INVOICE.slice();
                                      let s = this.state.stack_IVOICE.slice();
                                      n[i] = false
                                      s[i] = l.invoiceNumber
                                      this.setState({
                                        CF_ALL_INVOICE: n,
                                        stack_IVOICE: s
                                      }, () => {
                                        console.log("if 1 CF", this.state.CF_ALL_INVOICE)
                                        console.log("if 1 CF", this.state.stack_IVOICE)
                                      })

                                    }
                                    else if (this.state.CF_ALL_INVOICE[i] == false) {
                                      let n = this.state.CF_ALL_INVOICE.slice();
                                      let s = this.state.stack_IVOICE.slice();
                                      n[i] = true
                                      s[i] = l.invoiceNumber
                                      this.setState({
                                        CF_ALL_INVOICE: n,
                                        stack_IVOICE: s
                                      }, () => {
                                        console.log("if 2 CF", this.state.CF_ALL_INVOICE)
                                        console.log("if 1 CF", this.state.stack_IVOICE)
                                      })

                                    }
                                    else {
                                      let n = this.state.CF_ALL_INVOICE.slice();
                                      let s = this.state.stack_IVOICE.slice();
                                      n[i] = true
                                      s[i] = l.invoiceNumber
                                      this.setState({
                                        CF_ALL_INVOICE: n,
                                        stack_IVOICE: s
                                      }, () => {
                                        console.log("if 3 CF", this.state.CF_ALL_INVOICE)
                                        console.log("if 1 CF", this.state.stack_IVOICE)
                                      })

                                    }

                                  }} />
                                <Text style={styles.storeLabel}>{l.invoiceNumber}</Text>
                                <Text style={{ paddingHorizontal: 10 }}>{l.DELIVERYNAME}</Text>
                              </View>
                             
                              <View style={{ position: 'absolute', right: 10 , flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                              <Text style={{ paddingHorizontal: 5  }}>{l.SUM} บาท </Text>
                                <Button transparent
                                  onPress={() => navigate('DetailWork', { id: l.invoiceNumber, Zone: l.Zone, address: l.addressShipment, Cusname: l.DELIVERYNAME, refresion: this._RELOAD_MAIN2 })}>
                                  <Icon name='ios-arrow-forward' style={{ color: 'gray' }} />
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
            <Footer style={{
              backgroundColor: '#66c2ff',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button warning
                  onPress={() => {
                    Alert.alert(
                      "ส่งงานไม่ได้",
                      "คุณต้องการยืนยัน การส่งงานไม่ได้? ",
                      [
                        {
                          text: "ไม่", onPress: () =>
                            ActionSheet.show(
                              {
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                title: "รายงานการส่ง"
                              },
                              buttonIndex => {
                                this.state.CF_ALL_INVOICE.map((val, i) => {
                                  if ((val == true) && ((i + 1) != this.state.CF_ALL_INVOICE.length)) {
                                    this.submitwork(BUTTONS[buttonIndex].status,this.state.stack_IVOICE[i],0)
                                  }
                                  else if ((val == true) && ((i + 1) == this.state.CF_ALL_INVOICE.length)) {
                                    this.submitwork(BUTTONS[buttonIndex].status,this.state.stack_IVOICE[i],1)
                                  }
                                });
                                
                              }
                            )
                        },
                        { text: "ใช่", onPress: () => navigate("SubmitALLJob", { check_box: this.state.CF_ALL_INVOICE, in_V: this.state.stack_IVOICE, refresion: this._RELOAD_MAIN2 }) }
                      ]
                    )
                  }}
                  style={{
                    width: 200,
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>ยืนยันการส่งงาน</Text>
                </Button>
              </View>
            </Footer>
          </Tab>
          {/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
          <Tab heading={<TabHeading style={{ backgroundColor: '#66c2ff' }}><Icon name="md-checkbox-outline" /><Text style={{ color: 'white' }}>  ส่งสำเร็จ</Text></TabHeading>}>
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing_2}
                  onRefresh={this._RELOAD_MAIN2}
                />
              }
            >
              {
                this.state.show_SUC.map(k => (
                  <ListItem>
                    <View>
                      <View style={{ paddingLeft: 0, flexDirection: 'row' }}>
                        <Text style={styles.storeLabel}>{k.invoiceNumber}</Text>
                        <Text style={{ paddingHorizontal: 10 }}>{k.DELIVERYNAME}</Text>
                        
                        
                      </View>
                    </View>
                    <View style={{ position: 'absolute', right: 10 , flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ paddingHorizontal: 30 }}>{k.SUM} บาท </Text>
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
                              <Badge warning>
                                <Text>ส่งสำเร็จมีการแก้ไข</Text>
                              </Badge>

                            )
                          } else {
                            return (
                              <Badge >
                                <Text>ส่งไม่สำเร็จ</Text>
                              </Badge>

                            )
                          }
                        })()
                      }
                    </View>
                  </ListItem>
                ))
              }
            </Content>
            <Footer style={{
              backgroundColor: '#66c2ff',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button warning
                  onPress={() => navigate('SumBill')}
                  style={{
                    width: 200,
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>สรุปยอดเงิน</Text>
                </Button>
              </View>
            </Footer>
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
            addressShipment
            SUM
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
          SUM
      }
  }
`

const submitwork = gql`
    mutation submitwork($status:String!, $invoiceNumber:String!){
        submitwork(status: $status, invoiceNumber: $invoiceNumber){
            status
        }
    }
`

const submiitdetail = gql`
    mutation submiitdetail($invoiceNumber:String!){
        submiitdetail(invoiceNumber: $invoiceNumber){
            status
        }
    }
`

const tracking = gql`
    mutation tracking(
        $invoice:String!,
        $status:String!,
        $messengerID:String!,
        $lat:Float!,
        $long:Float!
    ){
        tracking(
            invoice: $invoice,
            status: $status,
            messengerID: $messengerID,
            lat: $lat,
            long: $long
        ){
            status
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