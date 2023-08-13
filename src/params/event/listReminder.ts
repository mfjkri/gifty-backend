import { castParams } from "../params";

export interface ListReminderParams {}

export function parseParams(json: any): ListReminderParams | undefined {
  return castParams<ListReminderParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
