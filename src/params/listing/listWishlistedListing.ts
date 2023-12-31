import { castParams } from "../params";

export interface ListWishlistedListingParams {
  search?: string;
  personId?: number;
}

export function parseParams(
  json: any
): ListWishlistedListingParams | undefined {
  return castParams<ListWishlistedListingParams>(json, typeMap);
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
    { json: "personId", js: "personId", typ: 0, opt: true, defaultValue: 0 },
  ],
  additional: false,
};
