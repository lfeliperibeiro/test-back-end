import { appError } from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { get } from './user.middleware'

describe('Middleware > User', () =>  {
  it("should forward an error when an email is not provided in the headers", () => {
    const req = {headers: {}};
    const next = jest.fn().mockName('next')
    const error =  appError(
        `${ReasonPhrases.UNPROCESSABLE_ENTITY}: header should contain a valid email`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    
      get(req, null, next)
    
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(error)
  });
})
