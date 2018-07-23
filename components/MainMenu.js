import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native'
import { TabRouter, addNavigationHelpers, createNavigator, NavigationActions } from 'react-navigation'
import { Icon, Container, Header, Left, Body, Right, Content, Button, Form, Item, Label, Input, Title } from 'native-base'
import { gql, withApollo, compose } from 'react-apollo'

class MainMenu extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            mess: "",
            showStatus: [],
            showINVOICE_ID: [],
            latitude: null,
            longitude: null,
            error: null,
        };
        global.NameOfMess = "";
        this.props.client.resetStore();
        this.user();
    }

    // GET_LOCATE() {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             console.log("wokeeey");
    //             console.log(position);
    //             this.setState({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //                 error: null,
    //             });
    //         },
    //         (error) => this.setState({ error: error.message }),
    //         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    //     );
    // }

    user = () => {
        const IMEI = require('react-native-imei');

        this.props.client.query({
            query: beforeloginQuery,
            variables: {
                "imei": IMEI.getImei()
            }
        }).then((result) => {
            // console.log(result.data.beforeloginQuery[0].IDMess)
            this.setState({ mess: result.data.beforeloginQuery[0].IDMess })
        }).catch((err) => {
            console.log(err)
        });
    }

    checkroundout = () => {

        const { navigate } = this.props.navigation

        this.props.client.query({
            query: checkroundout,
            variables: {
                "MessengerID": global.NameOfMess
            }
        }).then((result) => {
            // console.log(result.data.checkroundout.status)
            if (result.data.checkroundout.status == 1) {
                Alert.alert(
                    'คุณยังมีรายการที่ยังไม่ได้ตรวจ',
                    'ต้องการออกรอบเลยหรือไม่',
                    [
                        {
                            text: 'ตกลง', onPress: () => {
                                navigator.geolocation.getCurrentPosition(
                                    (position) => {
                                        console.log("wokeeey");
                                        console.log(position);
                                        this.setState({
                                            latitude: position.coords.latitude,
                                            longitude: position.coords.longitude,
                                            error: null,
                                        }, () => this.Trackingstatus5());
                                    },
                                    (error) => this.setState({ error: error.message }),
                                    { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
                                );
                            }
                        },
                        { text: 'กลับไปตรวจงาน', onPress: () => navigate("Home") },
                        { text: 'ยกเลิก', onPress: () => console.log("no") },
                    ]
                )
            } else if (result.data.checkroundout.status == 2) {
                Alert.alert(
                    'Confirm Round Out?',
                    'You want to confirm round out',
                    [
                        {
                            text: 'yes', onPress: () => {
                                navigator.geolocation.getCurrentPosition(
                                    (position) => {
                                        console.log("wokeeey");
                                        console.log(position);
                                        this.setState({
                                            latitude: position.coords.latitude,
                                            longitude: position.coords.longitude,
                                            error: null,
                                        }, () => this.Trackingstatus5());
                                    },
                                    (error) => this.setState({ error: error.message }),
                                    { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
                                );
                            }
                        },
                        { text: 'no', onPress: () => console.log("no") },
                    ]
                )
            } else {
                navigate("Search")
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    roundout = () => {
        const { navigate } = this.props.navigation
        this.props.client.mutate({
            mutation: roundout
        }).then((result) => {
            navigate('Search')
        }).catch((err) => {
            console.log("error", err)
        });
    }

    checkinvoice = () => {
        const { navigate } = this.props.navigation
        this.props.client.query({
            query: checkinvoice,
            variables: {
                "MessengerID": global.NameOfMess
            }
        }).then((result) => {
            console.log("checkinvoice", result.data.checkinvoice)
            this.setState({ showINVOICE_ID: result.data.checkinvoice })
            console.log("NUM", this.state.showINVOICE_ID.length)
            if (this.state.showINVOICE_ID.length > 0) {
                this.billTOapp();
            } else {
                navigate('HomeTab')
            }

        }).catch((err) => {
            console.log("err of checkinvoice", err)
        });
    }

    billTOapp = () => {
        const { navigate } = this.props.navigation
        console.log("billTOapp")
        this.props.client.mutate({
            mutation: billTOapp,
            variables: {
                "MessengerID": global.NameOfMess
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
                    }, () => {
                        console.log(global.NameOfMess)
                        console.log("result", result.data.billTOapp)
                        this.state.showINVOICE_ID.map(l => {
                            this.detailtoapp(l.INVOICEID);
                            this.tracking(l.INVOICEID, "4", global.NameOfMess, this.state.latitude, this.state.longitude);
                        });
                        navigate('HomeTab')
                    });
                },
                (error) => this.setState({ error: error.message }),
                { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
            );
        }).catch((err) => {
            console.log("error of billTOapp", err)
        });
    }

    detailtoapp = (id) => {
        console.log("detailtoapp")

        this.props.client.mutate({
            mutation: detailtoapp,
            variables: {
                "INVOICEID": id
            }
        }).then((result) => {
            console.log("...")
            // navigate('HomeTab')
        }).catch((err) => {
            console.log("error", err)
        });
    }

    tracking = (invoice, status, messID, lat, long) => {
        console.log("tracking")

        this.props.client.mutate({
            mutation: tracking,
            variables: {
                "invoice": invoice,
                "status": status,
                "messengerID": messID,
                "lat": lat,
                "long": long,
            }
        }).then((result) => {
            console.log("Tracking ", result.data.tracking.status)
        }).catch((err) => {
            console.log(err)
        });
    }

    Trackingstatus5 = () => {
        console.log("Trackingstatus5")

        this.props.client.mutate({
            mutation: Trackingstatus5,
            variables: {
                "status": "6",
                "location": "NULL",
                "messengerID": global.NameOfMess,
                "lat": this.state.latitude,
                "long": this.state.longitude,
            }
        }).then((result) => {
            console.log("Result of Trackingstatus5", result.data.Trackingstatus5)
            this.roundout()
        }).catch((err) => {
            console.log("ERR OF Trackingstatus5", err)
        });
    }

    _PRESS_HOME = () => {
        this.checkinvoice();
    }

    render() {

        const { navigate } = this.props.navigation

        global.NameOfMess = this.state.mess

        return (

            <Container style={{ backgroundColor: 'white' }}>
                <Header style={{ backgroundColor: '#66c2ff' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={require('../assets/dplus.jpg')}
                            style={{ width: 40, height: 40 }} />
                    </View>
                </Header>
                <Body>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 20 }}>
                        <TouchableOpacity
                            onPress={
                                this._PRESS_HOME.bind(this)
                            }//navigate('HomeTab')
                            style={{ paddingHorizontal: 10 }}>
                            <View style={{
                                width: 150, height: 150, backgroundColor: '#0099CC',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../assets/icon/check.png')}
                                    style={{ width: 100, height: 100 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>ตรวจงาน</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={
                                this.checkroundout.bind(this)
                            }//navigate('SearchTab')
                            style={{ paddingHorizontal: 10 }}>
                            <View style={{
                                width: 150, height: 150, backgroundColor: '#CCFFCC',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../assets/icon/car.png')}
                                    style={{ width: 100, height: 100 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>ส่งงาน</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10 }}>
                        <TouchableOpacity onPress={() => navigate('AddMediaTab')}
                            style={{ paddingHorizontal: 10 }}>
                            <View style={{
                                width: 100, height: 100, backgroundColor: '#CCFFCC',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../assets/icon/clam.png')}
                                    style={{ width: 65, height: 65 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>เคลม</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('LikesTab')}
                            style={{ paddingHorizontal: 10 }}>
                            <View style={{
                                width: 100, height: 100, backgroundColor: '#66CCFF',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../assets/icon/folder.png')}
                                    style={{ width: 65, height: 65 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>ประวัติ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('ProfileTab')}
                            style={{ paddingHorizontal: 10 }}>
                            <View style={{
                                width: 100, height: 100, backgroundColor: '#0099CC',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../assets/icon/newspaper.png')}
                                    style={{ width: 65, height: 65 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>ข่าวสาร</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Body>
            </Container>

        )
    }
}

const GraphQL = compose(MainMenu)
export default withApollo(GraphQL)

const beforeloginQuery = gql`
    query beforeloginQuery($imei:String!){
        beforeloginQuery(imei: $imei){
            IDMess
        }
    }
`

const checkroundout = gql`
    query checkroundout($MessengerID:String!){
        checkroundout(MessengerID: $MessengerID){
            status
        }
    }
`

const roundout = gql`
    mutation roundout{
        roundout{
            status
        }
    }
`

const billTOapp = gql`
    mutation billTOapp($MessengerID:String!){
        billTOapp(MessengerID: $MessengerID){
            status
        }
    }
`

const detailtoapp = gql`
    mutation detailtoapp($INVOICEID:String!){
        detailtoapp(INVOICEID: $INVOICEID){
            status
        }
    }
`

const checkinvoice = gql`
    query checkinvoice($MessengerID:String!){
        checkinvoice(MessengerID: $MessengerID){
            INVOICEID
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

const Trackingstatus5 = gql`
    mutation Trackingstatus5(
        $status:String!,
        $location:String!,
        $messengerID:String!,
        $lat:Float!,
        $long:Float!
    ){
        Trackingstatus5(
            status: $status,
            location: $location,
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#66c2ff',
        flexDirection: 'column'
    }
})
