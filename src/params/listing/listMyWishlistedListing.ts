import { castParams } from "../params";

export interface ListMyWishlistedListingParams {
  search?: string;
  userId?: number;
}

export function parseParams(
  json: any
): ListMyWishlistedListingParams | undefined {
  return castParams<ListMyWishlistedListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    {
      json: "search",
      js: "search",
      typ: "",
      opt: true,
      defaultValue: "",
    },
    { json: "userId", js: "userId", typ: 0, opt: true, defaultValue: 0 },
  ],
  additional: false,
};
