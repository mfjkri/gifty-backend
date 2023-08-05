import { castParams } from "../params";

export interface DeleteEventParams {
  id: number;
}

export function parseParams(json: any): DeleteEventParams | undefined {
  return castParams<DeleteEventParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
