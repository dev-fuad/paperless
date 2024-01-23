import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to ReadSMS.web.ts
// and on native platforms to ReadSMS.ts
import { ChangeEventPayload, ReadSMSViewProps } from "./src/ReadSMS.types";
import ReadSMSModule from "./src/ReadSMSModule";
import ReadSMSView from "./src/ReadSMSView";

// Get the native constant value.
export const PI = ReadSMSModule.PI;

export function hello(): string {
  return ReadSMSModule.hello();
}

export async function setValueAsync(value: string) {
  return await ReadSMSModule.setValueAsync(value);
}

const emitter = new EventEmitter(ReadSMSModule ?? NativeModulesProxy.ReadSMS);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { ReadSMSView, ReadSMSViewProps, ChangeEventPayload };
