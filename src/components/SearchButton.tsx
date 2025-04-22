import { Icon } from "@ui-kitten/components";
import { ImageProps } from "react-native";

interface SearchButtonProps {
  onToggle?: (status: boolean) => void;
  onChangeText?: (query: string) => void;
}

const SearchIcon = (props: ImageProps) => (
  <Icon {...props} name="search-outline" />
);


