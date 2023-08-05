import { castParams } from "../params";

export interface ListEventParams {
  orderBy: string;
}

export function parseParams(json: any): ListEventParams | undefined {
  return castParams<ListEventParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "orderBy", js: "orderBy", typ: "" }],
  additional: false,
};
