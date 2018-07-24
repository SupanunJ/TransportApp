import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, TouchableOpacity, RefreshControl } from 'react-native'
import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer, List, ListItem } from 'native-base';
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
                }, () => this.Trackingstatus4());
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
            // console.log(this.state.showTable)
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

    confirmwork = () => {
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
    }

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
                    <Right />
                </Header>
                <Content refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing_1}
                        onRefresh={this._Re_worklist_query}
                    />
                }>
                    <View>
                        {
                            this.state.showTable.map((l, i) => (
                                // <View style={styles.detailContent}>
                                //     <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                                //         <Text style={styles.storeLabel}>{l.invoiceNumber}</Text>
                                //         <Text style={{ paddingHorizontal: 5 }}>{l.DELIVERYNAME}</Text>
                                //     </View>
                                //     <View style={{ position: 'absolute', right: 0 }}>
                                //         <Button transparent
                                //             onPress={() => navigate('CheckWork', { id: l.invoiceNumber, refresion: this._Re_worklist_query })}>
                                //             <Icon name='ios-arrow-dropright' />
                                //         </Button>
                                //     </View>
                                // </View>
                                <ListItem>
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
                    <View>
                        {
                            this.state.showTableGreen.map((l, i) => (
                                // <View style={styles.detailContentGREEN}>
                                //     <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                                //         <Text style={styles.storeLabel}>{l.invoiceNumber}</Text>
                                //         <Text style={{ paddingHorizontal: 5 }}>{l.DELIVERYNAME}</Text>
                                //     </View>
                                //     <View style={{ position: 'absolute', right: 0 }}>
                                //         <Button transparent
                                //             onPress={() => navigate('CheckWork', { id: l.invoiceNumber, refresion: this._Re_worklist_query })}>
                                //             <Icon name='ios-arrow-dropright' />
                                //         </Button>
                                //     </View>
                                // </View>
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

const confirmwork = gql`
    mutation confirmwork($MessengerID:String!){
                        confirmwork(MessengerID: $MessengerID){
                        status
                    }
                    }
                `

const Trackingstatus4 = gql`
                    mutation Trackingstatus4(
                        $status:String!,
                        $location:String!,
                        $messengerID:String!,
                        $lat:Float!,
                        $long:Float!
    ){
                        Trackingstatus4(
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
