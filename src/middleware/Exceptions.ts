import {NextFunction, Request, Response} from 'express';
import logger from './Logger';

/** Returns 404 if no path is found */
const notFoundMiddleware = (req: Request, res: Response) => {
  logger.error(`NOT FOUND URL: ${req.path}`);
  res.status(404).send({error_description: `Not found URL ${req.path}`});
};

/** Returns 500 if server error is encountered */
const errorMiddleware = (err: any, req: Request, res: Response, _next: NextFunction) => {
  logger.error(`API ERROR- ${req.path}: ${err.message}`);
  if (err.code === 403) res.status(err.code).send({type: err.type, error_description: err.message});
  else res.status(500).send({error_description: err.message});
};

export {notFoundMiddleware, errorMiddleware};
