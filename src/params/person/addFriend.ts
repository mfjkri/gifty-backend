import { castParams } from "../params";

export interface AddFriendParams {
  id: number;
}

export function parseParams(json: any): AddFriendParams | undefined {
  return castParams<AddFriendParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
