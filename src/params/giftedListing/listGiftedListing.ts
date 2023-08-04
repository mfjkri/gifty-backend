import { castParams } from "../params";

export interface ListGiftedListingParams {
  orderBy: string;
}

export function parseParams(json: any): ListGiftedListingParams | undefined {
  return castParams<ListGiftedListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "orderBy", js: "orderBy", typ: "", opt: "", defaultValue: "" },
  ],
  additional: false,
};
