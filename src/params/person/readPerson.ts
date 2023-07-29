import { castParams } from "../params";

export interface ReadPersonParams {
  id: number;
}

export function parseParams(json: any): ReadPersonParams | undefined {
  return castParams<ReadPersonParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
