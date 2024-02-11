// Import the native module. On web, it will be resolved to ReadSMS.web.ts
// and on native platforms to ReadSMS.ts
// import { ChangeEventPayload } from "./src/ReadSMS.types";
import ReadSMSModule from "./src/ReadSMSModule";

// Get the native constant value.
export const SMS_READ = ReadSMSModule.SMS_READ;
export const SUCCESS = ReadSMSModule.SUCCESS;
export const ERROR = ReadSMSModule.ERROR;

export function start(): Promise<string> {
  return ReadSMSModule.start();
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

// export { ChangeEventPayload };
