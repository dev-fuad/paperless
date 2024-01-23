import * as React from "react";

import { requireNativeViewManager } from "expo-modules-core";

import { ReadSMSViewProps } from "./ReadSMS.types";

const NativeView: React.ComponentType<ReadSMSViewProps> =
  requireNativeViewManager("ReadSMS");

export default function ReadSMSView(props: ReadSMSViewProps) {
  return <NativeView {...props} />;
}
