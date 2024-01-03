/**
 * paperless
 * datetime-picker.tsx
 * created: 03/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useCallback, useState } from "react";

import { DatePickerModal } from "react-native-paper-dates";

import BasePicker from "./base-picker";
import { TextInputProps } from "./text-input";

interface Props extends TextInputProps {
  selectedDate: Date;
  onSelect: (date?: Date) => void;
}

const DatetimePicker: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePicker = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const closePicker = useCallback(() => setIsOpen(false), []);

  const onConfirm = useCallback(({ date }) => {
    props.onSelect(date);
    setIsOpen(false);
  }, []);

  return (
    <>
      <BasePicker
        icon="calendar-month"
        onPress={togglePicker}
        value={props.selectedDate?.toDateString()}
        {...props}
      />
      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={isOpen}
        onDismiss={closePicker}
        date={props.selectedDate}
        onConfirm={onConfirm}
        onChange={onConfirm}
      />
    </>
  );
};

export default DatetimePicker;
