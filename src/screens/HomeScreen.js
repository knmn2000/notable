import {View, Text} from 'react-native';
import {FAB, Button, BottomSheet} from '@rneui/base';
import React from 'react';
import Header from '../components/Header';
import {STYLE} from '../styles';

export default function HomeScreen({navigation}) {
  return (
    <View style={STYLE.LAYOUT.homePageView}>
      <View>
        <Header />
        <Text style={{color: 'red'}}>stuff</Text>
      </View>
      <FAB
        title="Start a session"
        style={STYLE.LAYOUT.bottomCenterAlign}
        color={STYLE.PALETTE.darkBlue}
        onPress={() => navigation.navigate('RecorderScreen')}
      />
    </View>
  );
}
