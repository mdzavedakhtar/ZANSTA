import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const issue = error.errors[0];
      return res.status(400).json({
        success: false,
        error: {
          message: issue ? `${issue.path.join('.')}: ${issue.message}` : 'Validation Error',
          statusCode: 400,
        },
      });
    }
    next(error);
  }
};
