import { Request, Response, NextFunction } from "express";
import { newError, respHandler } from "../utils/respHandler";
import { AnyZodObject, ZodIssue } from "zod";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      console.log(error);
      return respHandler({
        req,
        res,
        status: 400,
        data: {
          errors: error.errors.map((error: ZodIssue) =>
            newError<any>("", error.message, error.path[0], "BODY")
          ),
        },
      });
    }
  };
};