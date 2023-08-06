import { castParams } from "../params";

export interface ReadListingParams {}

export function parseParams(json: any): ReadListingParams | undefined {
  return castParams<ReadListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
