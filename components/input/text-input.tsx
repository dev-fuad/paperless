/**
 * paperless
 * text-input.tsx
 * created: 01/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { forwardRef } from "react";
import { StyleSheet, TextInput as RNTextInput } from "react-native";

import { TextInput as PaperTextInput } from "react-native-paper";

export interface TextInputProps
  extends React.ComponentPropsWithRef<typeof PaperTextInput> {
  staticField?: boolean;
}

type TextInputHandles = Pick<
  RNTextInput,
  "focus" | "clear" | "blur" | "isFocused" | "setNativeProps"
>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    TextInputProps & React.RefAttributes<TextInputHandles>
  > {
  Icon: typeof PaperTextInput.Icon;
  Affix: typeof PaperTextInput.Affix;
}

const TextInput = forwardRef(({ staticField, disabled, ...props }, ref) => {
  return (
    <PaperTextInput
      ref={(_ref) => {
        ref = _ref;
      }}
      mode="outlined"
      editable={!staticField}
      style={styles.input}
      {...props}
    />
  );
}) as CompoundedComponent;

const styles = StyleSheet.create({
  input: {
    maxWidth: 400,
  },
});

TextInput.Icon = PaperTextInput.Icon;
TextInput.Affix = PaperTextInput.Affix;

export default TextInput;
