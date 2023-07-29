import { castParams } from "../params";

export interface ListListingParams {
  orderBy: string;
}

export function parseParams(json: any): ListListingParams | undefined {
  return castParams<ListListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "orderBy", js: "orderBy", typ: "" }],
  additional: false,
};
