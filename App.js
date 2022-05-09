import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {STYLE} from './src/styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RecorderScreen from './src/screens/RecorderScreen';
// import reactNativeUpiPayment from 'react-native-upi-payment';

const Stack = createNativeStackNavigator();
const Options = {
  headerShown: false,
  contentStyle: {backgroundColor: STYLE.PALETTE.offWhite},
};

const App = () => {
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
