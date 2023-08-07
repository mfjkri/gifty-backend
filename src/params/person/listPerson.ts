import { castParams } from "../params";

export interface ListPersonParams {
  search?: string;
}

export function parseParams(json: any): ListPersonParams | undefined {
  return castParams<ListPersonParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    {
      json: "search",
      js: "search",
      typ: "",
      opt: true,
      defaultValue: "",
    },
  ],
  additional: false,
};
