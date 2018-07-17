import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, ScrollView } from 'react-native'
import { gql, withApollo, compose } from 'react-apollo'
import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer, Item, Input } from 'native-base';

class EditItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '0',
            showWorkEdit: []
        };
        this.props.client.resetStore();
        this.subDetail();
    }

    subDetail = () => {
        this.props.client.query({
            query: subDetail,
            variables: {
                "invoiceNumber": this.props.navigation.state.params.id
            }
        }).then((result) => {
            this.setState({
                showWorkEdit: result.data.subDetail
            })
        }).catch((err) => {
            console.log(err)
        });
    }

    editsubwork = (q_CN, it_C) => {
        console.log("edit")
        this.props.client.mutate({
            mutation: editsubwork,
            variables: {
                "invoiceNumber": this.props.navigation.state.params.id,
                "qtyCN": q_CN,
                "itemCode": it_C
            }
        }).then((result) => {
            if (result.data.editsubwork.status) {
                console.log("yes")
            } else {
                console.log("no")
            }
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
                            onPress={() => navigate('DetailWork')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>แก้ไขรายละเอียด</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>

                    <View style={{ margin: 10 }}>
                        <Text>รหัสบิล : {this.props.navigation.state.params.id}</Text>
                    </View>

                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>

                        <Text>ชื่อ</Text>
                        <Text>จำนวน</Text>
                        <Text>จำนวน</Text>
                        <Text>Confirm</Text>

                    </View>

                    <View>
                        {
                            this.state.showWorkEdit.map((l, i) => (
                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ width: Dimensions.get('window').width / 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{l.itemCode}</Text>
                                    </View>
                                    <View style={{ width: Dimensions.get('window').width / 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{l.qty}</Text>
                                    </View>
                                    <Item style={{ width: Dimensions.get('window').width / 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Input keyboardType='number-pad'
                                            placeholder='...'
                                            placeholderTextColor="white"
                                            underlineColorAndroid='white'
                                            onChangeText={(text) => this.setState({ text })} />
                                    </Item>
                                    <View style={{ width: Dimensions.get('window').width / 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width / 6 }}>
                                            <Button rounded
                                                style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width / 6 }}
                                                onPress={ () => this.editsubwork(parseInt(this.state.text), l.itemCode) }
                                            >
                                                <Text style={{ color: '#0086b3', fontWeight: 'bold' }}>OK</Text>
                                            </Button>
                                        </View>
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
                        <Button success
                            style={{
                                width: 200,
                                height: '80%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>ยืนยันการแก้ไข</Text>
                        </Button>
                    </View>
                </Footer>
            </Container>

        )

    }
}

const GraphQL = compose(EditItem)
export default withApollo(GraphQL)

const styles = StyleSheet.create({})

const subDetail = gql`
    query subDetail($invoiceNumber:String!){
        subDetail(invoiceNumber: $invoiceNumber){
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
const editsubwork = gql`
    mutation editsubwork($invoiceNumber:String!,$qtyCN:Int!,$itemCode:String!){
        editsubwork(invoiceNumber: $invoiceNumber,qtyCN: $qtyCN,itemCode: $itemCode){
            status
        }
    }
`