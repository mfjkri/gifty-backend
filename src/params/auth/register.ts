import { castParams } from "../params";

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  birthday: string;
}

export function parseParams(json: any): RegisterParams | undefined {
  return castParams<RegisterParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "username", js: "username", typ: "" },
    { json: "email", js: "email", typ: "" },
    { json: "password", js: "password", typ: "" },
    { json: "birthday", js: "birthday", typ: "" },
  ],
  additional: false,
};
