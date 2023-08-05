import { castParams } from "../params";

export interface ReadListingParams {
  id: number;
}

export function parseParams(json: any): ReadListingParams | undefined {
  return castParams<ReadListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
