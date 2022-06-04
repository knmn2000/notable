import {View, Text,SafeAreaView, Pressable, FlatList} from 'react-native';
import {FAB, Input, Button, BottomSheet, Overlay, Divider} from '@rneui/base';
import ListItem from '../components/ListItem';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Header from '../components/Header';
import {STYLE} from '../styles';
import RNFS from 'react-native-fs';
import {NOTEBOOKS_PATH} from '../constants';


// TODO: - MOVE THE PLAYING LOGIC TO A BOTTOM SHEET ON THE PAGES screen.
//         reserve the recorder screen for recording.
//       - PLAY ALL
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

  const PressableItem = ({item})=>(
    <Pressable
      onPress={() =>
        navigation.navigate('RecorderScreen', {
          pageName: item.name,
          sectionName: route.params.sectionName,
          notebookName: route.params.notebookName,
        })
      }>
      <ListItem
        title={item.name}
        containerStyle={{margin: 4, height: 80}}
        titleStyle={{color: 'black', fontWeight: 'bold', margin: 4}}
        subtitle={item.subtitle}
        bottomDivider
        chevron
      />
    </Pressable>
  )
  return (
    <SafeAreaView style={STYLE.LAYOUT.homePageView}>
      <Header headerText="Pages" />
      <View style={{flex: 1}}>
        <FlatList style={{padding: 8, margin: 8}}
          data={list}
          renderItem={PressableItem}
          keyExtractor={item => item.name}
          />
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
        style={STYLE.LAYOUT.bottomLeftAlignAbsolute}
        icon={<Icon name="add" size={24} color="#fff" />}
        color={STYLE.PALETTE.darkBlue}
        // TODO: Add new page functionality
        onPress={handleOverlay}
      />
    </SafeAreaView>
  );
}
