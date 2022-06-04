import {
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';

const PALETTE = {
  darkBlue: '#0256C4',
  lightBlue: '#00B9F1',
  offWhite: '#F9F9F9',
  offBlack: '#1C1C1C',
  success: '#1AA33C',
  darkGreen: '#04AD41',
  danger: '#D92649',
  darkRed: '#E43225',
};
const LAYOUT = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PALETTE.offWhite,
    // paddingHorizontal: 8,
    // paddingVertical: 20,
  },
  horizontalCenterAlign: {
    alignSelf: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  bottomCenterAlign: {
    margin: 24,
  },
  bottomLeftAlign: {
    margin: 24,
    alignSelf: 'flex-end',
  },
  bottomLeftAlignAbsolute:{
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    position: 'absolute',                                          
    padding: 16,
    bottom: 20,                                                    
    right: 16, 
  },
  homePageView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  startSessionView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  sessionView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  chipLayout: {
    margin: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paymentOverlayStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const SPACING = StyleSheet.create({
  paddingSmall: {
    padding: 4,
  },
  paddingMedium: {
    padding: 8,
  },
  paddingLarge: {
    padding: 12,
  },
  marginLarge: {
    margin: 12,
  },
});
const TEXT = StyleSheet.create({
  small: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'black',
  },
  medium: {
    fontSize: 16,
    color: 'black',
  },
  large: {
    fontSize: 20,
    color: 'black',
  },
  extraLarge: {
    fontSize: 48,
    color: 'black',
  },
});
const STYLE = {
  LAYOUT,
  PALETTE,
  TEXT,
  SPACING,
};

export {STYLE};
