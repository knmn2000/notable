import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, PermissionsAndroid} from 'react-native';

import {FAB, Input, Button, BottomSheet, Overlay, Divider} from '@rneui/base';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

import ListItem from '../components/ListItem';
import Header from '../components/Header';

import {STYLE} from '../styles';
import {NOTEBOOKS_PATH} from '../constants';

export default function HomeScreen({navigation}) {
  const [list, setList] = useState([]);
  const [overlay, toggleOverlay] = useState(false);
  const [notebookName, setNotebookName] = useState('');
  const handleOverlay = () => {
    toggleOverlay(!overlay);
  };
  const mkdir = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then(() => {
        RNFS.mkdir(`${NOTEBOOKS_PATH}/notebooks/${notebookName}`);
        toggleOverlay(false);
      });
    } catch (error) {
      //TODO: add error message
      console.log(error);
    }
  };
  const handleAddNotebook = () => {
    if (notebookName != '') {
      mkdir();
    }
  };

  const read = async () => {
    // adding /notebooks messed things ups TODO: FIX
    await RNFS.readDir(`${NOTEBOOKS_PATH}/notebooks`).then(f => {
      let narray = [];
      f.forEach(notebook => {
        if (notebook.isDirectory()) {
          const name = notebook.name;
          console.log(name);
          const created = new Date(notebook.mtime).toLocaleString();
          narray.push({name, subtitle: created});
        }
      });
      // Sorting by date created
      narray.sort(function (a, b) {
        return new Date(b.subtitle) - new Date(a.subtitle);
      });
      setList(narray);
    });
  };

  useEffect(() => {
    // check if the notebook folder exists
    const init = async () => {
      return await RNFS.exists(`${NOTEBOOKS_PATH}/notebooks`);
    };
    // if notebooks exists, then read, else create and .then(read)
    init().then(notebookDirExists => {
      if (!notebookDirExists) {
        RNFS.mkdir(`${NOTEBOOKS_PATH}/notebooks`).then(read);
      } else {
        read();
      }
    });
  }, [overlay]);
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
          <Input placeholder="Notebook name" onChangeText={setNotebookName} />
          <Divider />
          <Button title="Add" onPress={handleAddNotebook} />
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
