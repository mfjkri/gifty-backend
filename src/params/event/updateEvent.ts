import { castParams } from "../params";

export interface UpdateEventParams {
  id: number;
  name: string;
  date: string;
  reminder: boolean;
}

export function parseParams(json: any): UpdateEventParams | undefined {
  return castParams<UpdateEventParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "id", js: "id", typ: 0 },
    { json: "name", js: "name", typ: "", opt: true, defaultValue: "" },
    { json: "date", js: "date", typ: "", opt: true, defaultValue: "" },
    {
      json: "reminder",
      js: "reminder",
      typ: true,
      opt: true,
      defaultValue: false,
    },
  ],
  additional: false,
};
