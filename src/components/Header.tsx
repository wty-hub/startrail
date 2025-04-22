/**
 * 顶部标题栏
 */

import {
  Icon,
  TopNavigationAction,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { View } from "react-native";
import { HeaderType } from "../types/types";

const BackIcon = (props: any) => <Icon {...props} name="arrow-left" />;
const Blank = (props: any) => <View {...props} />;

const Header: React.FunctionComponent<HeaderType> = ({
  title,
  navigation,
  hideBack,
  style,
  accessoryRight,
}) => {
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  const Title = () => <Text category="h6">{title}</Text>;

  return (
    <TopNavigation
      accessoryLeft={hideBack ? () => <Blank /> : () => <BackAction />}
      // @ts-ignore
      accessoryRight={accessoryRight}
      title={Title}
      alignment="center"
      style={style}
    />
  );
};

export default Header;
