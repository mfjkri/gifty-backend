import { castParams } from "../params";

export interface CreatePersonParams {
  name: string;
}

export function parseParams(json: any): CreatePersonParams | undefined {
  return castParams<CreatePersonParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "name", js: "name", typ: "" }],
  additional: false,
};
