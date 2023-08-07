import { castParams } from "../params";

export interface ListGiftedListingParams {}

export function parseParams(json: any): ListGiftedListingParams | undefined {
  return castParams<ListGiftedListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
