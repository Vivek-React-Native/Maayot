import {StyleSheet} from "react-native";
const streakStyles = StyleSheet.create({
  safeView: {
    width: '100%',
    flex: 1,
  },
  scrollView: {
  },
  nextButton: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 42,
    position: 'absolute',
    bottom: 0,
    height: 104
  },
  viewResult: {
    padding: 16
  },
  content: {
    width: '100%',
    height: '85%',
    minHeight: '85%',
  },
  streakTitle: {
    lineHeight: 38,
    marginTop: 35,
  },
  streaksSubtitle: {
    marginTop: 8,
    lineHeight: 21,
  },
  streaks: {
    display:'flex',
    flexDirection: 'row',
    marginTop: 24,
  },
  streaksItem: {
    marginHorizontal: 2.5
  },
  streaksItemText: {
    lineHeight: 21.45,
    position:'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  }
})
export default streakStyles;
