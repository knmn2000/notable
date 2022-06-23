import {Button, Divider, FAB, Input, Overlay} from '@rneui/base';
import {Dimensions, Platform, FlatList, Pressable, SafeAreaView, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import React, {useEffect, useState, useMemo} from 'react';
import RNFS from 'react-native-fs';

import BottomSheetPlayer from '../components/BottomSheetPlayer';
import {NOTEBOOKS_PATH} from '../constants';
import {STYLE} from '../styles';
import Header from '../components/Header';
import ListItem from '../components/ListItem';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
// TODO: - MOVE THE PLAYING LOGIC TO A BOTTOM SHEET ON THE PAGES screen.
//         reserve the recorder screen for recording.
//       - PLAY ALL
export default function PageScreen({route, navigation}) {
  // REFACTOR INTO UTIL FILE
  const screenWidth = Dimensions.get('screen').width;
  const [selectedPage, setSelectedPage] = useState('');
  const path = Platform.select({
    ios: `${selectedPage}.m4a`,
    // use rn-fs to check if "await RNFS.exist(filepath)", else create file path
    android: `${NOTEBOOKS_PATH}/notebooks/${route.params.notebookName}/${route.params.sectionName}/${selectedPage}`,
  });
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState();
  useMemo(() => {
    setAudioRecorderPlayer(new AudioRecorderPlayer());
  }, []);
  const [playerState, setPlayerState] = useState({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });
  let playWidth =
    (playerState.currentPositionSec / playerState.currentDurationSec) *
    (screenWidth - 56);

  if (!playWidth) {
    playWidth = 0;
  }

  const onStatusPress = e => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    playWidth =
      (playerState.currentPositionSec / playerState.currentDurationSec) *
      (screenWidth - 56);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(playerState.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  const goBackward = async () => {
    const currentPosition = Math.round(playerState.currentPositionSec);
    const timestamp = Math.round(currentPosition - 5000);
    audioRecorderPlayer.seekToPlayer(timestamp);
  };
  const goForward = async () => {
    const currentPosition = Math.round(playerState.currentPositionSec);
    const timestamp = Math.round(currentPosition + 5000);
    audioRecorderPlayer.seekToPlayer(timestamp);
  };
  const onStartPlay = async () => {
    // setIsPlaying(true);
    const msg = await audioRecorderPlayer.startPlayer(`${NOTEBOOKS_PATH}/notebooks/${route.params.notebookName}/${route.params.sectionName}/${selectedPage}`);
    const volume = await audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    audioRecorderPlayer.addPlayBackListener(e => {
      setPlayerState({
        ...playerState,
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  const onPausePlay = async () => {
    // setIsPlaying(false);
    await audioRecorderPlayer.pausePlayer();
  };

  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
  };

  const onStopPlay = async () => {
    // setIsPlaying(false);
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };
  useEffect(() => {
    audioRecorderPlayer.setSubscriptionDuration(0.1);
    return () => {
      onStopPlay();
    };
  }, [audioRecorderPlayer]);
  // REFACTOR INTO UTIL FILE
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
      sectionName: route.params.sectionName,
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
    navigation.addListener('focus', () => {
      read();
    });
    read();
  }, [overlay]);

  const PressableItem = ({item}) => (
    <Pressable
      onPress={() =>
        // navigation.navigate('RecorderScreen', {
        //   pageName: item.name,
        //   sectionName: route.params.sectionName,
        //   notebookName: route.params.notebookName,
        // })
        {
          setSelectedPage(item.name);
          onStartPlay();
        }
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
  );
  return (
    <SafeAreaView style={STYLE.LAYOUT.homePageView}>
      <Header headerText="Pages" />
      <View style={{flex: 1}}>
        <FlatList
          style={{padding: 8, margin: 8}}
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
        style={{...STYLE.LAYOUT.bottomLeftAlignAbsolute, bottom: 120}}
        icon={<Icon name="add" size={24} color="#fff" />}
        color={STYLE.PALETTE.darkBlue}
        // TODO: Add new page functionality
        onPress={handleOverlay}
      />
      <BottomSheetPlayer />
    </SafeAreaView>
  );
}
