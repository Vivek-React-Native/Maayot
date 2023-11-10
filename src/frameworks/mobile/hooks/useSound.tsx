import {useEffect, useState,useRef, useCallback} from 'react'
import Sound from "@frameworks/mobile/node_modules/react-native-sound";
import {Alert} from "react-native";
import {usePlatform} from "@hooks";

type TSoundInfo = {
  duration: number
}
export const useSound = (soundUrl : string) => {
  const {isIos} = usePlatform();
  const currentSound = useRef<any>(null)
  const [url, setUrl] = useState(soundUrl);
  const [isLoaded, setSoundLoaded] = useState(false);
  const [isPlaying, setSoundPlaying] = useState(false);
  const [soundInfo, setSoundInfo] = useState<TSoundInfo | null>(null);

  const play = useCallback(() => {
    if(currentSound.current) {
      setSoundPlaying(true);
      currentSound.current.play(playCompleted)
    }
  },[currentSound.current]);

  const playCompleted = (success: any) => {
    setSoundPlaying(false);
    currentSound?.current?.setCurrentTime(0)
    if (success) {
      console.log('Sound Played Successfully');
    } else {
      console.log('unable to play Sound');
    }
  }

  const pause = useCallback(() => {
    if(currentSound.current) {
      currentSound.current.pause();
      setSoundPlaying(false)
    }
  },[currentSound.current]);

  const setCurrentTime = useCallback((value) => {
    if(currentSound.current) {
      currentSound.current.setCurrentTime(value);
    }
  },[currentSound.current]);

  const getCurrentTime = useCallback((callback) => {
    if(currentSound.current) {
      currentSound.current.getCurrentTime(callback);
    }
  },[currentSound.current]);
  useEffect(() => {
    if(url) {
      try {
        const newSound = new Sound(
          url,
          isIos ? "" : Sound.MAIN_BUNDLE, //encodeURIComponent(Sound.MAIN_BUNDLE)
          (error: any) => {
            if (error) {
              Alert.alert('Error', error.message);
              return;
            }
            if (currentSound && currentSound.current) {
              currentSound.current.release();
            }
            currentSound.current = newSound;
            setSoundInfo({
              duration: newSound.getDuration()
            })
            setSoundLoaded(true);
          },
        );
      } catch (error) {
        console.error(error);
      }
    }
    return () => {
      if (currentSound && currentSound.current) {
        currentSound.current.release();
      }
    };
  },[url]);

  return {
    setUrl,
    info: soundInfo,
    setCurrentTime,
    getCurrentTime,
    isLoaded,
    isPlaying,
    play,
    pause
  }
}

