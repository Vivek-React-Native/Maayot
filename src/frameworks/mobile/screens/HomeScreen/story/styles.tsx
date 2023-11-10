import {StyleSheet} from  'react-native'
const styles = StyleSheet.create({
  card: {
    paddingTop: 0,
  },
  cardContainer: {
    padding: 20
  },
  cardView: {
    flex: 1
  },
  storyImage: {
    height: 200,
    borderRadius:5,
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems:'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 13,
    lineHeight: 26,
  },
  titleSub: {
    lineHeight: 21,
    height: 21,
  },
  titleIcon: {
    marginRight: 10,
    padding: 7,
    borderRadius: 50
  },
  count: {
    marginTop: 19,
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    width: '100%'
  },
  freeButton: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 14,
    marginTop: 24,
    width: '100%'
  },
  freeLine: {
    marginTop: 24,
    marginBottom: 18,
  }
});
export default styles;
