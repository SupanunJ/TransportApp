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
import mainScreen from "./components/mainScreen";

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
  mainScreen: {
    screen: mainScreen
  }
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
