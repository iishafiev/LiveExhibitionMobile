/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import type {Node} from 'react';
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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ExhibitionsList from './ExhibitionsList';
import ExhibitionInfo from './ExhibitionInfo';
import Login from './Login';
import ExhibitorInfo from './ExhibitorInfo';
import DrawerNavigator from './DrawerNavigator'
import { MainStackNavigator } from "./StackNavigator";
//import PersonalAccount from './PersonalAccount';
//import FavouriteExhibitions from './FavouriteExhibitions';

const Stack = createStackNavigator();
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
    );
  }
}


