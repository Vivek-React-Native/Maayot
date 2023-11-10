import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@frameworks/mobile/components/commons/Card'
import MaayotText from '@frameworks/mobile/components/atomic/text/MaayotText'
import useTheme from '../../../themes/useTheme'
import styles from './styles'
import di from '@di'
import { IStoryEntity } from '@domains/entities/interfaces/iStory'
import ImageStory from '@frameworks/mobile/screens/HomeScreen/story/image'
import FreeStory from '@frameworks/mobile/screens/HomeScreen/story/freeStory'
import { IProfileEntity } from '@domains/entities/interfaces/iProfile'
import PremiumStory from '@frameworks/mobile/screens/HomeScreen/story/premiumStory'
import useNavigation from '@frameworks/mobile/navigations/useNavigation'
import { navigationRoutes } from '@frameworks/mobile/utils/const'
import MaayotLoader from '@frameworks/mobile/components/atomic/loader'
import MaayotTextNotoSansSC from '@frameworks/mobile/components/atomic/text/MaayotTextNotoSansSC'
import useMemberShip from '@frameworks/mobile/hooks/useMembership'

const Story: React.FC = () => {
    const { navigate } = useNavigation()
    const theme = useTheme()
    const dispatch = useDispatch()
    const readStoryFn = () => {
        navigate(navigationRoutes.NAVIGATION_STORY_PATH)
    }

    const { isValidMemberShip } = useMemberShip()
    // console.log('isValidMemberShip -> ',isValidMemberShip)

    const profile: IProfileEntity | undefined = useSelector(
        (state: any) => state.profile.profile
    )

    const story: IStoryEntity | undefined = useSelector(
        (state: any) => state.story.story
    )

    useEffect(() => {
        const asyncFnc = async () => {
            if (profile) {
                dispatch(await di.story.getIntro(profile.id, profile.level))
            }
        }
        !story && profile?.membershipId && asyncFnc()
    }, [story, profile])

    return (
        <Card style={styles.card} styleContainer={styles.cardContainer}>
            <View style={styles.cardView}>
                {story ? (
                    <>
                        {story?.image && <ImageStory image={story.image} />}
                        <MaayotTextNotoSansSC
                            color={'gray1'}
                            fontWeight='bold'
                            size='normal18'
                            style={styles.title}
                        >
                            {story && story.storyTitle}
                        </MaayotTextNotoSansSC>
                        <MaayotText
                            color={'gray1'}
                            fontWeight='regular'
                            size='smaller14'
                            style={styles.titleSub}
                        >
                            {story && story.englishTitle}
                        </MaayotText>
                        {(isValidMemberShip && (
                            <PremiumStory
                                story={story}
                                readStory={readStoryFn}
                            />
                        )) || (
                            <FreeStory story={story} readStory={readStoryFn} />
                        )}
                    </>
                ) : (
                    <MaayotLoader />
                )}
            </View>
        </Card>
    )
}

export default Story
