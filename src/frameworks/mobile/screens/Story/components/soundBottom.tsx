import React, {useEffect, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import useTheme from '../../../themes/useTheme'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import MayotButton from "@frameworks/mobile/components/atomic/button"
import Slider from "@react-native-community/slider"
import {useSound} from "@frameworks/mobile/hooks/useSound"

import PauseIcon from "@frameworks/mobile/icons/pauseIcon"
import PlayIcon from "@frameworks/mobile/icons/playIcon"
import theme from '@frameworks/mobile/themes/MaayotTheme'


type IProgressBarProps = {
  maxValue?: number,
  onChange: any,
  getValue: any,
  onSlidingStart: any,
  onSlidingComplete: any,
  isReady?: boolean
}

const ProgressBar: React.FC<IProgressBarProps> = (props: IProgressBarProps) => {
  const {
    maxValue,
    onChange,
    onSlidingStart,
    onSlidingComplete,
    getValue,
    isReady = false
  } = props
  const theme = useTheme()
  const [value, setValue] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      getValue((seconds: number, isPlaying: boolean) => {
        setValue(seconds)
      })
    }, 100)
    return () => clearInterval(id)
  },[])

  const _onValueChange = (value:number) => {
    onChange(value)
  }
  const _onSlidingStart = (value: any) => {
    onSlidingStart(value)
  }
  const _onSlidingComplete = (value: any) => {
    onSlidingComplete(value)
  }
  return <View>
    <Slider
      style={progressStyles.slider}
      minimumValue={0}
      value={value}
      maximumValue={maxValue}
      onValueChange={_onValueChange}
      onSlidingStart={_onSlidingStart}
      onSlidingComplete={_onSlidingComplete}
      minimumTrackTintColor={theme.colors.primary}
      maximumTrackTintColor={theme.colors.gray3}
      thumbTintColor={isReady ? theme.colors.primary: theme.colors.gray3}
    />
  </View>
}
const progressStyles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 10,
    padding: 0,
    margin: 0
  },
})
type ISoundBottomProps = {
  story: IStoryEntity,
  onButtonPress:any,
  buttonDisabled?: boolean
  buttonLoading?: boolean
  buttonLabel:string
}

const SoundBottom: React.FC<ISoundBottomProps> = (props: ISoundBottomProps) => {
  const {
    story,
    onButtonPress,
    buttonLoading = false,
    buttonLabel,
    buttonDisabled = false
  } = props
  const theme = useTheme()

  const sound = useSound('')

  useEffect(() => {
    if(story?.audio) {
      sound.setUrl(story.audio)
    }
  }, [story])

  const handleSlidingComplete = (value: number) => {
    sound.setCurrentTime(value)
    sound.play()
  }

  useEffect(() => {
    return () => {
      sound?.pause();
    }
  },[]);

  const onPress = (e:any) => {
    sound?.pause();
    onButtonPress(e)
  }

  return (
    <View
      style={[
        commonStyles.btmButton,
        styles.btmButton,
        {backgroundColor:theme.colors.gray3}
      ]}
    >
      <ProgressBar
        maxValue={sound.info?.duration}
        onChange={() => {}}
        onSlidingComplete={handleSlidingComplete}
        onSlidingStart={sound.pause}
        getValue={sound.getCurrentTime}
        isReady={sound.isLoaded}
      />
      <View style={[
        commonStyles.flxRow,
        styles.buttonGroup
      ]}>
        {
          sound.isLoaded && <TouchableOpacity
            onPress={sound.isPlaying ? sound.pause : sound.play}
          >
            {sound.isPlaying ? <PauseIcon/> : <PlayIcon/>}
          </TouchableOpacity> || <PlayIcon fill={'gray3'}/>
        }
        <View
          style={styles.nextButton}
        >
          <MayotButton
            onPress={onPress}
            label={buttonLabel}
            disabled={buttonDisabled}
            isLoading={buttonLoading}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  nextButton: {
    flex: 1,
    marginLeft: 12,
    height: 50,
    marginBottom: 18,
  },

  buttonGroup: {
    padding: 16,
    paddingBottom: 0,
  },
  btmButton: {
    paddingTop: 0,
  }
})
export default SoundBottom

