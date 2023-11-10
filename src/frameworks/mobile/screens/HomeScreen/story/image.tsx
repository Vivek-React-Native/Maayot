import React from 'react'
import { View, Image } from 'react-native'
import {SvgCssUri} from "react-native-svg";
import useTheme from '../../../themes/useTheme'
import styles from './styles';

interface IImageStory {
  image: string
}

const ImageStory: React.FC<IImageStory> = (props:IImageStory) => {
  const {
    image
  } = props;
  const theme = useTheme()

  return (<>
      {
        image && image.slice(-3) === 'svg' ?
          <View style={[
            styles.storyImage,
            {backgroundColor: theme.colors.gray4}
          ]}>
            <SvgCssUri
              uri={image}
              width={'100%'}
              height={'100%'}
            />
          </View> :
          <Image
            style={[
              styles.storyImage,
              {
                backgroundColor: theme.colors.gray4
              }]
            }
            resizeMode="contain"
            source={{
              uri: image || 'https://images.prismic.io/maayot/feb9c82d-c420-451b-b1a4-dee0f0f6dc47_c1aad5a530ec65ad383fa7027de2d71e4f976ca8.png?auto=compress,format&rect=0,0,267,225&w=267&h=225'
              ,
            }}
          />
      }
    </>
  )
};

export default ImageStory

