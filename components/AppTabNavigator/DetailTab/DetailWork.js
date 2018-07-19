import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { gql, withApollo, compose } from 'react-apollo'
import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer, Input, Item, Grid, Col, ActionSheet } from 'native-base';

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

class DetailWork extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            showDetailWork: [],
            mapRegion: null,
            lastLat: null,
            lastLong: null,
        }
        this.props.client.resetStore();
        this.subDetail();
    }

    _RELOAD_DETAILWORK = () => {
        this.props.client.resetStore();
        this.subDetail();
    }

    _RELOAD_TO_GOBACK = () => {
        this.props.navigation.state.params.refresion()
        this.props.navigation.goBack()
    }

    subDetail = () => {
        this.props.client.query({
            query: subDetail,
            variables: {
                "invoiceNumber": this.props.navigation.state.params.id
            }
        }).then((result) => {
            this.setState({
                showDetailWork: result.data.subDetail
            })
        }).catch((err) => {
            console.log(err)
        });
    }

    submitwork = (s) => {
        const { navigate } = this.props.navigation
        this.props.client.mutate({
            mutation: submitwork,
            variables: {
                "status": s,
                "invoiceNumber": this.props.navigation.state.params.id
            }
        }).then((result) => {
            this.props.navigation.state.params.refresion()
            this.props.navigation.goBack()
        }).catch((err) => {
            console.log("err of submitwork", err)
        });
    }

    render() {

        const { navigate } = this.props.navigation

        return (

            <Container>
                <Header style={{ backgroundColor: '#66c2ff' }}>
                    <Left>
                        <Button transparent
                            onPress={() => { navigate('Search') }}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>รายละเอียด</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>

                    <View style={{ margin: 10 }}>
                        <Text>{this.props.navigation.state.params.id}</Text>
                        <Text>ห้าง : </Text>
                    </View>

                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>

                        <Text>ชื่อ</Text>
                        <Text>จำนวน</Text>
                        <Text>ราคา</Text>

                    </View>

                    <View>
                        {
                            this.state.showDetailWork.map((l, i) => (
                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{l.itemCode}</Text>
                                    </View>
                                    <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{l.qty - l.qtyCN}</Text>
                                    </View>
                                    <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{l.amount}</Text>
                                    </View>

                                </View>
                            ))
                        }
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>หมายเหตุ : </Text>
                    </View>

                </Content>

                <Footer style={{ height: 200 }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <TouchableOpacity onPress={() => navigate('')} >
                            <View style={{
                                width: Dimensions.get('window').width / 2,
                                height: 100, backgroundColor: '#FFBC66', justifyContent: 'center', alignItems: 'center'
                            }} >
                                <Image source={require('../../../assets/icon/phone-receiver.png')}
                                    style={{ width: 70, height: 70 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>โทรหาลูกค้า</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('EditItem', { id: this.props.navigation.state.params.id, refresion: this._RELOAD_DETAILWORK })} >
                            <View style={{
                                width: Dimensions.get('window').width / 2,
                                height: 100, backgroundColor: '#FFFD66', justifyContent: 'center', alignItems: 'center'
                            }} >
                                <Image source={require('../../../assets/icon/clam.png')}
                                    style={{ width: 70, height: 70 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>แก้ไขรายการ</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <TouchableOpacity onPress={() => navigate('MapScreen')} >
                            <View style={{ width: Dimensions.get('window').width / 2, height: 100, backgroundColor: '#66FFB3', justifyContent: 'center', alignItems: 'center' }} >
                                <Image source={require('../../../assets/icon/car.png')}
                                    style={{ width: 70, height: 70 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>นำทาง</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(
                                    "Confirm Close Job",
                                    "",
                                    [
                                        {
                                            text: "Don't Finish", onPress: () =>
                                                ActionSheet.show(
                                                    {
                                                        options: BUTTONS,
                                                        cancelButtonIndex: CANCEL_INDEX,
                                                        title: "รายงานการส่ง"
                                                    },
                                                    buttonIndex => {
                                                        // this.setState({ clicked: BUTTONS[buttonIndex] });
                                                        this.submitwork(BUTTONS[buttonIndex].status)
                                                        // this.xoxona();
                                                        // console.log(BUTTONS[buttonIndex].status);

                                                        // console.log("lat",this.state.lastLat);
                                                        // console.log("long",this.state.lastLong);
                                                    }
                                                )
                                        },
                                        { text: "Finish", onPress: () => navigate("SubmitJob", { id: this.props.navigation.state.params.id, refresion: this._RELOAD_TO_GOBACK }) }
                                    ]
                                )
                            }
                        >
                            <View style={{ width: Dimensions.get('window').width / 2, height: 100, backgroundColor: '#FFA566', justifyContent: 'center', alignItems: 'center' }} >
                                <Image source={require('../../../assets/icon/file.png')}
                                    style={{ width: 70, height: 70 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>ส่งงาน</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Footer>
            </Container>

        )

    }
}

const GraphQL = compose(DetailWork)
export default withApollo(GraphQL)

const subDetail = gql`
    query subDetail($invoiceNumber:String!){
        subDetail(invoiceNumber: $invoiceNumber){
            invoiceNumber
            itemCode
            itemName
            qty
            qtyCN
            amount
            priceOfUnit
            amountbox
            Note
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
