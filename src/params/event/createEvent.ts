import { castParams } from "../params";

export interface CreateEventParams {
  name: string;
  date: string;
  reminder: boolean;
}

export function parseParams(json: any): CreateEventParams | undefined {
  return castParams<CreateEventParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "name", js: "name", typ: "" },
    { json: "date", js: "date", typ: "" },
    { json: "reminder", js: "reminder", typ: true },
  ],
  additional: false,
};
