import { castParams } from "../params";

export interface ListPersonParams {
  orderBy: string;
}

export function parseParams(json: any): ListPersonParams | undefined {
  return castParams<ListPersonParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "orderBy", js: "orderBy", typ: "" }],
  additional: false,
};
