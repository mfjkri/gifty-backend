import { castParams } from "../params";

export interface CreatePersonParams {
  name: string;
  birthday: string;
}

export function parseParams(json: any): CreatePersonParams | undefined {
  return castParams<CreatePersonParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "name", js: "name", typ: "" },
    { json: "birthday", js: "birthday", typ: "" },
  ],
  additional: false,
};
