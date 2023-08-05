import { castParams } from "../params";

export interface ListListingParams {
  orderBy?: string;
  search?: string;
  categories?: string[];
  platform?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function parseParams(json: any): ListListingParams | undefined {
  return castParams<ListListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "orderBy", js: "orderBy", typ: "", opt: true, defaultValue: "" },
    {
      json: "search",
      js: "search",
      typ: "",
      opt: true,
      defaultValue: "",
    },
    {
      json: "categories",
      js: "categories",
      typ: { arrayItems: "" },
      opt: true,
      defaultValue: [],
    },
    {
      json: "platform",
      js: "platform",
      typ: "",
      opt: true,
      defaultValue: "",
    },
    {
      json: "minPrice",
      js: "minPrice",
      typ: 0,
      opt: true,
      defaultValue: -Infinity,
    },
    {
      json: "maxPrice",
      js: "maxPrice",
      typ: 0,
      opt: true,
      defaultValue: Infinity,
    },
  ],
  additional: false,
};
