/**
 * paperless
 * base-picker.tsx
 * created: 03/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { Ref, useCallback } from "react";
import { Keyboard, Pressable, PressableProps } from "react-native";

import { IconButtonProps } from "react-native-paper";

import TextInput, { TextInputProps } from "./text-input";

interface BasePickerProps extends TextInputProps {
  innerRef?: Ref<typeof TextInput>;
  pressableProps?: PressableProps;
  icon?: IconButtonProps["icon"];
  onPress?: () => void;
}

const BasePicker: React.FC<BasePickerProps> = ({
  innerRef,
  pressableProps,
  icon = "chevron-down",
  onPress,
  ...props
}) => {
  const onToggle = useCallback(() => {
    Keyboard.dismiss();
    onPress?.();
  }, []);
  return (
    <Pressable onPress={onToggle} {...pressableProps}>
      <TextInput
        ref={(_ref) => {
          innerRef = _ref;
        }}
        editable={false}
        right={<TextInput.Icon icon={icon} onPress={onToggle} />}
        {...props}
      />
    </Pressable>
  );
};

export default BasePicker;
