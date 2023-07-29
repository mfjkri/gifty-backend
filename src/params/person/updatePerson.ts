import { castParams } from "../params";

export interface UpdatePersonParams {
  id: number;
  name?: string;
  birthday?: string;
}

export function parseParams(json: any): UpdatePersonParams | undefined {
  return castParams<UpdatePersonParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    {
      json: "id",
      js: "id",
      typ: 0,
    },
    {
      json: "name",
      js: "name",
      typ: "",
      opt: true,
      defaultValue: "",
    },
    {
      json: "birthday",
      js: "birthday",
      typ: "",
      opt: true,
      defaultValue: "",
    },
  ],
  additional: true,
};
