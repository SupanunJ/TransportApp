import React, { Component } from 'react'
import { 
  Text,
  StyleSheet, 
  View,
  ImageBackground,
  Image
} from 'react-native'
import { StackNavigator } from "react-navigation";

import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import MainMenu from './components/MainMenu';
import mainScreen from "./components/mainScreen";
// import mainScreen2 from "./components/MenuTabBar/mainScreen2";
// import mainScreen3 from "./components/MenuTabBar/mainScreen3";
// import mainScreen4 from "./components/MenuTabBar/mainScreen4";
// import mainScreen5 from "./components/MenuTabBar/mainScreen5";

import mainService from "./components/services/mainService";

export default class App extends React.Component {

  state = {
    loaded: false
  }

  constructor(){
    super();
    mainService.load(v => this.setState({loaded: true}));
  }

  renderSection = () => {
    return <AppStackNavigator />;
  }

  renderLoad = () => {
    return(
      <ImageBackground style={styles.container}
      source={require('./assets/loader.jpg')}>
        <Image source={require('./assets/dplus.jpg')} 
                            style={{ width: 160, height: 133 }} />
      </ImageBackground>
    );
  }

  render() {
    return (
      
        this.state.loaded ? this.renderSection() : this.renderLoad()
    );
  }
}

const AppStackNavigator = StackNavigator({
  Login: {
    screen: Login
  },
  ForgetPassword: {
    screen: ForgetPassword
  },
  // MainMenu: {
  //   screen: MainMenu
  // },
  mainScreen: {
    screen: mainScreen
  },
  // mainScreen2: {
  //   screen: mainScreen2
  // },
  // mainScreen3: {
  //   screen: mainScreen3
  // },
  // mainScreen4: {
  //   screen: mainScreen4
  // },
  // mainScreen5: {
  //   screen: mainScreen5
  // },
},
{
  initialRouteName: 'Login',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
