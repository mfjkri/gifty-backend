import { castParams } from "../params";

export interface UnwishListingParams {
  id: number;
  personId: number;
}

export function parseParams(json: any): UnwishListingParams | undefined {
  return castParams<UnwishListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "id", js: "id", typ: 0 },
    { json: "personId", js: "personId", typ: 0 },
  ],
  additional: false,
};
