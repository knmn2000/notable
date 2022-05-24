import {View, Text, Pressable} from 'react-native';
import {FAB, Input, Button, BottomSheet, Overlay, Divider} from '@rneui/base';
import ListItem from '../components/ListItem';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Header from '../components/Header';
import {STYLE} from '../styles';
import RNFS from 'react-native-fs';
import {NOTEBOOKS_PATH} from '../constants';

export default function PageScreen({route, navigation}) {
  const [list, setList] = useState([]);
  const [overlay, toggleOverlay] = useState(false);
  const [pageName, setPageName] = useState('');
  const handleOverlay = () => {
    toggleOverlay(!overlay);
  };
  const handleAddPage = () => {
    handleOverlay();
    navigation.navigate('RecorderScreen', {
      pageName,
      notebookName: route.params.notebookName,
      sectionName:  route.params.sectionName,
    });
  };
  const read = async () => {
    // adding /notebooks messed things ups TODO: FIX
    await RNFS.readDir(
      `${NOTEBOOKS_PATH}/notebooks/${route.params.notebookName}/${route.params.sectionName}`,
    ).then(f => {
      // console.log(`${NOTEBOOKS_PATH}/notebooks/${route.params.notebookName}/${route.params.sectionName}`);
      // console.log(f);
      let narray = [];
      f.forEach(notebook => {
        const name = notebook.name;
        // console.log(name);
        const created = new Date(notebook.mtime).toLocaleString();
        narray.push({name, subtitle: created});
      });
      // Sorting by date created
      narray.sort(function (a, b) {
        return new Date(b.subtitle) - new Date(a.subtitle);
      });
      setList(narray);
    });
  };

  useEffect(() => {
    navigation.addListener('focus', 
      ()=>{
        console.log("brr")
        read();
      } 
    )
      console.log("brr2")
    read();
  }, [overlay]);
  return (
    <View style={STYLE.LAYOUT.homePageView}>
      <View>
        <Header headerText="Pages" />
        <View style={{padding: 8, margin: 8}}>
          {list.length != 0 &&
            list.map((l, i) => (
              <Pressable
                key={i}
                onPress={() =>
                  navigation.navigate('RecorderScreen', {
                    pageName: l.name,
                    sectionName: route.params.sectionName,
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
                />
              </Pressable>
            ))}
          {list.length == 0 && <Text style={{color: 'black'}}>Khali hai</Text>}
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
          <Input placeholder="Page name" onChangeText={setPageName} />
          <Divider />
          <Button title="Add" onPress={handleAddPage} />
        </View>
      </Overlay>
      <FAB
        style={STYLE.LAYOUT.bottomLeftAlign}
        icon={<Icon name="add" size={24} color="#fff" />}
        color={STYLE.PALETTE.darkBlue}
        // TODO: Add new page functionality
        onPress={handleOverlay}
      />
    </View>
  );
}
