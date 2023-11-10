import React, {useEffect,useState} from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import {useSelector} from 'react-redux'
import styles from './styles'
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import PageTitle from "../../components/atomic/pageTitle"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import Card from "@frameworks/mobile/components/commons/Card"
import {MemberStepInStory, navigationRoutes} from "@frameworks/mobile/utils/const"
import TopStoryBanner from "@frameworks/mobile/screens/Story/components/topStoryBanner"
import StoryDetail from "@frameworks/mobile/screens/Story/components/storyDetail"
import SoundBottom from "@frameworks/mobile/screens/Story/components/soundBottom"
import {useTracking} from "@frameworks/mobile/hooks/useStreaks";
import theme from '@frameworks/mobile/themes/MaayotTheme'

const IntroductionScreen: React.FC = () => {
  const {navigate} = useNavigation()
  const [ShowIcon, setShowIcon] = useState(false)

  const { setViewStep } = useTracking();
  useEffect(() => {
    //@ts-ignore
    setViewStep(MemberStepInStory.STORY_AND_LISTENING)
  },[]);
  const story: IStoryEntity | undefined = useSelector(
    (state: any) => state.story.story
  )

  const nextStepFn = async () => {
    navigate(navigationRoutes.NAVIGATION_QUIZ_PATH, {})
  }

  return (
    <SafeAreaView style={{backgroundColor:theme.colors.lightest}}>
      <View style={styles.storyContainer}>
        <PageTitle title={"Story & Listening"}/>
        {/*<StorySegmentedControl*/}
        {/*  values={['简体字', '繁体字。']}*/}
        {/*/>*/}
        {story && <TopStoryBanner story={story}/>}
        <Card
          style={styles.card}
          styleContainer={storyStyles.cardContainer}
        >
        <>
          <TouchableOpacity onPress={()=> setShowIcon(!ShowIcon)} activeOpacity={0.5} style={styles.eyeIconStyle}> 
            {ShowIcon ?<Image source={require('../../assets/images/icons/Show_Icon.png')} resizeMode={'cover'} style={styles.icon} /> :  <Image source={require('../../assets/images/icons/Hide_Icon.png')} resizeMode={'cover'} style={styles.icon} />}
          </TouchableOpacity>
          <View style={styles.cardView}>
            <ScrollView style={storyStyles.scrollView}>
              {story && <StoryDetail icon={ShowIcon} story={story}/>}
            </ScrollView>
          </View>
        </>
        </Card>
      </View>
      {story &&
      <SoundBottom
          story={story}
          onButtonPress={nextStepFn}
          buttonLabel={'Next Step'}
      />
      }
    </SafeAreaView>
  )
}
const storyStyles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 320,
  },
  title: {
    lineHeight: 26
  },
  cardContainer: {
    paddingTop: 24,
    padding: 16,
    borderRadius: 0,
  },
  lineHeight21: {
    lineHeight: 21
  },
  content: {
    marginTop: 18,
    lineHeight: 21
  },
  contentContainer: {},
  bar: {
    width: '100%',
    height: 6
  },
  progress: {
    height: 6
  }
})

export default IntroductionScreen
