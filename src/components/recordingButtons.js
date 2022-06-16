import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {STYLE} from '../styles';
import {Button} from '@rneui/base';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
    width: '70%',
    justifyContent: 'space-evenly',
    display: 'flex',
  },
});
export default function RecordingButtons({
  isRecording,
  onStopRecord,
  onStartRecord,
  onPauseRecord,
  onResumeRecord,
  isRecordingPaused,
}) {
  return (
    <View style={styles.playBtnWrapper}>
      <Button
        buttonStyle={{
          padding: 8,
          backgroundColor: STYLE.PALETTE.offWhite,
          borderColor: STYLE.PALETTE.offBlack,
        }}
        onPress={onStopRecord}
        icon={
          <Icon name="stop" style={{padding: 10}} size={35} color="black" />
        }
      />
      <Button
        buttonStyle={{
          padding: 8,
          backgroundColor: STYLE.PALETTE.offWhite,
          borderColor: STYLE.PALETTE.offBlack,
        }}
        onPress={
          isRecording
            ? onPauseRecord
            : isRecordingPaused
            ? onResumeRecord
            : onStartRecord
        }
        icon={
          <Icon
            name={isRecording ? 'pause' : 'microphone'}
            style={{padding: 10}}
            size={35}
            color={isRecording ? 'black' : 'red'}
          />
        }
      />
    </View>
  );
}
