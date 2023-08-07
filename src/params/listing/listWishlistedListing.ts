import { castParams } from "../params";

export interface ListWishlistedListingParams {}

export function parseParams(
  json: any
): ListWishlistedListingParams | undefined {
  return castParams<ListWishlistedListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
