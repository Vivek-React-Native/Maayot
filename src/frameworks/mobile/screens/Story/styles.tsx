import {StyleSheet,Dimensions} from "react-native"
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  flexRow: {
    flexDirection:'row'
  },
  center: {
    textAlign: 'center',
  },
  storyContainer: {
    height: '100%'
  },
  cardView: {
    flex: 1,
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
  nextButton: {
    padding: 16,
    position: 'absolute',
    width: '100%',
    bottom: 18,
  },
  eyeIconStyle: {
    width: width * 0.1,
    height: width * 0.1,
    position:'absolute',
    right: width * 0.025,
    top: width * 0.025,
    zIndex:1,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 7
  },
  icon: {
    width: '90%',
    height: '90%',
  }
})
export default styles
