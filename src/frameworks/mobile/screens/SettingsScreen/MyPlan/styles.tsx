import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingBottom: 9,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    paddingTop: 28,
    paddingBottom: 28,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  titleContainer: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    paddingTop: 84,
    paddingBottom: 28,
    paddingLeft: 16,
  },
  title: {
    lineHeight: 38
  },
  featureContainer: {
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    borderWidth: 1,
    borderTopWidth: 0,
    paddingBottom: 24,
  },
  cancelButton: {
    marginTop: 24,
  },
  btmButton: {
    padding: 16,
    position: 'absolute',
    width: '100%',
    bottom: 34,
  },
  rightHeader: {
    padding: 0,
    marginRight: 15,
  },
  rightHeaderText: {
    lineHeight: 21,
  },
  compareFeatureCurrent: {
    lineHeight: 16.5,
  },
  compareFeatureText: {
    lineHeight: 21,
  },
  compareFeaturePrice: {
    lineHeight: 28,
  },
  withShadow: {
    backgroundColor: '#fff',
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  ceilElement: {
    paddingVertical: 12,
    marginVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    height: 50,
  },
  columnView: {
    borderRadius:10,
    width: '20%',
  },
  ceilElementNoBorder: {
    paddingVertical: 12,
  },
  compareSelectBtn: {width: 24,height:24}
})
export default styles;
