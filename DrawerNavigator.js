import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ExhibitionsStackNavigator, MainStackNavigator } from "./StackNavigator";
import PersonalAccount from './PersonalAccount';
import FavouriteExhibitions from './FavouriteExhibitions';
import ExhibitionsList from './ExhibitionsList';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator style={{padding: 10, margin:10}}>
      <Drawer.Screen name="Выставки" component={ExhibitionsStackNavigator} />
      <Drawer.Screen name="Профиль" component={PersonalAccount} />
      <Drawer.Screen name="Избранное" component={FavouriteExhibitions} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
