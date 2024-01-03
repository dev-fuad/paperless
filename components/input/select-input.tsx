/**
 * paperless
 * select-input.tsx
 * created: 01/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, {
  Fragment,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Pressable } from "react-native";

import { Divider, Menu, Text, useTheme } from "react-native-paper";

import TextInput from "./text-input";

interface Props<Option> extends React.ComponentPropsWithRef<typeof TextInput> {
  innerRef?: React.Ref<typeof TextInput>;
  items: Option[];
  selected?: Option;
  getKey: (item: Option) => string;
  getLabel: (item: Option) => string;
  groupBy?: (item: Option) => string;
  onSelect: (item: Option) => void;
}

function SelectInput<T>(props: Props<T>, ref) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [itemWidth, setItemWidth] = useState(undefined);

  const data = useMemo(() => {
    if (!props.groupBy) {
      return props.items;
    }
    return Object.entries(Object.groupBy(props.items, props.groupBy));
  }, [props.items]);

  const onLayout = useCallback(({ nativeEvent }) => {
    setItemWidth(nativeEvent.layout?.width);
  }, []);

  const renderItem = useCallback(
    (item) => (
      <Menu.Item
        key={props.getKey(item)}
        style={{ width: itemWidth }}
        onPress={() => {
          setIsOpen(false);
          props.onSelect(item);
        }}
        title={props.getLabel(item)}
      />
    ),
    [itemWidth],
  );

  const color = theme.colors.onSurfaceDisabled;

  return (
    <Menu
      visible={isOpen}
      onDismiss={() => setIsOpen(false)}
      anchorPosition="bottom"
      anchor={
        <Pressable
          onLayout={onLayout}
          onPress={() => setIsOpen((open) => !open)}
        >
          <TextInput
            ref={(_ref) => {
              ref = _ref;
            }}
            editable={false}
            right={
              <TextInput.Icon
                icon="chevron-down"
                onPress={() => setIsOpen((open) => !open)}
              />
            }
            {...props}
            value={props.getLabel(props.selected)}
          />
        </Pressable>
      }
    >
      {props.groupBy
        ? data.map((([key, items]) => (
            <Fragment key={key}>
              <Text variant="bodyLarge" style={{ color }}>{`  ${key}`}</Text>
              {items.map(renderItem)}
              <Divider />
            </Fragment>
          )) as any)
        : data.map(renderItem)}
    </Menu>
  );
}

export default forwardRef(SelectInput);
