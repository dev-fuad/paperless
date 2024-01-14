/**
 * paperless
 * calc-input.tsx
 * created: 05/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Card, IconButton, Portal, useTheme } from "react-native-paper";

import BasePicker, { BasePickerProps } from "./base-picker";
import TextInput from "./text-input";

interface Props extends BasePickerProps {}

const NUMBERS = "1234567890".split("");
const OPERATORS = "+-*/".split("");

const OPERABLE_ENDINGS = [...NUMBERS, ")", "%"];

const NUMBER_REGEX = /^\d+(\.\d+)?$/;
const INTEGER_REGEX = /^\d+$/;

/**
 *
 *  c ( ) %
 *  7 8 9 x
 *  4 5 6 -
 *  1 2 3 +
 *  . 0 = +
 *
 */

function calculate(exp: string) {
  let index = exp.indexOf("%");
  while (index > 0) {
    const preExp = exp.slice(0, index).trimEnd();
    // if % is after a grouped expression
    // then evalute sub-expression and apply % to it
    if (preExp.at(-1) === ")") {
      let i = 0,
        braces = 0;
      for (i = preExp.length - 1; i > 0; i--) {
        if (exp.at(i) === ")") {
          braces += 1;
        } else if (exp.at(i) === "(") {
          braces -= 1;
        }
        if (braces === 0) {
          break;
        }
      }
      const subExp = exp.slice(i, index);
      // eslint-disable-next-line no-eval
      const replacement = eval(subExp) / 100;
      exp = exp.replace(subExp + "%", replacement.toString());
    } else {
      exp = exp.replace(/(\d+)%/g, (matched) =>
        (parseFloat(matched) / 100).toString(),
      );
    }
    index = exp.indexOf("%");
  }
  // eslint-disable-next-line no-eval
  return eval(exp);
}

