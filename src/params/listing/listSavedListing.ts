import { castParams } from "../params";

export interface ListSavedListingParams {}

export function parseParams(json: any): ListSavedListingParams | undefined {
  return castParams<ListSavedListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
