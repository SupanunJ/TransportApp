import React, { Component } from 'react'
import { Text, StyleSheet, StatusBar, Alert, View, Platform, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Icon, Container, Header, Left, Body, Title, Right, Button, Content, Footer } from 'native-base';
import { List, ListItem } from 'react-native-elements';
import { gql, withApollo, compose } from 'react-apollo'

console.disableYellowBox = true;

class HomeTab extends Component {

    static navigationOptions = {}

    constructor(props) {
        super(props);
        this.state = {
            showTable: []
        }
        this.props.client.resetStore();
        this.worklist_query();
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

    confirmwork = () => {
        const { navigate } = this.props.navigation
        console.log("confirmwork")

        this.props.client.mutate({
            mutation: confirmwork,
            variables: {
                "MessengerID": global.NameOfMess
            }
        }).then((result) => {
            if (result.data.confirmwork.status) {
                navigate('Home')
            } else {
                Alert.alert("Confirm Failed", "Please Confirm Again")
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    // componentWillMount() {
    //     console.log('componentWillMount');
    //     this.worklist_query();
    // }

    // componentDidMount() {
    //     this.props.client.resetStore();
    //     this.worklist_query();
    // }

    // componentWillUnmount() {
    //     console.log('componentWillUnmount')
    //     this.props.client.resetStore();
    // }

    render() {

        const { navigate } = this.props.navigation

        return (

            <Container>
                <Header style={{ backgroundColor: '#66c2ff' }}>
                    <Left>
                        <Button transparent
                            onPress={() => { navigate("MainMenu") }}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>ตรวจงาน</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>

                    <List containerStyle={{ marginBottom: 20, top: 0 }}>
                        {
                            this.state.showTable.map((l, i) => (
                                <TouchableOpacity onPress={() => navigate('CheckWork', { id: l.invoiceNumber })}>
                                    <ListItem
                                        key={i}
                                        title={l.invoiceNumber}
                                        subtitle={l.DELIVERYNAME}
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </List>

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
                                    'Confirm ALL?',
                                    'You want to confirm all?',
                                    [
                                        { text: 'yes', onPress: () => this.confirmwork() },
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

const confirmwork = gql`
    mutation confirmwork($MessengerID:String!){
        confirmwork(MessengerID: $MessengerID){
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
    }
})
