import React from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import data from "bootstrap/js/src/dom/data";
import moment from "moment";

class PersonalAccount extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#F5F4F4'}}>
        <Text style={styles.header}>Личный кабинет</Text>
        <Text style={styles.title}>Полное имя:</Text>
        <Text style={styles.pBlue}>{global.fullName}</Text>
        <Text style={styles.title}>Email:</Text>
        <Text style={styles.pBlue}>{global.email}</Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
    padding: 8,
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  mainBackground:{
    margin: 0,
    fontSize: 18,
    color: "black",
    backgroundColor: '#F5F4F4'
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
    padding: 5,
    margin: 5,
    borderColor: '#E7E7DE',
    borderWidth: 2,
    borderRadius: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    paddingVertical: 15,
    textAlign: 'center',
    fontWeight: "bold",
    color: '#0F3057',
  },
  title: {
    fontSize: 24,
    color: '#0F3057',
    padding: 5,
  },
  titleCenter: {
    fontSize: 18,
    color: '#0F3057',
    padding: 10,
    textAlign: 'center',
  },
  pBlue: {
    fontSize: 18,
    padding: 5,
    color: '#0F3057',
  },
  pBlueBold: {
    fontSize: 14,
    padding: 5,
    color: '#0F3057',
    fontWeight: "bold",
  },
  pBlack: {
    fontSize: 14,
    padding: 5,
  },
  descText: {
    fontSize: 14,
    padding: 5,
    width:180,
  },
  dates: {
    fontSize: 14,
    padding: 5,
    textAlign: 'center',
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

export default PersonalAccount;
