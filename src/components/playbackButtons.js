import React, {useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {STYLE} from '../styles';
import {Button} from '@rneui/base';
import {
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  playBtnWrapper: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems:'center',
    padding: 8,
  },
});


export default function PlaybackButtons({isPlaying, goBackward, goForward, onStartPlay, onPausePlay}) {
    useEffect(() => {
    }, [isPlaying])
    
  return (
        <View style={styles.playBtnWrapper}>
          <Button
            buttonStyle={{
              padding: 8,
              backgroundColor: STYLE.PALETTE.offWhite,
              borderColor: STYLE.PALETTE.offBlack,
            }}
            onPress={goBackward}
            icon={
              <Icon
                name="backward"
                size={25}
                color="black"
              />
            }
          />
          {isPlaying ? (
            <Button
              buttonStyle={{
                padding: 8,
                backgroundColor: STYLE.PALETTE.offWhite,
                borderColor: STYLE.PALETTE.offBlack,
              }}
              onPress={onPausePlay}
              icon={
                <Icon
                  name="stop"
                  size={25}
                  color="black"
                />
              }
            />
          ) : (
            <Button
              buttonStyle={{
                padding: 8,
                backgroundColor: STYLE.PALETTE.offWhite,
                borderColor: STYLE.PALETTE.offBlack,
              }}
              onPress={onStartPlay}
              icon={
                <Icon
                  name="play"
                  size={25}
                  color="black"
                />
              }
            />
          )}
          <Button
            buttonStyle={{
              padding: 8,
              backgroundColor: STYLE.PALETTE.offWhite,
              borderColor: STYLE.PALETTE.offBlack,
            }}
            onPress={goForward}
            icon={
              <Icon
                name="forward"
                size={25}
                color="black"
              />
            }
          />
        </View>
  )
}
