import React, {useEffect, useRef} from 'react'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import {Dimensions, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import useTheme from "../../themes/useTheme";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import Card from "@frameworks/mobile/components/commons/Card";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import useNavigation from "@frameworks/mobile/navigations/useNavigation";
import {navigationRoutes} from "@frameworks/mobile/utils/const";
import di from "@di";
import {useDispatch} from "react-redux";

type iHighLightTextProps = {
  text: string,
}
const HighLightText: React.FC<iHighLightTextProps> = (props: iHighLightTextProps) => {
  const {
    text
  } = props;
  return <MaayotText
    color={'gray1'}
    fontWeight="bold"
    size="normal18"
    style={styles.highLightText}
  >
    {text}
  </MaayotText>
}
type IHighLightCardProps = {
  children?: any
}
const HighLightCard: React.FC<IHighLightCardProps> = (props: IHighLightCardProps) => {
  const {
    children
  } = props;
  return <Card style={styles.card}
               styleContainer={styles.cardContainer}
               color={"lightest"}
  >
    <View style={[
      commonStyles.flxRow,
      commonStyles.center,
      commonStyles.alignItemsStart
    ]}>

      <MaayotText
        color={'gray1'}
        fontWeight="regular"
        size="normal18"
        style={{
          textAlign: 'justify',
          alignContent: 'flex-start',
          textAlignVertical: 'top',
          lineHeight: 32,
        }}
      >
        {children}
      </MaayotText>
    </View>
  </Card>
}

let CurrentSlide = 0;
const configNode = [<HighLightCard>
  I <HighLightText text={"love reading it each day"}/> with my morning coffee.
</HighLightCard>,
  <HighLightCard>
    <HighLightText text={"Learning characters in context"}/> is really the <HighLightText
    text={"best way I've found to learn the language."}/>
  </HighLightCard>,
  <HighLightCard>
    I've been a <HighLightText text={"reader for almost 3 months"}/> and I would like to say that <HighLightText
    text={"I really enjoy it."}/>
  </HighLightCard>,
  <HighLightCard>
    These are <HighLightText text={"things that I can't get with any other program"}/>, it <HighLightText
    text={"goes deeper into the language comprehension"}/> than just the meaning of words.
  </HighLightCard>,
  <HighLightCard>
    The best thing about how maayot teaches Chinese is how it <HighLightText
    text={"shows a word or phrase's application in everyday speaking,"}/> and also <HighLightText
    text={"gives insight into the ways in which language is refined for everyday conversation."}/>
  </HighLightCard>,
  <HighLightCard>
    I really <HighLightText text={"appreciate your work and these stories!"}/>
  </HighLightCard>,
  <HighLightCard>
    Getting <HighLightText text={"every day a short text, along with a few new characters and grammar patterns"}/> has
    been <HighLightText text={"tremendously helpful."}/>
  </HighLightCard>,
  <HighLightCard>
    Ressources I've been using to learn Chinese tended to be quite stale, and rather boring. <HighLightText
    text={"maayot is a great for me to stay up-to-speed."}/>
  </HighLightCard>,
  <HighLightCard>
   It's <HighLightText
    text={"the first thing I read in the morning before starting my day."}/>
  </HighLightCard>
]
const OnBoardingScreen: React.FC = () => {
  const theme = useTheme()
  const {navigate} = useNavigation()
  const dispatch = useDispatch()

  const homepagePress = async () => {
    dispatch(di.session.setHideOnBoarding(true, true));
  }
  const listRef = useRef(null);
  const timerId = useRef<number | null>(null);

  const renderItem = ({item, index}: any) => {
    return item;
  }

  const keyExtractor = (item: any, index: any) => {
    return index.toString();
  }
  const _goToNextPage = () => {
    if (CurrentSlide >= configNode.length - 1) CurrentSlide = 0;
    //@ts-ignore
    listRef.current.scrollToIndex({
      index: ++CurrentSlide,
      animated: true,
    });
  };

  const _startAutoPlay = () => {
    timerId.current = setInterval(_goToNextPage, 2300);
  };

  const _stopAutoPlay = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  };
  useEffect(() => {
    _startAutoPlay();
    return () => _stopAutoPlay();
  }, []);


  return (
    <SafeAreaView style={{
      backgroundColor: theme.colors.gray5,
    }}>
      <View style={styles.titleContainer}>
        <MaayotTextDisplay
          color={'gray1'}
          fontWeight="bold"
          size="larger24"
          style={styles.title}
        >
          Welcome to maayot!
        </MaayotTextDisplay>
        <MaayotText
          color={'gray1'}
          fontWeight="regular"
          fontWeightNumber={"500"}
          size="small16"

        >
          You'd normally see a tagline here - created by a marketing team. Instead, we asked our users to come up with
          one.
        </MaayotText>
        <View style={[
          commonStyles.flxRow,
        ]}>
          <View style={[
            styles.borderYellow,
          ]}>
            <MaayotText
              color={'gray1'}
              fontWeight="regular"
              size="normal18"
            >
              Here's their unsolicited feedback:
            </MaayotText>
          </View>
        </View>
      </View>

      <View style={styles.withShadow}>
        <ScrollView style={[
          styles.scrollView,
        ]}>
          <View>
            <FlatList
              style={styles.scrollView}
              data={configNode}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              horizontal={false}
              ref={listRef}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <MayotButton
          onPress={homepagePress}
          label={'Get Started'}
          color={'lightest'}
          bgColor={'primary'}
          size='small17'
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 350,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  highLightContainer: {
    margin: 0,
    padding: 0,
    height: 'auto',
    borderBottomColor: '#058466',
    borderBottomWidth: 2,
    borderTopWidth: 0,
  },
  highLightText: {
    margin: 0,
    textDecorationLine: 'underline',
    textDecorationColor: '#058466'
  },
  title: {
    paddingBottom: 20,
  },
  card: {
    padding: 16,
    paddingTop: 16,
    paddingBottom: 14,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 10,
  },
  borderYellow: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#058466',
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    padding: 16
  },
  withShadow: {
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
  }
});
export default OnBoardingScreen

