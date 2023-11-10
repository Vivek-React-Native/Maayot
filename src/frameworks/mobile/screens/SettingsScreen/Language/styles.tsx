import {StyleSheet} from  'react-native'
const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingBottom: 9,
  },
  cardView: {
    flex: 1
  },
  flxRow: {
      flexDirection:'row',
      justifyContent:'space-between'
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 18,
    paddingTop: 28,
    paddingBottom: 28,
    borderRadius: 10,
    borderWidth: 1,
    alignItems:'center',
  },
  title: {
    marginBottom: 62
  },
  iconLabel: {
    position:'absolute',
    top: 10,
    left: 5,
    lineHeight: 22,
    letterSpacing: -0.408
  },
  labelContainer: {
    paddingHorizontal: 16,
    paddingVertical:0,
    width: '90%',
    alignSelf:'center'
  },
  languageLabel: {
    lineHeight: 22,
    marginRight: 10,
    textTransform:'capitalize',
  },
  languageDescription: {
    lineHeight:21,
    marginTop: 7,
  },
  bottomBtn: {
    position:'absolute',
    bottom: 40,
    width: '90%',
    left: '5%'
  },
  subTitle:{
    marginTop:5
  },
  btmButton: {
    padding: 16,
    position: 'absolute',
    width: '100%',
    bottom: 34,
  },
})
export default styles;
