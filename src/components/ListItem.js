import {View, Text} from 'react-native';
import React from 'react';

export default function ListItem({title, subtitle}) {
  return (
    <View style={{backgroundColor: '#fff', marginTop: 8}}>
      <View
        style={{
          height: 100,
          padding: 12,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{alignContent: 'flex-start'}}>
          <Text style={{color: 'black', fontSize: 26}}>{title}</Text>
          <Text style={{color: 'black', fontSize: 16}}>{subtitle}</Text>
        </View>
        <View style={{alignContent: 'flex-end'}}>
          <Text style={{color: 'black', fontSize: 12}}>chevron</Text>
        </View>
      </View>
    </View>
  );
}