const CalcInput: React.FC<Props> = (props) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [expression, setExpression] = useState(props.value);
  const [total, setTotal] = useState("");
  const [bracesCount, setBracesCount] = useState(0);

  const toggleOptions = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  // to disable operators
  const isNotOperableEnding = useMemo(
    () => !OPERABLE_ENDINGS.includes(expression.trim().at(-1)),
    [expression],
  );

  // to disable numbers
  const endingNeedsOperation = useMemo(
    () => [")", "%"].includes(expression.trimEnd().at(-1)),
    [expression],
  );

  // to disable braces
  const cannotAddBraces = useMemo(
    () =>
      bracesCount === 0 &&
      [...NUMBERS, ".", ")"].includes(expression.trim().at(-1)),
    [bracesCount, expression],
  );

  // to disable decimal
  const cannotAddDecimal = useMemo(() => {
    const tokens = expression.trimEnd().split(" ");
    const lastToken = tokens[tokens.length - 1];

    return !INTEGER_REGEX.test(lastToken);
  }, [expression]);

  // update total when expression changes
  useEffect(() => {
    try {
      const exp = calculate(expression);
      setTotal(String(exp));
    } catch (error) {
      console.log(error);
    }
  }, [expression]);

  // decides which bracket ( or ) needs to be added to expression
  const addBracket = useCallback(() => {
    setExpression((exp) => {
      if (bracesCount === 0) {
        setBracesCount((braces) => braces + 1);
        return exp.concat(" ( ");
      }
      const tokens = exp.trimEnd().split(" ");
      const lastToken = tokens[tokens.length - 1];

      if (NUMBER_REGEX.test(lastToken)) {
        setBracesCount((braces) => braces - 1);
        return exp.concat(" ) ");
      } else if (["%", ")"].includes(exp.trimEnd().at(-1))) {
        setBracesCount((braces) => braces - 1);
        return exp.concat(") ");
      }
      setBracesCount((braces) => braces + 1);
      return exp.concat(" ( ");
    });
  }, [bracesCount]);

  const handleRemoveBracket = useCallback((exp: string) => {
    if (exp.at(-1) === "(") {
      setBracesCount((braces) => braces - 1);
    } else {
      setBracesCount((braces) => braces + 1);
    }
    return exp.slice(0, -1).trimEnd();
  }, []);

  // update expression
  const onPressOperator = useCallback(
    (operator) => {
      if (operator in NUMBERS) {
        setExpression((exp) => exp.concat(operator));
      } else if (OPERATORS.includes(operator)) {
        setExpression((exp) => exp.concat(` ${operator} `));
      } else {
        switch (operator) {
          case ".":
            setExpression((exp) => exp.concat("."));
            break;
          case "%":
            setExpression((exp) => exp.concat("% "));
            break;
          case "(":
            addBracket();
            break;
          case "<":
            setExpression((exp) => {
              let newExp = exp.trimEnd();
              if (["(", ")"].includes(exp.at(-1))) {
                return handleRemoveBracket(newExp);
              }
              newExp = newExp.slice(0, -1);
              return newExp.trimEnd();
            });
            break;
          case "AC":
            setExpression("");
            setTotal("");
            break;
          case "=":
            props.onChangeText?.(total);
            toggleOptions();
            break;
          default:
            break;
        }
      }
    },
    [expression, total],
  );

  const backgroundColor = theme.colors.backdrop;

  return (
    <>
      <BasePicker icon="calculator" {...props} onPress={toggleOptions} />
      {isOpen && (
        <Portal>
          <View style={styles.container}>
            <Pressable
              style={[StyleSheet.absoluteFill, { backgroundColor }]}
              onPress={toggleOptions}
            />
            <Card mode="outlined" contentStyle={styles.content}>
              <TextInput editable={false} label={total} value={expression} />
              <Card.Content style={styles.buttons}>
                <View style={styles.buttonsGroupLeft}>
                  <IconButton
                    key="AC"
                    mode="outlined"
                    icon="cancel"
                    disabled={expression.length === 0}
                    onPress={() => onPressOperator("AC")}
                  />
                  <IconButton
                    key="braces"
                    mode="outlined"
                    icon="code-parentheses"
                    disabled={cannotAddBraces}
                    onPress={() => onPressOperator("(")}
                  />
                  <IconButton
                    key="percent"
                    mode="outlined"
                    icon="percent-outline"
                    disabled={isNotOperableEnding}
                    onPress={() => onPressOperator("%")}
                  />
                  {NUMBERS.map((operator) => (
                    <IconButton
                      key={`number_${operator}`}
                      mode="outlined"
                      icon={`numeric-${operator}`}
                      disabled={endingNeedsOperation}
                      onPress={() => onPressOperator(operator)}
                    />
                  ))}
                  <IconButton
                    key="decimal"
                    mode="outlined"
                    icon="circle-small"
                    disabled={cannotAddDecimal}
                    onPress={() => onPressOperator(".")}
                  />
                  <IconButton
                    key="="
                    mode="outlined"
                    icon="equal"
                    disabled={isNotOperableEnding}
                    onPress={() => onPressOperator("=")}
                  />
                </View>
                <View>
                  <IconButton
                    key="backspace"
                    mode="outlined"
                    icon="backspace-outline"
                    disabled={expression.length < 1}
                    onPress={() => onPressOperator("<")}
                  />
                  <IconButton
                    mode="outlined"
                    icon="division"
                    disabled={isNotOperableEnding}
                    onPress={() => onPressOperator("/")}
                  />
                  <IconButton
                    mode="outlined"
                    icon="multiplication"
                    disabled={isNotOperableEnding}
                    onPress={() => onPressOperator("*")}
                  />
                  <IconButton
                    mode="outlined"
                    icon="minus"
                    disabled={isNotOperableEnding}
                    onPress={() => onPressOperator("-")}
                  />
                  <IconButton
                    mode="outlined"
                    icon="plus"
                    disabled={isNotOperableEnding}
                    onPress={() => onPressOperator("+")}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  buttonsGroupLeft: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 160,
  },
});

export default CalcInput;
