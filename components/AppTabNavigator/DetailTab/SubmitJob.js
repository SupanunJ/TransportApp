import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { gql, withApollo, compose } from 'react-apollo'
import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer, Input, Item, Grid, Col } from 'native-base';

class SubmitJob extends Component {

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

    submitedit = () => {
        console.log("submitedit")
        this.props.client.query({
            query: submitedit,
            variables: {
                "invoiceNumber": this.props.navigation.state.params.id
            }
        }).then((result) => {
            if (result.data.submitedit.status) {
                this.submitwork("A2")
            } else {
                this.submitwork("A1")
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    submitwork = (s) => {
        this.props.client.mutate({
            mutation: submitwork,
            variables: {
                "status": s,
                "invoiceNumber": this.props.navigation.state.params.id
            }
        }).then((result) => {
            this.submiitdetail()
        }).catch((err) => {
            console.log("err of submitwork", err)
        });
    }

    submiitdetail = () => {
        this.props.client.mutate({
            mutation: submiitdetail,
            variables: {
                "invoiceNumber": this.props.navigation.state.params.id
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
                    }, () => this.tracking());
                },
                (error) => this.setState({ error: error.message }),
                { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
            );
        }).catch((err) => {
            console.log("err of submiitdetail", err)
        });
    }


    tracking = () => {
        console.log("tracking")

        this.props.client.mutate({
            mutation: tracking,
            variables: {
                "invoice": this.props.navigation.state.params.id,
                "status": "10",
                "messengerID": global.NameOfMess,
                "lat": this.state.latitude,
                "long": this.state.longitude,
            }
        }).then((result) => {
            console.log("Tracking ", result.data.tracking.status)
            this.props.navigation.state.params.refresion()
            this.props.navigation.goBack()
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
                            onPress={() => navigate('DetailWork')}>
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
                                "Confirm Finish Job",
                                "",
                                [
                                    { text: "Cancle", onPress: () => console.log("Cancle") },
                                    { text: "Confirm", onPress: () => this.submitedit() }
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

const GraphQL = compose(SubmitJob)
export default withApollo(GraphQL)

const submitwork = gql`
    mutation submitwork($status:String!, $invoiceNumber:String!){
        submitwork(status: $status, invoiceNumber: $invoiceNumber){
            status
        }
    }
`

const submiitdetail =gql`
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