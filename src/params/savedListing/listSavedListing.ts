import { castParams } from "../params";

export interface ListSavedListingParams {
  orderBy: string;
}

export function parseParams(json: any): ListSavedListingParams | undefined {
  return castParams<ListSavedListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "orderBy", js: "orderBy", typ: "", opt: "", defaultValue: "" },
  ],
  additional: false,
};
