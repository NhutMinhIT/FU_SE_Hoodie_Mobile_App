import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//Navigator
import Main from './Navigators/Main';

import ProductContainer from './Screens/Product/ProductContainer';
import Header from './Shared/Header';
import { customTheme } from './Theme';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


