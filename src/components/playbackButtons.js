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
    marginTop: 40,
    width: '70%',
    justifyContent: 'space-between',
    display: 'flex',
  },
});


export default function PlaybackButtons({isPlaying, goBackward, goForward, onStartPlay, onPausePlay}) {
    useEffect(() => {
    }, [isPlaying])
    
  return (
        <View style={styles.playBtnWrapper}>
          <Button
            buttonStyle={{
              borderRadius: 85,
              padding: 8,
              backgroundColor: STYLE.PALETTE.offWhite,
              borderColor: STYLE.PALETTE.offBlack,
              borderWidth: 2,
            }}
            onPress={goBackward}
            icon={
              <Icon
                name="backward"
                style={{padding: 10}}
                size={35}
                color="black"
              />
            }
          />
          {isPlaying ? (
            <Button
              buttonStyle={{
                borderRadius: 85,
                padding: 8,
                backgroundColor: STYLE.PALETTE.offWhite,
                borderColor: STYLE.PALETTE.offBlack,
                borderWidth: 2,
              }}
              onPress={onPausePlay}
              icon={
                <Icon
                  name="stop"
                  style={{padding: 10}}
                  size={35}
                  color="black"
                />
              }
            />
          ) : (
            <Button
              buttonStyle={{
                borderRadius: 85,
                padding: 8,
                backgroundColor: STYLE.PALETTE.offWhite,
                borderColor: STYLE.PALETTE.offBlack,
                borderWidth: 2,
              }}
              onPress={onStartPlay}
              icon={
                <Icon
                  name="play"
                  style={{padding: 10}}
                  size={35}
                  color="black"
                />
              }
            />
          )}
          <Button
            buttonStyle={{
              borderRadius: 85,
              padding: 8,
              backgroundColor: STYLE.PALETTE.offWhite,
              borderColor: STYLE.PALETTE.offBlack,
              borderWidth: 2,
            }}
            onPress={goForward}
            icon={
              <Icon
                name="forward"
                style={{padding: 10}}
                size={35}
                color="black"
              />
            }
          />
        </View>
  )
}
