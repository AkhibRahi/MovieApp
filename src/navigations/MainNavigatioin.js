import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MovieListScreen from '../screens/movieListScreen/movieListScreen';
import appRoutes from '../utils/constants/app.routes';
import MovieDetailScreen from '../screens/movieDetailScreen/movieDetailScreen';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={appRoutes.MovieListScreen}>
      <Stack.Screen
        name={appRoutes.MovieListScreen}
        component={MovieListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={appRoutes.MovieDetailScreen}
        component={MovieDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
