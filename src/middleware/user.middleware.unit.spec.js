import { appError } from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { get } from './user.middleware'

describe('Middleware > User', () =>  {
  afterEach(() => {
    jest.clearAllMocks()
  })
  
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

  it("should forward an error when an email is provided in the headers but is invalid", () => {
    const req = {headers: {
      email: 'email @email.com'
      }};
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
