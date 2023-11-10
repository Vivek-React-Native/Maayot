import {StyleSheet} from  'react-native'
const styles = StyleSheet.create({
  streak: {
    flexDirection:'row'
  },
  card: {
    width: '50%',
    padding: 16,
    borderRadius: 10,
    paddingTop: 0,
    paddingBottom: 14,
  },
  flexStart: {
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  cardContainer: {
    justifyContent:'flex-start',
    alignItems:'flex-start',
    padding: 12,
    paddingBottom: 13,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
    height: 14,
    lineHeight: 14,
    letterSpacing: 0.005
  },
  titleIcon: {
    marginRight: 10,
    padding: 7,
    borderRadius: 50
  },
  count: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  counter: {
    height: 43,
    justifyContent: 'center',
    alignItems:'center',
    lineHeight:43,
  },
  countLabel: {
    paddingBottom: 25,
    paddingLeft: 8
  },
  longestCountLabel: {
    paddingBottom: 12,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'red',
    borderRadius: 10,
    padding: 10,
    marginTop: 27
  },
});
export default styles;
