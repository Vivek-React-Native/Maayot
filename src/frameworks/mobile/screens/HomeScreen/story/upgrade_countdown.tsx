import React from 'react'
import { View} from 'react-native'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import styles from './styles';
import MayotButton from "@frameworks/mobile/components/atomic/button";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";
import {usePlatform} from "@hooks";
import useNavigation from "@frameworks/mobile/navigations/useNavigation";
// @ts-ignore
import Spinner from "react-native-loading-spinner-overlay";
import useIAP from "@frameworks/mobile/hooks/useIAP";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import UpgradeButton from "@frameworks/mobile/components/atomic/upgradeButton";

type IUpgradeProps = {
  bgColor?: ColorStrings
}
const UpgradeCountDown: React.FC<IUpgradeProps> = (props: IUpgradeProps) => {
  const { isIos } = usePlatform()
  const {
    connected: IAPConnected,
    purchaseLoading,
    requestSubscription,
    productsMap,
  } = useIAP();

  const upgradeFn = () => {
      return requestSubscription('standard')
  }
  return (
      <View
        style={{marginTop: 10}}
      >
        <MaayotText
          color={'gray1'}
          fontWeight="regular"
          size="smaller14"
          style={styles.center}
        >
          As a free user, a new story is only available on Sundays. We'll see you then!
        </MaayotText>
        {
          IAPConnected && <UpgradeButton
            onPress={upgradeFn}
            styles={styles.button}
            purchaseLoading={purchaseLoading}
            product={productsMap['standard']}
            label={'Unlock Now'}
            size={'small17'}
          />
        }
      </View>
  )
};

export default UpgradeCountDown

