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
            showStatus: []
        };
        global.NameOfMess = ""
    }

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
            if (result.data.checkroundout.status) {
                Alert.alert(
                    'คุณยังมีรายการที่ยังไม่ได้ตรวจ',
                    'ต้ืองการออกรอบเลยหรือไม่',
                    [
                        { text: 'yes', onPress: () => navigate("Search")},
                        { text: 'back to checkwork', onPress: () => navigate("Home") },
                        { text: 'no', onPress: () => console.log("no") },
                    ]
                )
            } else {
                Alert.alert(
                    'Confirm Round Out?',
                    'You want to confirm round out',
                    [
                        { text: 'yes', onPress: () => navigate("Search") },
                        { text: 'no', onPress: () => console.log("no") },
                    ]
                )
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    componentWillMount() {
        this.user();
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
                        <TouchableOpacity onPress={() => { navigate('HomeTab') }}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#66c2ff',
        flexDirection: 'column'
    }
})
