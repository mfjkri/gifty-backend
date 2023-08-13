import { castParams } from "../params";

export interface RandomListingParams {}

export function parseParams(json: any): RandomListingParams | undefined {
  return castParams<RandomListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
