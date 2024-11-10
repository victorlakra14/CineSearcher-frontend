import { isNil, pipe, reject } from "ramda";

export const createParams = pipe(reject(isNil));
