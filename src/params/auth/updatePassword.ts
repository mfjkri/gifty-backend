import { castParams } from "../params";

export interface UpdatePasswordParams {
  newPassword: string;
}

export function parseParams(json: any): UpdatePasswordParams | undefined {
  return castParams<UpdatePasswordParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "newPassword", js: "newPassword", typ: "" }],
  additional: false,
};
