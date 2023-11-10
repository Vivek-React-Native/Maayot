import React, {useState, useEffect, useCallback, useRef, ReactElement} from 'react'
import {StyleSheet, ScrollView, Dimensions, Animated, View} from 'react-native'
import {useSelector} from 'react-redux'
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import StoryDetail from "@frameworks/mobile/screens/Story/components/storyDetail";
import StorySegmentedControl from "@frameworks/mobile/screens/Story/components/segmentedControl";
import Card from "@frameworks/mobile/components/commons/Card";
import styles from "@frameworks/mobile/screens/Story/styles";
import { usePlatform } from '@hooks'

type IStorySliderProps = {
  children: ReactElement,

}
const StorySlider: React.FC<IStorySliderProps> = (props: IStorySliderProps) => {
  const {
    children,
  } = props;
  const { isIos } = usePlatform()
  const story: IStoryEntity | undefined = useSelector(
    (state: any) => state.story.story
  )
  const [translateYStory, setTranslateYStory] = useState(-1000);
  const translateXQuiz = useRef(new Animated.Value(0)).current;
  const translateXStory = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  const onSegmentSelected = (active: number) => {
    if (active == 0) {
      Animated.parallel([
        Animated.spring(translateXQuiz, {
          toValue: 0,
          delay: 100,
          useNativeDriver: true,
        }),
        Animated.spring(translateXStory, {
            toValue: Dimensions.get('window').width,
            delay: 100,
            useNativeDriver: true,
          }
        )
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(translateXQuiz, {
          toValue: -Dimensions.get('window').width,
          delay: 100,
          useNativeDriver: true,
        }),
        Animated.spring(translateXStory, {
            toValue: 0,
            delay: 100,
            useNativeDriver: true,
          }
        )
      ]).start()
    }
  }

  return (
    <>
      {
        isIos && <StorySegmentedControl
            onSelectedIndex={onSegmentSelected}
            values={['Quiz', 'Story']}
        />
      }
      <Card
        style={styles.card}
        styleContainer={sliderStyle.cardContainer}
      >
        <View style={styles.cardView}>
          <View style={sliderStyle.scrollView}>
            <Animated.View
              style={{
                transform: [
                  {translateX: translateXQuiz}
                ]
              }}
              onLayout={(e) => setTranslateYStory(e.nativeEvent.layout.height)}
            >
              {children}
            </Animated.View>
            <Animated.View
              style={{
                transform: [
                  {translateX: translateXStory},
                  {translateY: -translateYStory}
                ]
              }}
            >
              <ScrollView style={sliderStyle.scrollView}>
                {story && <StoryDetail story={story}/>}
              </ScrollView>
            </Animated.View>
          </View>
        </View>
      </Card>
    </>
  )
}

const sliderStyle = StyleSheet.create({
  cardContainer: {
    paddingTop: 20,
    padding: 16,
    borderRadius: 0,
  },
  scrollView: {
    height: Dimensions.get('window').height - 290,
  },
  quizQuestion: {
    lineHeight: 37,
    marginBottom: 12,
  },
})

export default StorySlider
