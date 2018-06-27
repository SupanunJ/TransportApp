import React, { Component } from 'react'
import { Text, StyleSheet, View, Platform,StatusBar } from 'react-native'

import HomeTab from './AppTabNavigator/HomeTab';
import AddMediaTab from './AppTabNavigator/AddMediaTab';
import LikesTab from './AppTabNavigator/LikesTab';
import ProfileTab from './AppTabNavigator/ProfileTab';
import SearchTab from './AppTabNavigator/SearchTab';

import { TabNavigator ,createMaterialTopTabNavigator } from "react-navigation";


class mainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {

        return (
            <AppTabNavigator />
        );
    }
}

export default mainScreen;

const AppTabNavigator = createMaterialTopTabNavigator({
    HomeTab: {
        screen: HomeTab
    },
    SearchTab: {
        screen: SearchTab
    },
    AddMediaTab: {
        screen: AddMediaTab
    },
    LikesTab: {
        screen: LikesTab
    },
    ProfileTab: {
        screen: ProfileTab
    }
}, {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            }, indicatorStyle: {
                backgroundColor: '#00BFFF'
            },
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: true,
            showIcon: true,

        }
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
