import { castParams } from "../params";

export interface WishListingParams {
  id: number;
  personId: number;
}

export function parseParams(json: any): WishListingParams | undefined {
  return castParams<WishListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "id", js: "id", typ: 0 },
    { json: "personId", js: "personId", typ: 0 },
  ],
  additional: false,
};
