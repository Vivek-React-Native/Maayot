import {StyleSheet} from  'react-native'
const commonStyles = StyleSheet.create({
  flxRow: {
    flexDirection:'row'
  },
  flxCol: {
    flexDirection:'column'
  },
  spBetween: {
    justifyContent: 'space-between'
  },
  spAround: {
    justifyContent: 'space-around'
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems:'center',
  },
  alignItemsEnd: {
    alignItems:'flex-end',
  },
  justifyStart: {
    justifyContent:'flex-end'
  },
  justifyEnd: {
    justifyContent:'flex-end'
  },
  alignItemsStart: {
    alignItems:'flex-start'
  },
  normal: {
    fontWeight:'normal'
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  cardView: {
    flex: 1
  },
  card: {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 0,
  },
  absolute: {
    position: 'absolute'
  },
  btmButton: {
    padding: 16,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  spinnerTextStyle: {
    color: '#fff'
  }
});
export default commonStyles;
