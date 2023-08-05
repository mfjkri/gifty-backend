import { castParams } from "../params";

export interface SaveListingParams {
  id: number;
}

export function parseParams(json: any): SaveListingParams | undefined {
  return castParams<SaveListingParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
