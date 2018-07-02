import React, { Component } from 'react'
import { Text, StyleSheet, View, Platform, StatusBar } from 'react-native'

import HomeTab from './AppTabNavigator/HomeTab';
import AddMediaTab from './AppTabNavigator/AddMediaTab';
import LikesTab from './AppTabNavigator/LikesTab';
import ProfileTab from './AppTabNavigator/ProfileTab';
import SearchTab from './AppTabNavigator/SearchTab';

import CheckWork from './AppTabNavigator/DetailTab/CheckWork';
import MapScreen from './AppTabNavigator/DetailTab/MapScreen'

import { TabNavigator, StackNavigator } from 'react-navigation'

import { Icon } from 'native-base'

class TabPage extends Component {

    static navigationOptions = {
        header: null
    }

  render() {
    
    return (
      <AppTabNavigator screenProps={{ rootNavigation: this.props.screenProps.rootNavigation}} />
    )
  }
}

export default TabPage;

const Checking = StackNavigator({
    Home: {
        screen: HomeTab,
        navigationOptions: () => ({
            header: null
          }),
    },
    CheckWork: {
        screen: MapScreen,
        navigationOptions: () => ({
            header: null
          }),
    }
})

const AppTabNavigator = TabNavigator({
    HomeTab: {
        screen: Checking,
        navigationOptions: () => ({
            tabBarLabel: "ตรวจ",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-create" style={{
                    color:
                        tintColor
                }} />
            )
        })
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
        swipeEnabled: false,
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
        },
    });

const styles = StyleSheet.create({})
