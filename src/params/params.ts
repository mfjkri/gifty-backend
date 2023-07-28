import { Request, Response } from "express";

import { ValidationError } from "../errors/error";

export type ParamType = "string" | "number" | "boolean" | "object" | "array";

export interface ParamField {
  name: string;
  type: ParamType;
  optional?: boolean;
  defaultValue?: any;
  children?: Params;
}

export type Params = ParamField[];

function validateParams(r: any, params: Params): ValidationError {
  for (const param of params) {
    const paramName = param.name;
    const paramValue = r[paramName];

    if (paramValue === undefined) {
      if (param.optional) {
        if (param.defaultValue !== undefined) {
          r[paramName] = param.defaultValue;
        }
      } else {
        return {
          error: true,
          message: `Required parameter ${paramName} missing`,
        };
      }
    } else if (param.type === "object") {
      if (!param.children) {
        return {
          error: true,
          message: `Parameter ${paramName} is invalid`,
        };
      }

      if (typeof paramValue !== "object" || Array.isArray(paramValue)) {
        return {
          error: true,
          message: `Parameter ${paramName} must be an object`,
        };
      }
      const { error, message } = validateParams(paramValue, param.children);
      if (error) {
        return {
          error,
          message,
        };
      }
    } else if (param.type === "array") {
      if (!param.children) {
        return {
          error: true,
          message: `Parameter ${paramName} is invalid`,
        };
      }

      if (!Array.isArray(paramValue)) {
        return {
          error: true,
          message: `Parameter ${paramName} must be an array`,
        };
      }

      for (const value of paramValue) {
        if (typeof value !== param.children[0].type) {
          return {
            error: true,
            message: `Parameter ${paramName} must be an array of ${param.children[0].type}`,
          };
        }
      }
    } else {
      if (typeof paramValue !== param.type) {
        return {
          error: true,
          message: `Parameter ${paramName} must be of type ${param.type}`,
        };
      }
    }
  }
  return {
    error: false,
    message: "",
  };
}

export const checkParams = (
  req: Request,
  res: Response,
  params: Params
): boolean => {
  const { error, message } = validateParams(req.body, params);
  if (error) {
    res.status(400).json({ message });
    return false;
  }
  return true;
};
