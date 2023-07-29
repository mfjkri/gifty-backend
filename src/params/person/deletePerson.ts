import { castParams } from "../params";

export interface DeletePersonParams {
  id: number;
}

export function parseParams(json: any): DeletePersonParams | undefined {
  return castParams<DeletePersonParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
