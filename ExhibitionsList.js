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
//import ExhibitionComponent from './ExhibitionComponent';

import SimpleDateTime  from "react-simple-timestamp-to-date";
import moment from 'moment';
import Icon from "react-native-vector-icons/FontAwesome";

export default class ExhibitionsList extends React.Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.state = {
      isLoading: true,
      userId: 0,
      chosenTag: "",
      chosenName: "",
    };
    this.getAllExhibitions();
  }

  async componentDidMount() {

  }

  async getAllExhibitions() {
    return await fetch('http://192.168.0.17:8080/api/getAllExhibitions')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          console.log(responseJson),
          function() {
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  async getExhibitionsByTag() {
    if (this.state.chosenTag == '') {
      this.getAllExhibitions();
    } else {
      let apiURL = 'http://192.168.0.17:8080/api/getExhibitionsByTag/' + this.state.chosenTag;
      return await fetch(apiURL)
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson,
            },
            console.log(responseJson),
            this.render(),
            function() {
            },
          );
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  async getExhibitionsByName() {
    if (this.state.chosenName == '') {
      this.getAllExhibitions();
    } else {
      let apiURL = 'http://192.168.0.17:8080/api/getExhibitionsByName/' + this.state.chosenName;
      return await fetch(apiURL)
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson,
            },
            console.log(responseJson),
            this.render(),
            function() {
            },
          );
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  std(string) {
    return moment(new Date(string)).format('DD-MM-YYYY');
  }

  handleTagChange(inputText) {
    this.state.chosenTag = inputText;
  }
  handleNameChange(inputText) {
    this.state.chosenName = inputText;
  }

  findByTagButtonPress() {
    console.log('findButtonPress' + this.state.chosenTag);
    this.getExhibitionsByTag();
  }
  findByNameButtonPress() {
    console.log('findButtonPress' + this.state.chosenName);
    this.getExhibitionsByName();
  }

  goToExhibitionInfo(exhibitionId, userId) {
    console.log('goToExhibitionInfo ' + exhibitionId + "   UserID: " + userId);
    this.props.navigation.navigate('Информация о выставке', {exhibitionId: exhibitionId, userId: userId});
  }

  render() {
    let bars = (<Icon.Button name="bars" size={30} color="black" backgroundColor={"#F5F4F4"} style={{paddingTop: 20}} onPress={()=>{ this.props.navigation.openDrawer();}}></Icon.Button>);
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    const { userData } = this.props.route.params;
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <View style={styles.container}>
          {bars}
          <Text style={styles.header}>Выставки</Text>
        </View>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={this.handleNameChange}
          placeholder="Поиск по названию"
          value={this.chosenName}
          onSubmitEditing={() => {
            this.findByNameButtonPress()
          }}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={this.handleTagChange}
          placeholder="Поиск по тегу"
          value={this.chosenTag}
          onSubmitEditing={() => {
            this.findByTagButtonPress()
          }}
        />
        <FlatList
          style={styles.mainBackground}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {this.goToExhibitionInfo(item.id, userData.userId)}}>
              <View style={styles.card}>

                  <Text style={styles.exhibitionName}>{item.name}</Text>
                  <Text style={styles.exhibitionOrganizer}>{item.organizer.fullName}</Text>
                  <View style={styles.hr} />
                  <Text style={styles.title}>{item.shortDescription}</Text>
                  <Text></Text>
                  <View style={styles.row}>
                    <Text style={{ flex: 1 }}>{item.tag.tagName}</Text>
                    <Text style={{
                      textAlign: 'right',
                      flex: 1
                    }}>{this.std(item.beginningDate)} - {this.std(item.endDate)}</Text>
                  </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainBackground:{
    margin: 10,
    fontSize: 18,
    color: "black",
    backgroundColor: '#F5F4F4'
  },
  container: {
    flex:1,
    justifyContent: 'space-between',
    backgroundColor: '#F5F4F4',
    padding: 8,
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  header: {
    fontSize: 24,
    paddingVertical: 15,
    paddingLeft:50,
    textAlign: 'left',
    fontWeight: "bold",
    color: '#0F3057',
    flexWrap:'wrap',
    width: 280,
  },
  textInputStyle:{
    marginHorizontal: 20,
    marginTop:15,
    borderColor: '#E7E7DE',
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
  },
  card: {
    padding: 20,
    margin: 10,
    borderColor: '#E7E7DE',
    borderWidth: 2,
    borderRadius: 10,
    flex: 1,
  },

  title: {
    fontSize: 14,
    color: '#000',
  },
  exhibitionName: {
    fontSize: 18,
    color: '#0F3057',
  },
  exhibitionOrganizer: {
    fontSize: 14,
    color: '#0F3057',
  },
  hr:{
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    padding:3,
  },
  row:{
    flexDirection: 'row',
    flex: 1,
  },
  inputRow:{
    flexDirection: 'row',
    flex: 1,
    height: 20,
  },
});



