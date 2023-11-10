import React from 'react'
import {StyleSheet, View} from 'react-native'
import useTheme from '../../themes/useTheme'
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";

type IPageTitleProps = {
  title: string
}

const PageTitle: React.FC<IPageTitleProps> = (props: IPageTitleProps) => {
  const {title} = props
  const theme = useTheme()
  return (<View>
      <MaayotTextDisplay
        color={'lightest'}
        fontWeight="bold"
        size="larger28"
        style={{
          ...styles.title,
          backgroundColor: theme.colors.primary
        }}
      >
        {title}
      </MaayotTextDisplay>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 3,
    lineHeight: 41,
    textAlignVertical:"center",
    paddingBottom: 8,
  },
})
export default React.memo(PageTitle)
