import * as React from 'react';
// import Splass from './src/screen/home';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/navigations';
import 'react-native-gesture-handler';
import { LogBox, View } from 'react-native';
// import RR from './src/screen/home';

export default function App() {
  return (
    // <View>
    //   <RR />
    // </View>
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>

  )
}