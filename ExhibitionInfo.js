import React from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import data from "bootstrap/js/src/dom/data";
import moment from "moment";
import { HeartOutlined } from '@ant-design/icons';
import Icon from 'react-native-vector-icons/FontAwesome';

class ExhibitionInfo extends React.Component {

  constructor(props) {
    super(props);
    const exhibitionId = this.props.route.params.exhibitionId;

    this.getExhibitionById = this.getExhibitionById.bind(this);
    this.isExhibitionInFavourites = this.isExhibitionInFavourites.bind(this);
    this.addToFavourites = this.addToFavourites.bind(this);
    this.removeFromFavourites = this.removeFromFavourites.bind(this);
    this.goBack = this.goBack.bind(this);

    this.state = {
      isLoading: true,
      exhibitionId: exhibitionId,
      dataSource: {},
      isFavourite: false,
    }
    this.getExhibitionById();
  }

  componentDidMount() {

  }
  goBack(){
    this.props.navigation.goBack();
  }

  async getExhibitionById() {
    let apiUrl = 'http://192.168.0.17:8080/api/getExhibition/' + this.state.exhibitionId;
    console.log(apiUrl);
    try {
      let response = await fetch(apiUrl);
      const responseJson = await response.json();
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        });
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
    this.isExhibitionInFavourites();
  }

  async isExhibitionInFavourites() {
    let apiUrl = 'http://192.168.0.17:8080/api/isExhibitionInFavourites/' + this.state.exhibitionId + "/" + global.id;
    console.log(apiUrl);
    try {
      let response = await fetch(apiUrl);
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.id == null)
        this.setState(
          {
            isLoading: false,
            isFavourite: false,
          });
      else
        this.setState(
          {
            isLoading: false,
            isFavourite: true,
          });
      console.log(responseJson.id);
    } catch (error) {
      console.error(error);
    }
  }

  async addToFavourites() {
    console.log("push add");
    const {exhibitionId} = this.state;
    let apiUrl = 'http://192.168.0.17:8080/api/addToFavourites/' + this.state.exhibitionId + "/" + global.id;
    console.log(apiUrl);
    try {
      let response = await fetch(apiUrl);
      console.log(response);
      const responseJson = await response.json();
      console.log(responseJson);
      console.log(responseJson.id == null);
      if (responseJson.id == null)
        this.setState(
          {
            isLoading: false,
            isFavourite: false,
          });
      else
        this.setState(
          {
            isLoading: false,
            isFavourite: true,
          });
      console.log(responseJson.id);
    } catch (error) {
      console.error(error);
    }
  }

  std(string) {
    return moment(new Date(string)).format('DD-MM-YYYY');
  }

  goToExhibitorInfo(exhibitorId){
    this.props.navigation.navigate('Информация об участнике', {exhibitorId: exhibitorId});
  }

  async removeFromFavourites () {
    console.log("push remove");
    let apiUrl = 'http://192.168.0.17:8080/api/removeFromFavourites/' + this.state.exhibitionId + "/" + global.id;
    console.log(apiUrl);
    try {
      let response = await fetch(apiUrl);
      console.log(response);
      const responseJson = await response.json();
      console.log(responseJson);
      console.log(responseJson.id == null);
      if (responseJson.id == null)
        this.setState(
          {
            isLoading: false,
            isFavourite: true,
          });
      else
        this.setState(
          {
            isLoading: false,
            isFavourite: false,
          });
      console.log(responseJson.id);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    let myIcon;
    if (this.state.isFavourite)
      myIcon = (<Icon.Button name="heart" size={30} color="red" backgroundColor={"#F5F4F4"} style={{paddingTop: 30}} onPress={this.removeFromFavourites}></Icon.Button>);
    else
      myIcon= (<Icon.Button name="heart-o" size={30} color="red" backgroundColor={"#F5F4F4"} style={{paddingTop: 30}} onPress={this.addToFavourites}></Icon.Button>);

    let backarrow = (<Icon.Button name="angle-left" size={30} color="black" backgroundColor={"#F5F4F4"} style={{paddingTop: 30}} onPress={this.goBack}></Icon.Button>);

    const { dataSource, isLoading, isFavourite} = this.state;
    console.log("isFavourite - " + isFavourite);
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#F5F4F4'}}>
        <View style={styles.container}>
          {backarrow}
          <Text style={styles.header}>{dataSource.name}</Text>
          {myIcon}
        </View>
        <Text style={styles.title}>Организатор:</Text>
        <Text style={styles.pBlue}>{dataSource.organizer.fullName}</Text>
        <Text style={styles.title}>Компания:</Text>
        <Text style={styles.pBlue}>{dataSource.organizer.company}</Text>
        <View style={{ marginVertical:15, backgroundColor: 'white'}}>
          <Text style={styles.pBlack}>{dataSource.shortDescription}</Text>
          <Text style={styles.dates}>{this.std(dataSource.beginningDate)} - {this.std(dataSource.endDate)}</Text>
        </View>
        <Text style={styles.pBlack}>{dataSource.description}</Text>
        <Text style={styles.titleCenter}>Участники выставки</Text>
        <FlatList
          style={styles.mainBackground}
          data={dataSource.applications}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {this.goToExhibitorInfo(item.exhibitor.id)}}>
              <View style={styles.card}>
                <Text style={styles.pBlueBold}>{item.exhibitor.fullName}</Text>
                <Text style={styles.pBlue}>{item.exhibitor.company}</Text>
                <View style={styles.hr} />
                <Text style={styles.pBlack}>{item.exhibitor.description}</Text>
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
    justifyContent: 'space-between',
    backgroundColor: '#F5F4F4',
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
    flexWrap:'wrap',
    width: 210,
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

export default ExhibitionInfo;
