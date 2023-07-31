import { castParams } from "../params";

export interface UngiftListingParams {
  id: number;
}

export function parseParams(json: any): UngiftListingParams | undefined {
  return castParams<UngiftListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
