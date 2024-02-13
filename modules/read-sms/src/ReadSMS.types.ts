export enum SMSType {
  inbox = "1" as any,
  sent = "2" as any,
}

export type SMS = {
  type: SMSType;
  address: string;
  body: string;
  date: Date;
  threadId: string;
};
