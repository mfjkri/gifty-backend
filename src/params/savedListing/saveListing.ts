import { castParams } from "../params";

export interface UnsaveListingParams {
  id: number;
}

export function parseParams(json: any): UnsaveListingParams | undefined {
  return castParams<UnsaveListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
