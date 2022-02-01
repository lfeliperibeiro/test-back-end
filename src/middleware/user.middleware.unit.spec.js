import { appError } from "@/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { get } from './user.middleware'
import * as service from '@/database/service'

jest.mock('@/database/service')

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

  it("should return an user object given a valid email is provided", async() => {
    const email = 'email@email.com'
    const req = {headers: {
        email,
      }};
    
    const next = jest.fn().mockName('next')
    
    jest.spyOn(service, 'findOrSave').mockResolvedValueOnce([{
      id: 1,
      email
    }])

    await get(req, null, next)
    
    expect(req.user).toBeDefined()
    expect(req.user).toEqual({
      id: 1,
      email
    })
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(/*nothing*/)
  });
})
