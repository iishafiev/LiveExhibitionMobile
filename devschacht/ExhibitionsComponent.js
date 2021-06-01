import React from 'react';
import ExhibitionsService from './ExhibitionsService';
import {Text, View} from "react-native";

class ExhibitionsComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            exhibitions:[]
        }
    }

    componentDidMount(){
        ExhibitionsService.getExhibitions().then((response) => {
            this.setState({ exhibitions: response.data})
        });
    }

    render (){
        return (
            <View>
                <Text> Все выставки</Text>
                <table> className = "table table-striped">
                    <thead>
                    <tr>

                        <td> <Text>Название выставки</Text></td>
                        <td> <Text>Организатор выставки</Text></td>
                        <td> <Text>Краткое описание выставки</Text></td>
                        <td> <Text>Даты проведения выставки</Text></td>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        this.state.exhibitions.map(
                            exhibition =>
                                <tr key = {exhibition.id}>
                                    <td><Text> {exhibition.name}</Text></td>
                                    <td> <Text>{exhibition.organizer.fullName}</Text></td>
                                    <td><Text> {exhibition.shortDescription}</Text></td>
                                    <td> <Text>{exhibition.beginningDate} - {exhibition.endDate}</Text></td>
                                </tr>
                        )
                    }

                    </tbody>
                </table>

            </View>

        )
    }
}

export default ExhibitionsComponent
