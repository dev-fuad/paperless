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
export const SMS_READ = ReadSMSModule.SMS_READ;
export const SUCCESS = ReadSMSModule.SUCCESS;
export const ERROR = ReadSMSModule.ERROR;

export function start(callback: (status: string) => void): void {
  return ReadSMSModule.start(callback);
}

// export async function setValueAsync(value: string) {
//   return await ReadSMSModule.setValueAsync(value);
// }

// const emitter = new EventEmitter(ReadSMSModule ?? NativeModulesProxy.ReadSMS);

// export function addChangeListener(
//   listener: (event: ChangeEventPayload) => void,
// ): Subscription {
//   return emitter.addListener<ChangeEventPayload>("onChange", listener);
// }

export { ReadSMSView, ReadSMSViewProps, ChangeEventPayload };
