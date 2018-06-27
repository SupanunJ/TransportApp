import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert, Platform,StatusBar } from 'react-native'

import { Icon, Container, Header, Left, Body, Right, Content, Button, Form, Item, Label, Input, Title } from 'native-base'


import MainMenu from './MainMenu';
import TabPage from './TabPage';

import { StackNavigator } from "react-navigation";


class mainScreen extends Component {
    static navigationOptions = {
        header: null
    }

    render() {

        return (
            <AppStackNavigator />
        );
    }
}

export default mainScreen;

const AppStackNavigator = StackNavigator({
    MainMenu: {
        screen: MainMenu
    },
    TabPage: {
        screen: ({navigation}) => <TabPage screenProps={{ rootNavigation: navigation }} />,
        navigationOptions: () => ({
            header: null
          }),
    }
  },
  {
    initialRouteName: 'MainMenu',
  });


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerWrapper: {
        flex: 1,
        alignItems: "center"
    },
    headerText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20,
        color: 'black'
    }
});
