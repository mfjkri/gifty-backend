import { castParams } from "../params";

export interface GiftListingParams {
  id: number;
}

export function parseParams(json: any): GiftListingParams | undefined {
  return castParams<GiftListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
