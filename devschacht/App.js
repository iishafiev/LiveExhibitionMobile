/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}*/
/*import React, { memo, useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import ExhibitionsComponent from "./ExhibitionsComponent";
export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/getAllExhibitions')
            .then(response => response.json())
            .then((responseJson) => {
                // const ds = new FlatList.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                setIsLoading(false);
                setData(responseJson);
                console.log(data);
            }, () => {
                // do something with new state
            })
            .catch((error) => {
                console.error(error);
            });
        fetch('https://facebook.github.io/react-native/movies.json').then((response) => response.json()).then((json) => {
            return data.names;
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <View style={styles.container}>
            {
                isLoading &&
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            }
            {
                !isLoading &&
                <View style={{justifyContent: 'center', flex: 1}}>
                    <FlatList style={{borderWidth: 1, borderColor: "gray", borderRadius: 5, margin: 10, padding: 5}}


                              data={data?.movies}
                              keyExtractor={item => item.id} ListHeaderComponent={() => (
                            <View>
                                <Text style={{color: 'blue', fontSize: 28,}}>{data?.title}</Text>
                                <Text style={{color: 'brown', fontSize: 18,}}>{data?.description}</Text>
                            </View>
                            )}
                            renderItem={({item}) => (
                                <Text style={styles.paragraph}>
                                    {` - ${item?.title}: ${item?.releaseYear}`}
                                </Text>
                            )}
                    />
                </View>
            }
        </View>
    );
}
*/
import React from 'react';
import ExhibitionsComponent from './ExhibitionsComponent';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
export default function App() {
    const elem = <ExhibitionsComponent/>;
    return (
        <View>
        <Text> {elem}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
