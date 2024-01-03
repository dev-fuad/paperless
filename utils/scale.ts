import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const vw = (num: number) => SCREEN_WIDTH * num;
export const vh = (num: number) => SCREEN_HEIGHT * num;

export const isWideScreen = SCREEN_WIDTH > SCREEN_HEIGHT;
