import {StyleSheet} from  'react-native'
const styles = StyleSheet.create({
  cardView: {
    flex: 1
  },
  formElementTitle: {
    lineHeight: 14,
  },
  inputView: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    borderWidth: 1,
    color: '#000000',
    marginBottom: 20,
    marginTop: 8,
    borderRadius: 8,
  },
  inputPwHasBtn: {
    paddingRight: 50
  },
  btmButton: {
    padding: 16,
    position: 'absolute',
    width: '100%',
    bottom: 34,
  },
  pwSettingBtn: {
    alignItems:'flex-end',
    fontWeight: 'bold',
  },
  editPwBtn: {
    right: 1,
    bottom: 21,
    height: 48,
  },
  editPwBtnText: {
    lineHeight: 50,
    paddingRight: 16,
  },
})
export default styles;
