import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ExhibitionsList from './ExhibitionsList';
import ExhibitionInfo from './ExhibitionInfo';
import Login from './Login';
import ExhibitorInfo from './ExhibitorInfo';
import PersonalAccount from './PersonalAccount';
import FavouriteExhibitions from './FavouriteExhibitions';
import DrawerNavigator from './DrawerNavigator'

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="Профиль"
        component={DrawerNavigator}
      />

      <Stack.Screen
        name="Выставки"
        component={ExhibitionsList}
      />
      <Stack.Screen
        name="Информация о выставке"
        component={ExhibitionInfo}
      />
      <Stack.Screen
        name="Информация об участнике"
        component={ExhibitorInfo}
      />
    </Stack.Navigator>
  );
}

const ExhibitionsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
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
      <Stack.Screen
        name="Информация об участнике"
        component={ExhibitorInfo}
      />
    </Stack.Navigator>
  );
}

export { MainStackNavigator,  ExhibitionsStackNavigator };
