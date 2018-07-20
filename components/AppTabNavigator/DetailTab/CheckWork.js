import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView } from 'react-native'
import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer } from 'native-base';
import { gql, withApollo, compose } from 'react-apollo'

class CheckWork extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ShowData: [],
            latitude: null,
            longitude: null,
            error: null,
        }
        this.props.client.resetStore();
        this.datailwork();
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
                },() => this.confirmworksome());
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
                Alert.alert("Confirm Failed", "Please Confirm Again")
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
                                    'Confirm?',
                                    'You want to confirm?',
                                    [
                                        { text: 'yes', onPress: () =>  this.GET_LOCATE() },
                                        { text: 'no', onPress: () => console.log("no") }
                                    ]
                                )
                            }
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>CONFIRM</Text>
                        </Button>
                    </View>
                </Footer>
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
