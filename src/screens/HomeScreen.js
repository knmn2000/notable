import {View, Text, Pressable} from 'react-native';
import {FAB, Input, Button, BottomSheet, Overlay, Divider} from '@rneui/base';
import ListItem from '../components/ListItem';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Header from '../components/Header';
import {STYLE} from '../styles';

export default function HomeScreen({navigation}) {
  const list = [
    {
      name: 'Bio',
      subtitle: 'Created: 11-04-21',
    },
    {
      name: 'Physics notes',
      subtitle: 'Created: Last night',
    },
    {
      name: 'Music theory',
      subtitle: 'Created: 11-04-21',
    },
    {
      name: 'ideas',
      subtitle: 'Created: 11-04-21',
    },
    {
      name: 'stock market',
      subtitle: 'Created: 11-04-21',
    },
  ];
  const [overlay, toggleOverlay] = useState(false);
  const handleOverlay = () => {
    toggleOverlay(!overlay);
  };
  return (
    <View style={STYLE.LAYOUT.homePageView}>
      <View>
        <Header headerText="Notebooks" />
        <View style={{padding: 8, margin: 8}}>
          {list.map((l, i) => (
            <Pressable
              key={i}
              onPress={() =>
                navigation.navigate('PageScreen', {notebookName: l.name})
              }>
              {/* TODO: https://github.com/jemise111/react-native-swipe-list-view */}
              <ListItem
                key={i}
                title={l.name}
                containerStyle={{margin: 4, height: 80}}
                titleStyle={{color: 'black', fontWeight: 'bold', margin: 4}}
                subtitle={l.subtitle}
                bottomDivider
                chevron
              />
            </Pressable>
          ))}
        </View>
      </View>
      <Overlay
        isVisible={overlay}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor="transparent"
        width="auto"
        height="auto"
        overlayStyle={{
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: 'transparent',
          borderRadius: 14,
        }}
        onBackdropPress={handleOverlay}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 20,
            width: 200,
            padding: 12,
            backgroundColor: STYLE.PALETTE.offWhite,
          }}>
          <Input placeholder="Notebook name" />
          <Divider />
          <Button title="Add" onPress={() => console.log('brrr')} />
        </View>
      </Overlay>
      <FAB
        style={STYLE.LAYOUT.bottomLeftAlign}
        icon={<Icon name="add" size={24} color="#fff" />}
        color={STYLE.PALETTE.darkBlue}
        // TODO: Add new notebook functionality
        onPress={handleOverlay}
      />
    </View>
  );
}
