import { castParams } from "../params";

export interface ListUserParams {
  search?: string;
}

export function parseParams(json: any): ListUserParams | undefined {
  return castParams<ListUserParams>(json, typeMap);
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
