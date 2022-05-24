import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

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
          <Icon name="chevron-right" color="black" size={24}/>
        </View>
      </View>
    </View>
  );
}
