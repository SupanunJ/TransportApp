import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { gql, withApollo, compose } from 'react-apollo'
import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer, Input, Item, Grid, Col } from 'native-base';

class SubmitALLJob extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        }
        this.props.client.resetStore();
    }

    submitedit = (INVOICE, i) => {
        console.log("submitedit")
        this.props.client.query({
            query: submitedit,
            variables: {
                "invoiceNumber": INVOICE
            }
        }).then((result) => {
            if (result.data.submitedit.status) {
                this.submitwork("A2", INVOICE, i)
            } else {
                this.submitwork("A1", INVOICE, i)
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    submitwork = (s, INVOICE, i) => {
        this.props.client.mutate({
            mutation: submitwork,
            variables: {
                "status": s,
                "invoiceNumber": INVOICE
            }
        }).then((result) => {
            this.submiitdetail(s, INVOICE, i)
        }).catch((err) => {
            console.log("err of submitwork", err)
        });
    }

    submiitdetail = (s, INVOICE, i) => {
        console.log("submiitdetail")
        this.props.client.mutate({
            mutation: submiitdetail,
            variables: {
                "invoiceNumber": INVOICE
            }
        }).then((result) => {
            this.tracking(s, INVOICE, i)
        }).catch((err) => {
            console.log("err of submiitdetail", err)
        });
    }


    tracking = (s, INVOICE, i) => {
        console.log("tracking")

        this.props.client.mutate({
            mutation: tracking,
            variables: {
                "invoice": INVOICE,
                "status": s,
                "messengerID": global.NameOfMess,
                "lat": this.state.latitude,
                "long": this.state.longitude,
            }
        }).then((result) => {
            if (i == 0) {
                console.log("Tracking ", result.data.tracking.status)
            } else if (i == 1) {
                console.log("refresionTO")
                this.props.navigation.state.params.refresionTO()
                this.props.navigation.goBack()
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
                            onPress={() => navigate('Search')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>ยืนยันการส่งงาน</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>


                </Content>

                <Footer style={{ height: 160 }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <TouchableOpacity onPress={() => navigate('')} >
                            <View style={{
                                width: Dimensions.get('window').width / 2, height: 80, backgroundColor: '#FFFD66'
                                , justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../../../assets/icon/photo-camera.png')}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>ถ่ายภาพ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('DetailWork')} >
                            <View style={{
                                width: Dimensions.get('window').width / 2, height: 80, backgroundColor: '#FFBC66'
                                , justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../../../assets/icon/x-button.png')}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>ยกเลิก</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <TouchableOpacity onPress={() => navigate('TabPage')} >
                            <View style={{
                                width: Dimensions.get('window').width / 2, height: 80, backgroundColor: '#FFA566'
                                , justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../../../assets/icon/check.png')}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>แก้ไขลายเซ็น</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>
                            Alert.alert(
                                "ยืนยันการส่งงาน",
                                "คุณต้องการยืนยันการส่งงานหรือไม่?",
                                [
                                    { text: "ยกเลิก", onPress: () => console.log("Cancle") },
                                    {
                                        text: "ยืนยัน", onPress: () => {
                                            this.props.navigation.state.params.check_box.map((val, i) => {
                                                if ((val == true) && ((i + 1) != this.props.navigation.state.params.check_box.length)) {
                                                    navigator.geolocation.getCurrentPosition(
                                                        (position) => {
                                                            console.log("wokeeey");
                                                            console.log(position);
                                                            this.setState({
                                                                latitude: position.coords.latitude,
                                                                longitude: position.coords.longitude,
                                                                error: null,
                                                            }, () => {
                                                                this.submitedit(this.props.navigation.state.params.in_V[i], 0)
                                                            });
                                                        },
                                                        (error) => this.setState({ error: error.message }),
                                                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 3000 },
                                                    );
                                                }
                                                else if ((val == true) && ((i + 1) == this.props.navigation.state.params.check_box.length)) {
                                                    navigator.geolocation.getCurrentPosition(
                                                        (position) => {
                                                            console.log("wokeeey");
                                                            console.log(position);
                                                            this.setState({
                                                                latitude: position.coords.latitude,
                                                                longitude: position.coords.longitude,
                                                                error: null,
                                                            }, () => {
                                                                this.submitedit(this.props.navigation.state.params.in_V[i], 1)
                                                            });
                                                        },
                                                        (error) => this.setState({ error: error.message }),
                                                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 3000 },
                                                    );
                                                }
                                            });
                                        }
                                    }
                                ]
                            )
                        } >
                            <View style={{
                                width: Dimensions.get('window').width / 2, height: 80, backgroundColor: '#66FFB3'
                                , justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../../../assets/icon/file.png')}
                                    style={{ width: 50, height: 50 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>ยืนยันส่งงาน</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Footer>
            </Container>

        )

    }
}

const GraphQL = compose(SubmitALLJob)
export default withApollo(GraphQL)

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

const submitedit = gql`
    query submitedit($invoiceNumber:String!){
        submitedit(invoiceNumber: $invoiceNumber){
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