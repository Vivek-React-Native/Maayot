import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
  LoadingView: {
    flex: 1,
    backgroundColor:'#00000050',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems:'center',
    justifyContent:'center',
    zIndex: 1
  },
  flexRow: {
    flexDirection:'row'
  },
  center: {
    textAlign: 'center',
  },
  logo: {
    lineHeight: 21,
    letterSpacing: 0.374
  },
  title: {
    marginTop: 4,
    lineHeight: 38,
  },
  loginForm: {
    padding: 16,
    paddingBottom: 100,
    height: '100%',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  loginFormTitle: {
    marginBottom: 53,
  },
  forgotPwBtn: {
    alignItems:'flex-end',
    fontWeight: 'bold',
  },
  actionButton:{
    marginTop: 15,
  },
  actionRegisterButton:{
    marginTop: 6,
  },
  formElementTitle: {
    lineHeight:14,
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
  bottomText: {
    padding: 20,
    justifyContent: 'center',
  },
  moreBottomBtn: {
    padding: 0,
    marginLeft: 2
  },
  moreBottom: {
    position:'absolute',
    bottom: 34,
    width: '100%',
  },
})
export default styles;
