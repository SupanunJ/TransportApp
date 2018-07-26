import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer } from 'native-base';
import { gql, withApollo, compose } from 'react-apollo'

class CheckWork extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ShowData: [],
            ShowSUM: [],
            latitude: null,
            longitude: null,
            error: null,
        }
        this.props.client.resetStore();
        this.datailwork();
        this.datailsum();
    }

    GET_LOCATE = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("wokeeey");
                console.log(position);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                }, () => this.confirmworksome());
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    datailwork = () => {
        this.props.client.query({
            query: datailwork,
            variables: {
                "invoiceNumber": this.props.navigation.state.params.id
            }
        }).then((result) => {
            this.setState({
                ShowData: result.data.datailwork
            })
            // console.log(this.state.ShowData)
        }).catch((err) => {
            console.log(err)
        });
    }

    datailsum = () => {
        this.props.client.query({
            query: datailsum,
            variables: {
                "invoiceNumber": this.props.navigation.state.params.id
            }
        }).then((result) => {
            this.setState({
                ShowSUM: result.data.datailsum
            })
            // console.log(this.state.ShowSUM)
        }).catch((err) => {
            console.log(err)
        });
    }

    confirmworksome = () => {
        // const { navigate } = this.props.navigation
        console.log("confirmworksome")

        this.props.client.mutate({
            mutation: confirmworksome,
            variables: {
                "invoiceNumber": this.props.navigation.state.params.id
            }
        }).then((result) => {
            if (result.data.confirmworksome.status) {
                this.tracking()
            } else {
           
                     Alert.alert(
                        'ตรวจงานไม่สำเร็จ',
                        'มีการตรวจงานนี้ไปแล้ว',
                        [
                            { text: 'ตกลง', onPress: ()  => console.log("ok") },
                        ]
                    )
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    tracking = () => {
        console.log("tracking")
        // console.log(this.props.navigation.state.params.id)

        this.props.client.mutate({
            mutation: tracking,
            variables: {
                "invoice": this.props.navigation.state.params.id,
                "status": "5",
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
                            onPress={() => navigate('Home')}>
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
                    </View>

                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>

                        <Text>ชื่อ</Text>
                        <Text>จำนวน</Text>
                        <Text>ราคา</Text>

                    </View>

                    <View>

                        {
                            this.state.ShowData.map((l, i) => (

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>{l.itemCode}</Text>
                                        </View>
                                        <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>{l.qty}</Text>
                                        </View>
                                        <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>{l.amount}</Text>
                                        </View>

                                    </View>

                                </View>

                            ))
                        }
                      
                        <View>
                            {
                                this.state.ShowSUM.map((l, i) => (
                                    <View style={{ margin: 30, marginTop: 5, justifyContent: 'center' }}>
                                        <Text>ราคาทั้งหมด : {l.SUM} บาท </Text>
                                        <Text>หมายเหตุ :  </Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>

                </Content>
                <TouchableOpacity onPress={
                    () => Alert.alert(
                        'ตรวจงานนี้',
                        'คุณต้องการยืนยันการตรวจงานนี้?',
                        [
                            { text: 'ไม่', onPress: () => console.log("no") },
                            { text: 'ใช่', onPress: () => this.GET_LOCATE() },
                        ]
                    )
                }>
                <Footer style={{
                    backgroundColor: '#ff6c00',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>ยืนยันการตรวจงาน</Text>
                           
                    
                </Footer>
                </TouchableOpacity>
            </Container>

        )

    }

}

// export default CheckWork;

const GraphQL = compose(CheckWork)
export default withApollo(GraphQL)


const datailwork = gql`
    query datailwork($invoiceNumber:String!){
        datailwork(invoiceNumber: $invoiceNumber){
            invoiceNumber
            itemCode
            itemName
            qty
            amount
            priceOfUnit
            amountbox
            Note
        }
    }
`
const datailsum = gql`
    query datailsum($invoiceNumber:String!){
        datailsum(invoiceNumber: $invoiceNumber){
            SUM
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

const styles = StyleSheet.create({})
