import React, {useEffect, useState, useMemo} from 'react';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {Button} from '@rneui/base';
import {
  Dimensions,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NOTEBOOKS_PATH} from '../constants';
import {STYLE} from '../styles';
import PlaybackButtons from '../components/playbackButtons';
import RecordingButtons from '../components/recordingButtons';

// TODO: show error when trying to play an empty file/recording
// RECORDING KE LIYE NICE NICE UI BANANA HAI

const RecorderScreen = ({route, navigation}) => {
  const {pageName, notebookName, sectionName} = route.params;
  const screenWidth = Dimensions.get('screen').width;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingPaused, setIsRecordingPaused] = useState(false);
  const path = Platform.select({
    ios: `${pageName}.m4a`,
    // use rn-fs to check if "await RNFS.exist(filepath)", else create file path
    android: `${NOTEBOOKS_PATH}/notebooks/${notebookName}/${sectionName}/${pageName}`,
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

  const onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        setIsRecording(true);
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        setIsRecording(false);
        console.warn(err);
        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

    audioRecorderPlayer.addRecordBackListener(e => {
      console.log('record-back', e);
      setPlayerState({
        ...playerState,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
    });
    console.log(`uri: ${uri}`);
  };

  const onPauseRecord = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      console.log('pauseRecord', err);
    } finally {
      setIsRecording(false);
      setIsRecordingPaused(true);
    }
  };

  const onResumeRecord = async () => {
    setIsRecording(true);
    await audioRecorderPlayer.resumeRecorder();
  };

  const onStopRecord = async () => {
    setIsRecording(false);
    setIsRecordingPaused(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setPlayerState({...playerState, recordSecs: 0});
    console.log(result);
  };

  const onStartPlay = async () => {
    setIsPlaying(true);
    const msg = await audioRecorderPlayer.startPlayer(path);
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
    setIsPlaying(false);
    await audioRecorderPlayer.pausePlayer();
  };

  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
  };

  const onStopPlay = async () => {
    setIsPlaying(false);
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
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleTxt}>{route.params.pageName}</Text>
      <Text style={styles.txtRecordCounter}>{isRecording ? 'Recording...' : isRecordingPaused ? 'Paused' : ''}</Text>
      <Text style={styles.txtRecordCounter}>{playerState.recordTime}</Text>
      {/* playback viewer */}
      <View style={styles.viewPlayer}>
        {/* <TouchableOpacity style={styles.viewBarWrapper} onPress={onStatusPress}>
          <View style={styles.viewBar}>
            <View style={[styles.viewBarPlay, {width: playWidth}]} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txtCounter}>
          {playerState.playTime} / {playerState.duration}
        </Text> */}
        <PlaybackButtons
          isPlaying={isPlaying}
          goForward={goForward}
          goBackward={goBackward}
          onStartPlay={onStartPlay}
          onPausePlay={onPausePlay}
        />
        <RecordingButtons
          isRecording={isRecording}
          onStartRecord={onStartRecord}
          onPauseRecord={onPauseRecord}
          onResumeRecord={onResumeRecord}
          onStopRecord={onStopRecord}
          isRecordingPaused={isRecordingPaused}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: STYLE.PALETTE.offWhite,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: 100,
    color: STYLE.PALETTE.offBlack,
    fontSize: 28,
  },
  viewRecorder: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
    width: '70%',
    justifyContent: 'space-between',
    display: 'flex',
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1,
    margin: 14,
  },
  txt: {
    color: STYLE.PALETTE.offBlack,
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  txtRecordCounter: {
    marginTop: 32,
    color: STYLE.PALETTE.offBlack,
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: STYLE.PALETTE.offBlack,
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});

export default RecorderScreen;
