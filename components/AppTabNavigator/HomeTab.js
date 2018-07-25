import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, TouchableOpacity, RefreshControl, CheckBox } from 'react-native'
import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer, List, ListItem, Item } from 'native-base';
// import { List, ListItem } from 'react-native-elements';
import { gql, withApollo, compose } from 'react-apollo'

console.disableYellowBox = true;

class HomeTab extends Component {

    static navigationOptions = {}

    constructor(props) {
        super(props);
        this.state = {
            showTable: [],
            showTableGreen: [],
            refreshing_1: false,
            latitude: null,
            longitude: null,
            error: null,
            CF_ALL_INVOICE: [],
            stack_IVOICE: [],
            status_CHECKBOX: false,
        }
        // this.props.client.resetStore();
        this.worklist_query();
        this.selectwork();
    }

    GET_LOCATE = () => {
        console.log("componentDidMount")
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("wokeeey");
                console.log(position);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                }, () => {
                    this.state.CF_ALL_INVOICE.map((val, i) => {
                        if ((val == true) && ((i + 1) != this.state.CF_ALL_INVOICE.length)) {
                            this.tracking(this.state.stack_IVOICE[i], 0)
                        }
                        else if ((val == true) && ((i + 1) == this.state.CF_ALL_INVOICE.length)) {
                            this.tracking(this.state.stack_IVOICE[i], 1)
                        }
                    });
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    worklist_query = () => {
        console.log('worklist_query')

        this.props.client.query({
            query: querywork,
            variables: {
                "MessengerID": global.NameOfMess
            }
        }).then((result) => {
            this.setState({
                showTable: result.data.querywork
            })
            // console.log(this.state.showTable)
        }).catch((err) => {
            console.log(err)
        });
    }

    selectwork = () => {
        console.log('selectwork')

        this.props.client.query({
            query: selectwork,
            variables: {
                "MessengerID": global.NameOfMess
            }
        }).then((result) => {
            this.setState({
                showTableGreen: result.data.selectwork
            })
        }).catch((err) => {
            console.log(err)
        });
    }

    _Re_worklist_query = () => {
        this.props.client.resetStore();
        console.log('_Re_worklist_query')
        this.setState({ refreshing_1: true });
        this.worklist_query();
        this.selectwork();
        this.setState({ refreshing_1: false });
    }

    confirmworksome = (inV, i) => {
        console.log("confirmworksome")

        this.props.client.mutate({
            mutation: confirmworksome,
            variables: {
                "invoiceNumber": inV
            }
        }).then((result) => {
            if (i == 0) {
                console.log(result)
            } else if (i == 1) {
                this._Re_worklist_query();
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    tracking = (inV, i) => {
        console.log("tracking")
        this.props.client.mutate({
            mutation: tracking,
            variables: {
                "invoice": inV,
                "status": "5",
                "messengerID": global.NameOfMess,
                "lat": this.state.latitude,
                "long": this.state.longitude,
            }
        }).then((result) => {
            this.confirmworksome(inV, i)
        }).catch((err) => {
            console.log("ERR OF TRACKING", err)
        });
    }
    //--------------------------------------------------------------------------------------------------------------
    // ยืนยันงานทั้งหมด แบบเก่า
    /*confirmwork = () => {
        console.log("confirmwork")

        this.props.client.mutate({
            mutation: confirmwork,
            variables: {
                "MessengerID": global.NameOfMess
            }
        }).then((result) => {
            if (result.data.confirmwork.status) {
                this._Re_worklist_query()
            } else {
                Alert.alert("Confirm Failed", "Please Confirm Again")
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    Trackingstatus4 = () => {
        console.log("Trackingstatus4")

        this.props.client.mutate({
            mutation: Trackingstatus4,
            variables: {
                "status": "5",
                "location": "NULL",
                "messengerID": global.NameOfMess,
                "lat": this.state.latitude,
                "long": this.state.longitude,
            }
        }).then((result) => {
            console.log("Result of Trackingstatus4", result.data.Trackingstatus4)
            this.confirmwork()
        }).catch((err) => {
            console.log(err)
        });
    }*/
    //--------------------------------------------------------------------------------------------------------------

    render() {

        const { navigate } = this.props.navigation

        return (

            <Container>
                <Header style={{ backgroundColor: '#66c2ff' }}>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.client.resetStore(); navigate("MainMenu"); }}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>ตรวจงาน</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing_1}
                        onRefresh={this._Re_worklist_query}
                    />
                }>
                    <CheckBox
                        value={this.state.status_CHECKBOX}
                        onValueChange={() => {
                            this.setState({ status_CHECKBOX: !this.state.status_CHECKBOX })
                            this.state.showTable.map((i, k) => {
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
                    <View>
                        {
                            this.state.showTable.map((l, i) => (
                                <ListItem>
                                    <Body>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
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
                                            </View>
                                            <Text style={styles.storeLabel}>{l.invoiceNumber}</Text>
                                        </View>
                                        <Text note>{l.DELIVERYNAME}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent
                                            onPress={() => navigate('CheckWork', { id: l.invoiceNumber, refresion: this._Re_worklist_query })}>
                                            <Icon name='ios-arrow-forward' style={{ color: 'gray' }} />
                                        </Button>
                                    </Right>
                                </ListItem>
                            ))
                        }
                    </View>
                    <View>
                        {
                            this.state.showTableGreen.map((l, i) => (
                                <ListItem noIndent style={{ backgroundColor: "#A9FC93" }}>
                                    <Body>
                                        <Text style={styles.storeLabel}>{l.invoiceNumber}</Text>
                                        <Text note>{l.DELIVERYNAME}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent
                                            onPress={() => navigate('CheckWork', { id: l.invoiceNumber, refresion: this._Re_worklist_query })}>
                                            <Icon name='ios-arrow-forward' style={{ color: 'gray' }} />
                                        </Button>
                                    </Right>
                                </ListItem>
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
                        <Button success style={{
                            width: 200,
                            height: '80%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                            onPress={
                                () => Alert.alert(
                                    'ตรวจงานทั้งหมด',
                                    'คุณต้องการตรวจงานทั้งหมด?',
                                    [
                                        { text: 'ใช่', onPress: () => this.GET_LOCATE() },
                                        { text: 'ไม่', onPress: () => console.log("no") }
                                    ]
                                )
                            }
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>CONFIRM</Text>
                        </Button>
                    </View>
                </Footer>
            </Container >

        );
    }


}

const GraphQL = compose(HomeTab)
export default withApollo(GraphQL)


const querywork = gql`
    query querywork($MessengerID:String!){
                        querywork(MessengerID: $MessengerID){
                        invoiceNumber
            customerName
                    DELIVERYNAME
                }
            }
        `

const selectwork = gql`
    query selectwork($MessengerID:String!){
                        selectwork(MessengerID: $MessengerID){
                        invoiceNumber
            customerName
                    DELIVERYNAME
                }
            }
        `

const confirmworksome = gql`
    mutation confirmworksome($invoiceNumber:String!){
        confirmworksome(invoiceNumber: $invoiceNumber){
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
//-----------------------------------------------------------------------------------------------
// const confirmwork = gql`
//     mutation confirmwork($MessengerID:String!){
//                         confirmwork(MessengerID: $MessengerID){
//                         status
//                     }
//                     }
//                 `

// const Trackingstatus4 = gql`
//     mutation Trackingstatus4(
//             $status:String!,
//             $location:String!,
//             $messengerID:String!,
//             $lat:Float!,
//             $long:Float!
//         ){
//         Trackingstatus4(
//                 status: $status,
//                 location: $location,
//                 messengerID: $messengerID,
//                 lat: $lat,
//                 long: $long
//             ){
//                 status
//             }
//         }
//     `
//-----------------------------------------------------------------------------------------------

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
        borderColor: 'gray',
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        justifyContent: 'center'
    },
    detailContentGREEN: {
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#77F156'
    }
})
