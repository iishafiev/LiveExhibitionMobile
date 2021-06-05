import React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import data from "bootstrap/js/src/dom/data";
import moment from "moment";

class FavouriteExhibitions extends React.Component {

  constructor(props) {
    super(props);

    this.getFavouriteExhibitions = this.getFavouriteExhibitions.bind(this);
    this.goToExhibitionInfo = this.goToExhibitionInfo.bind(this);

    this.state = {
      isLoading: true,
      dataSource: {},
    } ;
    this.getFavouriteExhibitions();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {this.getFavouriteExhibitions(); this.render();});
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async getFavouriteExhibitions() {
    let apiURL = 'http://192.168.0.17:8080/api/getFavouriteExhibitionsByUserId/' + global.id;
    console.log(apiURL);
    return await fetch(apiURL)
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

  std(string) {
    return moment(new Date(string)).format('DD-MM-YYYY');
  }

  goToExhibitionInfo(exhibitionId) {
    console.log('goToExhibitionInfo ' + exhibitionId);
    this.props.navigation.navigate('Информация о выставке', {exhibitionId: exhibitionId});
  }
  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const userData = global.id;

    console.log("render:userData = " + userData);
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text style={styles.header}>Избранные выставки</Text>
        <FlatList
          style={styles.mainBackground}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {this.goToExhibitionInfo(item.id)}}>
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
    fontSize: 18,
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
    fontSize: 14,
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

export default FavouriteExhibitions;
