import {
  MarkdownTextInput,
  parseExpensiMark,
} from "@expensify/react-native-live-markdown";
import React from "react";

export default function CustomMarkdownInput() {
  const [text, setText] = React.useState("Hello, *world*!");

  return (
    <MarkdownTextInput
      value={text}
      onChangeText={setText}
      parser={parseExpensiMark}
    />
  );
}
