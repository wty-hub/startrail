import { Button, Icon, Input } from "@ui-kitten/components";
import { useEffect, useRef, useState } from "react";
import {
  ImageProps,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

interface SearchButtonProps {
  onToggle: (status: boolean) => void;
  onChangeText?: (query: string) => void;
}

const SearchIcon = (props: ImageProps) => (
  <Icon {...props} name="search-outline" />
);

const CloseIcon = (props: ImageProps) => (
  <Icon {...props} name="close-outline" />
);

let SCREEN_WIDTH = 300;

const Search: React.FC<SearchButtonProps> = ({ onToggle, onChangeText }) => {
  SCREEN_WIDTH = useWindowDimensions().width;

  const inputRef = useRef<Input>(null);
  const [inputShown, setInputShown] = useState(false);

  useEffect(() => {
    onToggle(inputShown);
    if (!inputShown) {
      inputRef.current?.clear();
    }
  }, [inputShown, onToggle]);

  return (
    <View style={styles.search}>
      {inputShown && (
        <Input
          ref={inputRef}
          style={[styles.input, { width: SCREEN_WIDTH - 120 }]}
          placeholder="搜索……"
          onChangeText={onChangeText}
          autoFocus
        ></Input>
      )}
      <Button
        style={styles.button}
        appearance="ghost"
        status="basic"
        // @ts-ignore
        accessoryLeft={inputShown ? CloseIcon : SearchIcon}
        onPress={() => {
          setInputShown((prev) => !prev);
        }}
      ></Button>
    </View>
  );
};

export default Search;

const SEARCH_HEIGHT = 40;

const styles = StyleSheet.create({
  search: {
    width: 50,
    height: SEARCH_HEIGHT,
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "relative",
  },
  input: {
    height: SEARCH_HEIGHT,
    marginBottom: 0,
    position: "absolute",
    right: 60,
    zIndex: 0,
    elevation: 0,
  },
  button: {
    height: SEARCH_HEIGHT - 24,
  },
});
