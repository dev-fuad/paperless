// import { EventEmitter, Subscription } from "expo-modules-core";

// import { RecieveEventPayload } from "./src/ReadSMS.types";
import { SMS, SMSType } from "./src/ReadSMS.types";
import ReadSMSModule from "./src/ReadSMSModule";

// Get the native constant value.
export const SMS_READ = ReadSMSModule.SMS_READ;
export const SUCCESS = ReadSMSModule.SUCCESS;
export const ERROR = ReadSMSModule.ERROR;

/**
 * Reads SMS messages from device
 * @param lastRead The epoch value of date of last read sms.
 * @returns a Promise with an array of messages
 */
export async function getMessages(lastRead?: string): Promise<SMS[]> {
  const messages: Record<string, string>[] = await ReadSMSModule.getMessages(
    lastRead || "0",
  );
  return messages.map(
    (message) =>
      ({
        type: SMSType[message.type],
        address: message.address,
        body: message.body,
        date: new Date(Number(message.date)),
        threadId: message.threadId,
      }) as SMS,
  );
}

// export async function setValueAsync(value: string) {
//   return await ReadSMSModule.setValueAsync(value);
// }

// const emitter = new EventEmitter(ReadSMSModule);

// export function onRecieveListener(
//   listener: (event: RecieveEventPayload) => void,
// ): Subscription {
//   return emitter.addListener<RecieveEventPayload>("onRecieve", listener);
// }

export { SMS, SMSType };
