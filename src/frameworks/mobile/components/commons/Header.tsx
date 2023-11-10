import React, {useMemo, useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import di from '@di'
import StarIcon from "@frameworks/mobile/icons/StarIcon";
import useTheme from '../../themes/useTheme'
import {memberTypeConst} from "@frameworks/mobile/utils/const";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import { usePlatform } from '@hooks'
import { ToggleMenuAndroidIcon } from '@frameworks/mobile/icons'
type IHeaderProps = {
  navigation?:any
}
const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  const {
    navigation
  } = props;
  const theme = useTheme()
  const dispatch = useDispatch()
  const { isIos } = usePlatform()
  const [membershipName, setMembershipName] = useState('FREE');

  const sessionInfo = useSelector(
    (state: any) => state.session.sessionInfo
  )

  const isFree = useMemo(() => {
    return sessionInfo?.membershipName === memberTypeConst.FREE
  },[sessionInfo])

  const isPremium = useMemo(() => {
    return sessionInfo?.membershipName === memberTypeConst.PREMIUM
  },[sessionInfo])

  useEffect(() => {
    if(sessionInfo) {
      switch (sessionInfo.membershipName) {
        case memberTypeConst.FREE:
          setMembershipName('FREE MEMBER');
          break;
        case memberTypeConst.PREMIUM:
          setMembershipName('PREMIUM');
          break;
        case memberTypeConst.STANDARD:
          setMembershipName('STANDARD');
          break;
        case memberTypeConst.SCHOOL:
          setMembershipName('SCHOOL');
          break;

      }
    }
  },[sessionInfo]);

  const handleClickLogout = async () => {
    return await di.session.signOut(dispatch)
  }

  const onPress = () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.headerView}>
      <View style={styles.title}>
        {!isIos &&
        <TouchableOpacity
            onPress={onPress}
            style={styles.androidToggleBtn}
        >
            <ToggleMenuAndroidIcon />
        </TouchableOpacity>
        }
        <MaayotTextDisplay
          color={'lightest'}
          fontWeight="bold"
          size="larger24"
          style={styles.logo}
        >
          maayot
        </MaayotTextDisplay>
      </View>
      {
      //   isFree && <View style={[
      //   styles.membership,
      //   {
      //     backgroundColor: theme.colors.primary2,
      //     // backgroundColor: isFree ? theme.colors.primary : theme.colors.primary2,
      //     borderColor: theme.colors.primary2
      //     // borderColor: isFree ? theme.colors.lightest : theme.colors.primary2
      //   }
      // ]}>
      //   {isFree && <StarIcon/>}
      //   <MaayotTextDisplay
      //     color={'lightest'}
      //     fontWeight="bold"
      //     size="tiny10"
      //     style={isFree && styles.membershipText || {}}
      //   >
      //     PREMIUM
      //   </MaayotTextDisplay>
      // </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerView: {
    paddingTop:12,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent:'space-between',
    alignItems:'center',
    paddingBottom:0,
  },
  androidToggleBtn: {
    paddingVertical: 10,
    marginRight: 30,
  },
  logo: {
    letterSpacing: 0.374,
    lineHeight: 29,
  },
  title: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center'
  },
  membership: {
    marginTop: 5,
    borderRadius: 28,
    paddingLeft: 15,
    paddingRight: 14,
    height: 32,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign:'center',
    borderWidth: 1,
  },
  membershipText: {
    marginLeft: 5,
  }
})

export default Header
