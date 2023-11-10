import {StyleSheet} from  'react-native'
const styles = StyleSheet.create({
  streak: {
    flexDirection:'row'
  },
  card: {
    width: '50%',
    padding: 16,
    paddingTop: 16,
    paddingBottom: 14,
  },
  flexStart: {
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  cardContainer: {
    justifyContent:'flex-start',
    alignItems:'flex-start',
    paddingHorizontal: 16,
    paddingTop: 17,
    paddingBottom: 19,
    borderWidth: 1,
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 6,
    height: 19,
    lineHeight: 19,
    letterSpacing: 0.005
  },
  titleIcon: {
    marginRight: 10,
    borderRadius: 50,
    width: 34,
    height: 34,
    justifyContent:'center',
    alignItems:'center',
  },
  count: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  counter: {
    height: 76,
    justifyContent: 'center',
    alignItems:'center',
    lineHeight:76,
  },
  streaksLabel: {
    lineHeight:45,
    marginLeft: 4,
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
