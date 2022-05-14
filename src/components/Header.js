import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {Header, HeaderProps, Icon} from '@rneui/base';
import {STYLE} from '../styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function header({headerText}) {
  console.log(headerText);
  return (
    <Header
      backgroundColor={STYLE.PALETTE.offBlack}
      centerComponent={{
        text: headerText,
        style: {color: '#fff', fontSize: 20},
      }}
    />
  );
}
