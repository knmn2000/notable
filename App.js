import React from 'react';
import {SafeAreaView, StatusBar, LogBox} from 'react-native';
import {STYLE} from './src/styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RecorderScreen from './src/screens/RecorderScreen';
import PageScreen from './src/screens/PageScreen';
import SectionScreen from './src/screens/SectionScreen';
// import reactNativeUpiPayment from 'react-native-upi-payment';

const Stack = createNativeStackNavigator();
const Options = {
  headerShown: false,
  contentStyle: {backgroundColor: STYLE.PALETTE.offWhite},
};

const App = () => {
  /*
  how to setup notebooks and pages:
  1 
    set up pseudo directories and sub directories which point to the files that are contained within them
    this way, in the actual storage, there will only be a single directory containing all the audio files, but 
    on the app, it looks like things are segregated. the segregation logic will be handled based on file name
    like : notebookName_pageName.mp3
    (easier)
  2
    actually have directories and subdirectories and list out the files within them (cleaner and logical, but is it required?)
  */
  LogBox.ignoreLogs([
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Require cycle: node_modules/rn-fetch-blob/index.js',
    'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
    'Require cycle',
  ]);
  return (
    <SafeAreaView style={STYLE.LAYOUT.safeArea}>
      <StatusBar animated={true} barStyle="dark-content" />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={Options}
            />
            <Stack.Screen
              name="SectionScreen"
              component={SectionScreen}
              options={Options}
            />
            <Stack.Screen
              name="PageScreen"
              component={PageScreen}
              options={Options}
            />
            <Stack.Screen
              name="RecorderScreen"
              component={RecorderScreen}
              options={Options}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

export default App;
