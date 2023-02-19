import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

//REDUX
import { Provider } from 'react-redux';
import store from './Redux/store';

//Context API
import Auth from './Context/store/Auth';

//Navigator
import Main from './Navigators/Main';
import ProductContainer from './Screens/Product/ProductContainer';
import Header from './Shared/Header';
import { customTheme } from './Theme';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider theme={customTheme}>
          <NavigationContainer>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>

  );
}


