import { castParams } from "../params";

export interface RemoveFriendParams {
  id: number;
}

export function parseParams(json: any): RemoveFriendParams | undefined {
  return castParams<RemoveFriendParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0 }],
  additional: false,
};
