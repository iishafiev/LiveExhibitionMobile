import React from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import data from "bootstrap/js/src/dom/data";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";

class ExhibitorInfo extends React.Component {

  constructor(props) {
    super(props);
    const exhibitorId = this.props.route.params.exhibitorId;
    this.goBack = this.goBack.bind(this);
    this.getExhibitorById = this.getExhibitorById.bind(this);
    this.state = {
      isLoading: true,
      exhibitorId: exhibitorId,
      dataSource: {}
    }
    this.getExhibitorById();
  }

  componentDidMount() {

  }

  async getExhibitorById() {
    let apiUrl = 'http://192.168.0.17:8080/api/getExhibitorById/' + this.state.exhibitorId;
    console.log(apiUrl);
    try {
      let response = await fetch(apiUrl);
      const responseJson = await response.json();
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        });
    } catch (error) {
      console.error(error);
    }
  }

  goBack(){
    this.props.navigation.goBack();
  }

  render() {
    const { dataSource, isLoading} = this.state;
    let backarrow = (<Icon.Button name="angle-left" size={30} color="black" backgroundColor={"#F5F4F4"} style={{paddingTop: 20}} onPress={this.goBack}></Icon.Button>);
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
          <Text style={styles.header}>{dataSource.fullName}</Text>
        </View>

        <Text style={styles.title}>Компания:</Text>
        <Text style={styles.pBlue}>{dataSource.company}</Text>
        <Text style={styles.title}>Email:</Text>
        <Text style={styles.pBlue}>{dataSource.email}</Text>
        <View style={{ marginVertical:15, backgroundColor: 'white'}}>
          <Text style={styles.pBlack}>{dataSource.description}</Text>
        </View>
        <Text style={styles.titleCenter}>Товары</Text>
        <FlatList
          style={styles.mainBackground}
          data={dataSource.goods}
          renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.pBlueBold}>{item.name}</Text>
                <View style={styles.hr} />
                <View style={styles.container}>
                  <Text style={styles.descText}>{item.description}</Text>
                  <Image source={{uri:item.photo}} style={{height:100,width:100}}/>
                </View>
              </View>
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
    width: 270,
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

export default ExhibitorInfo;
