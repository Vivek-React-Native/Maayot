import React, {useEffect, useState} from 'react'
import {StyleSheet, TouchableOpacity, View, Pressable} from 'react-native'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText"
import useTheme from '../../../themes/useTheme'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import {useModal} from "@frameworks/mobile/hooks/useModal"
import NewWord from "@frameworks/mobile/screens/Story/components/newWord"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"

type ITopStoryBannerProps = {
  story: IStoryEntity
}

const TopStoryBanner: React.FC<ITopStoryBannerProps> = (props: ITopStoryBannerProps) => {
  const {
    story,
  } = props
  const theme = useTheme()
  const newWordModal = useModal(false)
  return (
    <View style={[
      commonStyles.flxRow,
      commonStyles.spBetween,
      styles.viewContainer,
      {backgroundColor: theme.colors.primary2}
    ]}>
      <MaayotText
        color={'lightest'}
        fontWeight="regular"
        size="smaller14"
        style={{lineHeight: 21}}
      >
        2 New words today
      </MaayotText>
        <Pressable
          onPress={newWordModal.showModal}
        >
        <MaayotText
          color={'lightest'}
          fontWeight="regular"
          fontWeightNumber="600"
          size="smaller14"
          style={{lineHeight: 22}}
        >
          Show
        </MaayotText>
      </Pressable>
      {
        story && <NewWord
          story={story}
          isOpen={newWordModal.isOpen}
          onClosePress={newWordModal.closeModal}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    paddingTop:10,
    paddingBottom:10,
    paddingLeft: 16,
    paddingRight: 16,
    height: 40
  },
  item: {
    width: 20,
    height: 15,
    padding: 0,
    borderRadius: 5,
    marginLeft: 0,
    marginRight: 0,
  },
})
export default TopStoryBanner
