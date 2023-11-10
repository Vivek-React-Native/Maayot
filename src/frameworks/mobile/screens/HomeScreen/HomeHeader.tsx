import React from 'react'
import {Button, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import HandIcon from "@frameworks/mobile/icons/HandIcon";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import {IProfileEntity} from "@domains/entities/interfaces/iProfile";

interface iHomeHeaderProps {
}
const HomeHeader: React.FC<iHomeHeaderProps> = (props: iHomeHeaderProps) => {

  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )

  return (
    <View style={styles.HomeHeaderView}>
      <View>
        <View style={styles.lfxRow}>
          <MaayotTextDisplay
            color={'lightest'}
            fontWeight="regular"
            size="normal20"
            style={styles.title}
          >
            Welcome back,
          </MaayotTextDisplay>
          <HandIcon/>
        </View>
        <MaayotTextDisplay
          color={'lightest'}
          fontWeight="regular"
          size="large36"
        >
          {profile?.name || '...'}
        </MaayotTextDisplay>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  lfxRow: {
    flexDirection: 'row',
  },
  HomeHeaderView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 34,
    marginBottom: 25,
  },
  title: {
    justifyContent: 'center',
    marginRight: 10,
    lineHeight:24,
  },
});

export default HomeHeader
