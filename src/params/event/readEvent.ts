import { castParams } from "../params";

export interface ReadEventParams {
  id: number;
}

export function parseParams(json: any): ReadEventParams | undefined {
  return castParams<ReadEventParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
