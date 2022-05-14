import {View, Text, Pressable} from 'react-native';
import {FAB, Button, BottomSheet} from '@rneui/base';
import ListItem from '../components/ListItem';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Header from '../components/Header';
import {STYLE} from '../styles';

export default function PageScreen({route, navigation}) {
  const list = [
    {
      name: 'Chap 1',
      subtitle: 'Created: 11-04-21',
    },
    {
      name: 'side notes',
      subtitle: 'Created: Last night',
    },
    {
      name: 'chap 2 exercise',
      subtitle: 'Created: 11-04-21',
    },
    {
      name: 'chap 3 doubts',
      subtitle: 'Created: 11-04-21',
    },
    {
      name: 'chap 4',
      subtitle: 'Created: 11-04-21',
    },
  ];
  console.log(route.params);
  return (
    <View style={STYLE.LAYOUT.homePageView}>
      <View>
        <Header headerText="Pages" />
        <View style={{padding: 8, margin: 8}}>
          {list.map((l, i) => (
            <Pressable
              key={i}
              onPress={() =>
                navigation.navigate('RecorderScreen', {
                  pageName: l.name,
                  notebookName: route.params.notebookName,
                })
              }>
              <ListItem
                key={i}
                title={l.name}
                containerStyle={{margin: 4, height: 80}}
                titleStyle={{color: 'black', fontWeight: 'bold', margin: 4}}
                subtitle={l.subtitle}
                bottomDivider
                chevron
                onPress={() => navigation.navigate('RecorderScreen')}
              />
            </Pressable>
          ))}
        </View>
      </View>
      <FAB
        style={STYLE.LAYOUT.bottomLeftAlign}
        icon={<Icon name="add" size={24} color="#fff" />}
        color={STYLE.PALETTE.darkBlue}
        // TODO: Add new page functionality
        onPress={() => navigation.navigate('RecorderScreen')}
      />
    </View>
  );
}
