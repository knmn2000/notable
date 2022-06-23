import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import {STYLE} from '../styles';
import PlaybackButtons from './playbackButtons';

const styles = StyleSheet.create({
    container:{
        backgroundColor: STYLE.PALETTE.offWhite,
        flexDirection:'row',
        bottom: 20,
        padding: 2,
        margin: 8,
        height: 80,
        shadowColor: 'black',
        shadowOffset: {width: -12, height: 14},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        borderRadius: 3,
        elevation: 3,
        alignItems:'center',
        justifyContent:'flex-start'
    },
})
export default function BottomSheetPlayer() {
  return (
    <View style={styles.container}>
      <View style={{ padding: 8}}>
        <Text style={STYLE.TEXT.medium}>Debounce</Text>
      </View>
      <PlaybackButtons/>
    </View>
  )
}