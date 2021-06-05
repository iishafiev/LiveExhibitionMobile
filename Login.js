/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  ActivityIndicator, Button,
  FlatList, Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TextInput, TouchableHighlight, TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import 'react-native-gesture-handler';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.state = {
      isLoading: true,
      userId: 0,
      userName:"",
      userEmail: "",
      userPassword: "",
      loginErrorFlag: false
    }
  }

  getEmail(inputText) {
    this.state.userEmail = inputText;
    console.log("email:" + this.state.userEmail);
  }
  getPassword(inputText) {
    this.state.userPassword= inputText;
    console.log("password:" + this.state.userPassword);
  }
  async sendLogin() {
    console.log("login password: " + this.state.userEmail + " " + this.state.userPassword);
    var loginData = {
      "username": this.state.userEmail,
      "password": this.state.userPassword,
    }
    console.log("post request: " + JSON.stringify(loginData));
    let response = await fetch("http://192.168.0.17:8080/api/getAuthUser", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(loginData),
    });
    console.log("Ответ сервера: " + response);
    let responseJson = await response.json();

    global.email = responseJson.email;
    global.id =  responseJson.id;
    global.fullName =  responseJson.fullName;

    if(responseJson.id == null)
      this.loginError();
    else
      this.loginSuccess(responseJson);
  }

  loginError(){
    console.log("Null Answer");
    this.setState({loginErrorFlag : true});
    console.log("loginError: " + this.state.loginErrorFlag);
  }
  loginSuccess(response){
    console.log("Right Answer");
    this.setState({
      loginErrorFlag : false,
      userEmail: response.email,
      userName: response.fullName,
      userId: response.id,
      responseData : response,
    });
    console.log(this.state);
    this.props.navigation.replace('Выставки', {userData: this.state});
  }

  render() {
    if(this.state.loginErrorFlag) {
      console.log("error render");
      console.log(this.state.userEmail + " " + this.state.userPassword);
      return (
        <View style={{ flex: 1, paddingTop: 140 }}>
          <Text style={styles.headerLog}>Live Exhibition</Text>
          <TextInput
            style={styles.textInputStyleLog}
            placeholder="Email"

            onChangeText={this.getEmail}
          />
          <Text></Text>
          <TextInput
            style={styles.textInputStyleLog}
            secureTextEntry={true}
            placeholder="Пароль"

            onChangeText={this.getPassword}
          />
          <Text></Text>
          <Text style={styles.errorText}>Неверный логин или пароль</Text>
          <Text></Text>
          <View style={styles.container}>
            <TouchableOpacity onPress={this.sendLogin} style={styles.button}>
              <Text style={styles.text}>Вход</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else{
      console.log("right render");
      return(
        <View style={{ flex: 1, paddingTop: 140 }}>
          <Text style={styles.headerLog}>Live Exhibition</Text>
          <TextInput
            style={styles.textInputStyleLog}
            placeholder="Email"

            onChangeText={this.getEmail}
          />
          <Text></Text>
          <TextInput
            style={styles.textInputStyleLog}
            secureTextEntry={true}
            placeholder="Пароль"

            onChangeText={this.getPassword}
          />
          <Text></Text>
          <View style={styles.container}>
            <TouchableOpacity onPress={this.sendLogin} style={styles.button}>
              <Text style={styles.text}>Вход</Text>
            </TouchableOpacity>
          </View>
        </View>
      );}
  }
}
const styles = StyleSheet.create({
    headerLog: {
      fontSize: 36,
      textAlign: 'center',
    },
    textInputStyleLog: {
      marginHorizontal: 20,
      marginTop: 15,
      borderColor: '#E7E7DE',
      borderWidth: 2,
      borderRadius: 10,
      height: 50,
    },
    container: {
      alignItems: 'center',
    },
    button: {
      padding: 5,
      margin: 10,
      width: 270,
      height: 40,
      backgroundColor: '#004E98',
      borderWidth: 2,
      borderRadius: 10,
    },
    text: {
      textAlign: 'center',
      color: 'white',
      fontSize: 18,
    },
    errorText: {
      textAlign: 'center',
      color: 'red',
      fontSize: 18,
    }
  }
);
/*
<NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Вход"
            component={Login}
          />
          <Stack.Screen
            name="Выставки"
            component={ExhibitionsList}
          />
          <Stack.Screen
            name="Информация о выставке"
            component={ExhibitionInfo}
          />
        </Stack.Navigator>
      </NavigationContainer>
 */


