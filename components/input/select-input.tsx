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

import { Divider, Menu, Text, useTheme } from "react-native-paper";

import BasePicker from "./base-picker";
import TextInput from "./text-input";

interface Props<Option> extends React.ComponentPropsWithRef<typeof TextInput> {
  items: Option[];
  selected?: Option;
  getKey: (item: Option) => string;
  getLabel: (item: Option) => string;
  groupBy?: (item: Option) => string;
  onSelect: (item: Option) => void;
}

type GroupedDataType<T> = [string, T[]][];
function isGroupedData<T>(data: any): data is GroupedDataType<T> {
  return (
    Array.isArray(data) && // data should be an Array and
    (data.length === 0 || // either data is empty Array or
      (data[0].length === 2 && // first element of data is Array of length 2
        typeof data[0][0] === "string" && // whose first element is string
        Array.isArray(data[0][1]))) // and second element is again an Array
  );
}

function SelectInput<TOption>(props: Props<TOption>, ref) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [itemWidth, setItemWidth] = useState(undefined);

  const data = useMemo(() => {
    if (!props.groupBy) {
      return props.items as TOption[];
    }
    return Object.entries(
      Object.groupBy(props.items, props.groupBy),
    ) as GroupedDataType<TOption>;
  }, [props.items]);

  const onLayout = useCallback(({ nativeEvent }) => {
    setItemWidth(nativeEvent.layout?.width);
  }, []);

  const toggleOptions = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const closeOptions = useCallback(() => setIsOpen(false), []);

  const renderItem = useCallback(
    (item: TOption) => (
      <Menu.Item
        key={props.getKey(item)}
        style={{ width: itemWidth }}
        onPress={() => {
          closeOptions();
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
      onDismiss={closeOptions}
      anchorPosition="bottom"
      anchor={
        <BasePicker
          innerRef={ref}
          pressableProps={{ onLayout }}
          onPress={toggleOptions}
          value={props.getLabel(props.selected)}
          {...props}
        />
      }
    >
      {isGroupedData(data)
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
